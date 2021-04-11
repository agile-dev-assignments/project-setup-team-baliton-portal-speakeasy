// on event window load attach event listenter to my-button onclick
window.onload = () => {
    document.getElementById('my-button').onclick = () => {
        init();
    }
}

//leave video component for now we will use it while we stylise these static pages
async function init() {
    // browser asks for video stream *not audio currently and adds video to each track
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio:true });
    document.getElementById("video").srcObject = stream;
    const peer = createPeer();
    stream.getTracks().forEach(track => peer.addTrack(track, stream));
}
// create peer object 
function createPeer(){
    const peer = new RTCPeerConnection({
        iceServers: [{
            urls: "stun:stun.stunprotocol.org"
        }]
    });
    // need this event to be raised when we recieve an offer 
    peer.onnegotiationneeded = () => handleNegotiationNeededEvent(peer);

    return peer;
}
// creates an offer and sends it to server which is then accepted
async function handleNegotiationNeededEvent(peer) {
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    const payload = {
        sdp: peer.localDescription
    };

    const { data } = await axios.post('/broadcast', payload);
    const desc = new RTCSessionDescription(data.sdp);
    peer.setRemoteDescription(desc).catch(e => console.log(e));
}