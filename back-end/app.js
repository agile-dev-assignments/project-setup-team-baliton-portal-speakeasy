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
            res.json(apiResponse.data)
        })
        .catch(error => {
            //handle error and print to console
            console.error('There was an error with /recentCallList !!!!', error);
        });

})


// we will put some server logic here later...
// export the express app we created to make it available to other modules
module.exports = app