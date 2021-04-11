// on event window load attach event listenter to my-button onclick
window.onload = () => {
    document.getElementById('my-button').onclick = () => {
        init();
    }
}
//initialise peer and create a channel between server and user 
// send video down channel
async function init() {
    const peer = createPeer();
    peer.addTransceiver("video", { direction: "recvonly" })
}

// create peer object 
function createPeer() {
    const peer = new RTCPeerConnection({
        iceServers: [
            {
                urls: "stun:stun.stunprotocol.org"
            }
        ]
    });
    peer.ontrack = handleTrackEvent;

    // need this event to be raised when we recieve an offer 
    peer.onnegotiationneeded = () => handleNegotiationNeededEvent(peer);

    return peer;
}
//create and offer:
async function handleNegotiationNeededEvent(peer) {
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    const payload = {
        sdp: peer.localDescription
    };
    //when request for consumer is called send object to webrtc 
    const { data } = await axios.post('/consumer', payload);
    const desc = new RTCSessionDescription(data.sdp);
    peer.setRemoteDescription(desc).catch(e => console.log(e));
}

//append stream to video tag of this track
function handleTrackEvent(e) {
    document.getElementById("video").srcObject = e.streams[0];
};