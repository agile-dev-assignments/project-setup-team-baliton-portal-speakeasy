// import and instantiate express
const express = require("express"); // CommonJS import style!
const cors = require('cors');
const app = express() // instantiate an Express object
const axios = require('axios');
const mongoose = require('mongoose');
const Call = require('./call');
require('dotenv').config();

//variables from dotenv
const atlas_username = process.env.DB_USERNAME;
const atlas_password = process.env.DB_PASSWORD;

//atlas url with dot env variables
const atlasURL = 'mongodb+srv://' + atlas_username + ':' + atlas_password + '@speakeasycluster.meaba.mongodb.net/speakeasy-database?retryWrites=true&w=majority';

//connect to mongoDB through atlas
mongoose.connect(atlasURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log('connected to speakeasy-database with username: ' + atlas_username) 
  })
  .catch((err) => {
    console.log('connection to DB failed, string that the attempt use: ' + atlasURL + 'err: ' + err)
  })

//route to manually add 'ongoing' calls to the database for testing purposes
app.get('/backdoor-add-ongoing-call/:tag/:title', (req, res) => {
  let storeTag = req.params.tag;
  let storeTitle = req.params.title;
  const call = new Call({
    callID: 0,
    callTitle: storeTitle,
    callTag: storeTag,
    moderatorID: 0,
    onGoing: true

  });

  call.save()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err);
    })
})

//route to manually add 'ended' calls to the database for testing purposes
app.get('/backdoor-add-ended-call/:tag/:title', (req, res) => {
  let storeTag = req.params.tag;
  let storeTitle = req.params.title;
  const call = new Call({
    callID: 0,
    callTitle: storeTitle,
    callTag: storeTag,
    moderatorID: 0,
    onGoing: false

  });

  call.save()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err);
    })
})

//use cors middle ware
app.use(cors())

//helper functoin to sort time started's dates before sorting time
//returns 1 if a is a more recent date, -1 if b is a more recent date
//and zero if they are the same date
//dates are in format of YYYY-MM-DD
const sortDate = (a, b) => {
  let datesA = a.split("-");
  let datesB = b.split("-");

  if (parseInt(datesA[0]) < parseInt(datesB[0])) {
    return 1;
  }
  else if (parseInt(datesA[0]) > parseInt(datesB[0])) {
    return -1;
  }
  else if (parseInt(datesA[1]) < parseInt(datesB[1])) {
    return 1;
  }
  else if (parseInt(datesA[1]) > parseInt(datesB[1])) {
    return -1;
  }
  else if (parseInt(datesA[2]) < parseInt(datesB[2])) {
    return 1;
  }
  else if (parseInt(datesA[2]) > parseInt(datesB[2])) {
    return -1;
  }
  else {
    return 0;
  }
}

//helper functoin to sort time started's times if dates are the same
//returns 1 if a is a more recent time, -1 if b is a more recent time
//and zero if they are the same time
const sortTime = (rawTimeA, rawTimeB) => {
  let timeA = rawTimeA.split(":");
  let timeB = rawTimeB.split(":");

  if (parseInt(timeA[0]) < parseInt(timeB[0])) {
    return 1;
  }
  else if (parseInt(timeA[0]) > parseInt(timeB[0])) {
    return -1;
  }
  else if (parseInt(timeA[1]) < parseInt(timeB[1])) {
    return 1;
  }
  else if (parseInt(timeA[1]) > parseInt(timeB[1])) {
    return -1;
  }
  else if (parseInt(timeA[2]) < parseInt(timeB[2])) {
    return 1;
  }
  else if (parseInt(timeA[2]) > parseInt(timeB[2])) {
    return -1;
  }
  else {
    return 0;
  }
}

//helper function to help in sorting call list
//takes two strings representing date & time fomatted YYYY-MM-DDTXX:XX:XX.ETC
//returns 1 if a is more recent, -1 if b is more recent
//and zero if they are equal
const moreRecent = (a, b) => {

  let dateAndTimeA = a.split("T");
  let dateAndTimeB = b.split("T");

  let dateA = dateAndTimeA[0];
  let dateB = dateAndTimeB[0];

  let rawTimeA = dateAndTimeA[1].split(".");
  let rawTimeB = dateAndTimeB[1].split(".");

  let sortDateResult = sortDate(dateA, dateB);

  //if dates are not equal, return result
  if (sortDateResult == 1) {
    return 1;
  }
  else if (sortDateResult == -1) {
    return -1;
  }
  else {
    //if dates are equal, sort by time
    return sortTime(rawTimeA[0], rawTimeB[0])
  }
}


//make a request for calls
app.get('/recentCallList', (req, res, next)=>{

  Call.find()
    .then(dbResponse => {
        // handle success, send data as json
        let callList = dbResponse;
        callList = callList.filter(call => {
          return call.onGoing; 
        })
        callList.sort((call1, call2) => {
          return moreRecent(call1.timeStarted.toISOString(), call2.timeStarted.toISOString());
        });
        res.json(callList)
    })
    .catch(error => {
      //handle error and print to console
      console.error('There was an error with /recentCallList !!!! ', error);
    });

})

//helper function for tag call list route
//returns true if the given call is both ongoing and has the given tag
const onGoingWithTag = (call, store) => {
    return ((call.callTag === store)
            && (call.onGoing));
}

//make a request for calls for tag page
app.get('/tagCallList/:tag', (req, res, next)=>{

    let store = req.params.tag;
    Call.find()
      .then(dbResponse => {
        let callList = dbResponse;
        callList = callList.filter(call => {
          return onGoingWithTag(call, store); 
        })
        callList.sort((call1, call2) => {
          return moreRecent(call1.timeStarted.toISOString(), call2.timeStarted.toISOSTring());
        })
        res.send('Returning calls in DB with tag=' + store);
        res.json(callList);
      })
      .catch(error => {
        //handle error and print to console
        console.error('There was an error with /tagCallList/' + {store} + '! ', error);
      });

})


// we will put some server logic here later...
// export the express app we created to make it available to other modules
module.exports = {
    app: app,
    moreRecent: moreRecent,
    sortTime: sortTime,
    sortDate: sortDate,
    onGoingWithTag: onGoingWithTag
}