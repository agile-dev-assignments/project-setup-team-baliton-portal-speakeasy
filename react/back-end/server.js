#!/usr/bin/env node
const { app } = require('./app'); // load up the web server
const session = require('express-session');
const port = 5000 // the port to listen to for incoming requests
const sesstimeout = 1000 * 60 * 60 * 3; //3 hours before session times out

// call express's listen function to start listening to the port
const {
  PORT = 3000,
  SESS_LIFETIME = sesstimeout
} = process.env

const listener = app.listen(port, function () {
  console.log(`Server running on port: ${port}`)
})
// a function to stop listening to the port
const close = () => {
  listener.close()
}
module.exports = {
  close: close,
}
