const ServerLink = "http://13.60.19.44:3000";
document.addEventListener("DOMContentLoaded", async () => {

    const ForEnterEvent = new Event('click');

    const roomDetail = getRoomId();
    const addFriendName = document.getElementById("friendName");
    addFriendName.innerText = roomDetail.friendName;
    const token = document.cookie.split("=")[1];

    const chatList = document.getElementById("chatList");

    // code for previous chat display
    const chats = await loadPreviousChats(roomDetail.id);

    chats.forEach(chat => {
        const addPreMsg = document.createElement("li");
        addPreMsg.innerHTML = `${chat.user}: ${chat.msg}`;
        chatList.appendChild(addPreMsg);
    });
    
    //code to do chatting
    const socket = io(ServerLink);
    try {
        socket.emit("joinRoom",{roomId:roomDetail.id,authToken:token});
    } catch (error) {
        checkForTokenAuthenticationError(error);
        console.log(error);
        throw error;
    }

    document.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            document.getElementById("sendButton").dispatchEvent(ForEnterEvent);
        }
      });

    document.getElementById("sendButton").addEventListener("click", () => {
        const sendMsgElement = document.getElementById("messageInput");
        const sendMsg = sendMsgElement.value;

        try {
            socket.emit("message", { roomId: roomDetail.id, msg: sendMsg , authToken:token });
        } catch (error) {
            checkForTokenAuthenticationError(error);
            console.log(error);
            throw error;
        }
        sendMsgElement.value = "";  
    });
    
    socket.on("userMessage", (payload) => {
        const addNewReceiveMsg = document.createElement("li");
        addNewReceiveMsg.innerText = `${payload.name}: ${payload.msg}`;
        chatList.appendChild(addNewReceiveMsg);
    });
});

async function loadPreviousChats(roomId){
    try {
        const response = await axios.get(`${ServerLink}/api/v1/retrieveChats?roomId=${roomId}`, {
            withCredentials: true
        }); 
        let chats = response.data.data; 
        chats.sort((a, b) => a.time - b.time);
        return chats;
    } catch (error) {
        checkForTokenAuthenticationError(error);
        console.log("Unable to chat previous chats due to "+error);
        return [];
    }
}

function getRoomId(){
    const urlParams = new URLSearchParams(window.location.search);
    const dataString = urlParams.get('roomId');
    const data = JSON.parse(dataString);
    return data;
}

function checkForTokenAuthenticationError(error){
    if(error.response.data.err==='JwtTokenError'){
        window.location.href = '/html/signIn.html';
    }
    return false;
}

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = '/html/signIn.html';
});
