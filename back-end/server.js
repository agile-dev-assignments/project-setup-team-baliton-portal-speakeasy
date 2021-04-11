const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const webrtc = require('wrtc');

app.use(express.static('public'));
const express = require('express');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());