const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
const generateRoomId = document.getElementById('generateroomId');
const joinRoom = document.getElementById('joinRoom');

const socket = io.connect('http://13.60.19.44:3000');

let localStream;
let peerConnection;
let roomID=getRoomId();

const config = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
  ]
};

socket.on("ready for call", ()=>{
  console.log("READY-------->");
    joinFirstUserRoom();
})
console.log("roomID-------->",roomID);
socket.emit("video-initialization",{roomID});

socket.on("joinRoom-other-user",()=>{
    joinSecondUserRoom();
});

function getRoomId(){
    const urlParams = new URLSearchParams(window.location.search);
    const roomID = urlParams.get('roomID');
    return roomID;
}

// Ask for media permissions
async function mediaPermissions(){
  console.log('Requesting media permissions...');
  const constraints = { audio: true, video: true };
  localStream = await navigator.mediaDevices.getUserMedia(constraints);
  localVideo.srcObject = localStream;
  console.log('Media permissions granted.');
}

function joinFirstUserRoom(){
  socket.on('offer-answer', AcceptingOfferAndSendingAnswer);
  socket.emit('tell-other-user-to-joinRoom'.roomID);
};

function joinSecondUserRoom() {
  sendOfferToTheRoom(roomID);
  socket.on('answer-ack', AcceptingAnswer);
};

async function AcceptingAnswer({ answer, roomID }) {
  console.log('Received answer:', answer);
  await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
}

async function sendOfferToTheRoom(roomID) {
  console.log(`Sending offer to room: ${roomID}`);
  peerConnection = new RTCPeerConnection(config);

  localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

  const peerOffer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(peerOffer);

  socket.emit('offer', {
    roomID: roomID,
    offer: peerConnection.localDescription
  });

  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      socket.emit('candidate', { roomID: roomID, candidate: event.candidate });
    }
  };

  peerConnection.ontrack = (event) => {
    remoteVideo.srcObject = event.streams[0];
    console.log('Received remote track (in offer):', event.track);
  };
}

async function AcceptingOfferAndSendingAnswer({ offer, roomID }) {
  console.log('Received offer:', offer);

  peerConnection = new RTCPeerConnection(config);

  peerConnection.ontrack = (event) => {
    remoteVideo.srcObject = event.streams[0];
    console.log('Received remote track (in answer):', event.track);
  };

  localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

  await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));

  const peerAnswer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(peerAnswer);

  socket.emit('answer', {
    roomID: roomID,
    answer: peerConnection.localDescription
  });

  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      socket.emit('candidate', { roomID: roomID, candidate: event.candidate });
    }
  };

}

socket.on('candidate', ({ candidate }) => {
  if (peerConnection) {
    peerConnection.addIceCandidate(new RTCIceCandidate(candidate))
      .then(() => {
        console.log("Successfully added ICE candidate");
      })
      .catch(e => console.error("Error adding ICE candidate", e));
  }
});

mediaPermissions();
