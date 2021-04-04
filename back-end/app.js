// import and instantiate express
const express = require("express") // CommonJS import style!
const cors = require('cors')
const app = express() // instantiate an Express object

const axios = require('axios');

//use cors middle ware
app.use(cors())

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