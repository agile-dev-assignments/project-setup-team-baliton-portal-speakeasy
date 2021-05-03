#!/usr/bin/env node
const { app } = require('./app'); // load up the web server
const port = 5000 // the port to listen to for incoming requests

//set up https:
const fs = require('fs');
const key = fs.readFileSync('./key.pem');
const cert = fs.readFileSync('./cert.pem');
const https = require('https');
const server = https.createServer({key: key, cert: cert }, app);

// call express's listen function to start listening to the port
const listener = server.listen(port, function () {
  console.log(`Server running on port: ${port}`)
})
// a function to stop listening to the port
const close = () => {
  listener.close()
}
module.exports = {
  close: close,
}