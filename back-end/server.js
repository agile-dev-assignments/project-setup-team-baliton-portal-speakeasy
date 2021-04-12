const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const webrtc = require('wrtc');

let senderStream;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//sends stream from server to listeners 
app.post("/consumer", async ({ body }, res) => {
  const peer = new webrtc.RTCPeerConnection({
    iceServers: [
      {
        urls: "stun:stun.stunprotocol.org"
      }
    ]
  });
  const desc = new webrtc.RTCSessionDescription(body.sdp);
  await peer.setRemoteDescription(desc);
  senderStream.getTracks().forEach(track => peer.addTrack(track, senderStream));
  const answer = await peer.createAnswer();
  await peer.setLocalDescription(answer);
  const payload = {
    sdp:peer.localDescription
  }
  res.json(payload);

});



//user sends stream to server 
app.post('/broadcast', async({ body }, res) => {
  const peer = new webrtc.RTCPeerConnection({
    iceServers: [{
      urls: "stun:stun.stunprotocol.org"
    }]
  });

  //ontrack event raised when remote stream is recieved by peers
  peer.ontrack = (e) => handleTrackEvent(e, peer);
  // the payload of post request in body. Body has a key: sdp  
  const desc = new webrtc.RTCSessionDescription(body.sdp);
  await peer.setRemoteDescription(desc);
  const answer = await peer.createAnswer();
  await peer.setLocalDescription(answer);
  const payload = {
    sdp:peer.localDescription
  }

  res.json(payload);
});

//called when on track event is raised
function handleTrackEvent(e, peer) {
  senderStream = e.streams[0];
};

app.listen(5000, () => console.log('server started'));