// import and instantiate express
const express = require("express") // CommonJS import style!
const cors = require('cors')
const app = express() // instantiate an Express object

const axios = require('axios');

//use cors middle ware
app.use(cors())

//helper function to help in sorting call list
//takes two strings fomatted XX:XX:XX or X:XX:XX
//returns 1 if a is more recent, -1 if b is more recent
//and zero if they are equal
const moreRecent = (a, b) => {
    let aArr = a.split(":");
    let bArr = b.split(":");
  
    if (parseInt(aArr[0]) < parseInt(bArr[0])) {
      return 1;
    } 
    else if (parseInt(aArr[0]) > parseInt(bArr[0])) {
      return -1;
    }
    else if (parseInt(aArr[1]) < parseInt(bArr[1])) {
      return 1;
    }
    else if (parseInt(aArr[1]) > parseInt(bArr[1])) {
      return -1;
    }
    else if (parseInt(aArr[2]) < parseInt(bArr[2])) {
      return 1;
    }
    else if (parseInt(aArr[2]) > parseInt(bArr[2])) {
      return -1;
    }
    else {
      return 0;
    }
}

//make a request for calls
app.get('/recentCallList', (req, res, next)=>{

    axios
        .get('https://my.api.mockaroo.com/calllist.json?key=65c91aa0')
        .then(apiResponse => {
            // handle success, send data as json
            let callList = apiResponse.data;
            callList = callList.filter(call => {
                return call.onGoing; 
            })
            callList.sort((call1, call2) => {
                return moreRecent(call1.startTime, call2.startTime);
            });
            res.json(callList)
        })
        .catch(error => {
            //handle error and print to console
            console.error('There was an error with /recentCallList !!!!', error);
        });

})

//make a request for calls for tag page
app.get('/tagCallList/:id', (req, res, next)=>{
    let store = req.params.id;
    axios
        .get('https://my.api.mockaroo.com/tagCallList.json?key=65c91aa0')
        .then(apiResponse => {
            // handle success, send data as json
            let callList = apiResponse.data;
            callList = callList.filter(call => {
                return ((call.callTag === store)
                        && (call.onGoing)); 
            })
            callList.map(call => {
                call.ID = "wrong";
            })

            //res.send('the tag is ' + req.params.id)
            res.json(callList);
        })
        .catch(error => {
            //handle error and print to console
            console.error('There was an error with /recentCallList !!!!', error);
        });

})


// we will put some server logic here later...
// export the express app we created to make it available to other modules
module.exports = app