const userParams = new URLSearchParams(window.location.search);
const userName = userParams.get('userName');
const userId = userParams.get('userId');
// console.log(userName,userId);

const addFriendName = document.getElementById("friendName");
addFriendName.innerText = userName;

async function checkForPendingRequest(userId){
    try {
        const isTrue = await axios.get(`http://localhost:3000/api/v1/isRequestPending/${userId}`, {
            withCredentials: true
        });
        return isTrue.data.data;
    } catch (error) {
        console.log("Unable to perform checkForPendingRequest because of "+error);
        throw error;
    }
} 

async function checkForFriend(userId){
    try {
        const isTrue = await axios.get(`http://localhost:3000/api/v1/isFriend/${userId}`, {
            withCredentials: true
        });
        return isTrue.data.data;
   } catch (error) {
        console.log("Unable to perform checkForFriend "+error);
        throw error;

   }
}

async function checkForReceivedRequest(userId){
    try {
        const isTrue = await axios.get(`http://localhost:3000/api/v1/isRequestReceived/${userId}`, {
            withCredentials: true
        });
        return isTrue.data.data;
    } catch (error) {
        console.log("Unable to perform checkForReceivedRequest "+error);
        throw error;

    }
}

async function addAppropriateValueToBtn(userId){
    const manageFriendButton1 = document.getElementById("manageFriendButton-1");
    const manageFriendButton2 = document.getElementById("manageFriendButton-2");

    manageFriendButton1.innerText="";
    let linkForBtn = "http://localhost:3000/api/v1/";
    let flag = false;
    if(await checkForPendingRequest(userId)){
        manageFriendButton1.innerText = "Request Pending";
        linkForBtn = "";
        flag = true;  
    }
    if(!flag && await checkForFriend(userId)){
        manageFriendButton1.innerText = "UnFriend";
        linkForBtn +=`unFriend/${userId}`;
        flag = true;  
    }
    if(!flag && await checkForReceivedRequest(userId)){
        manageFriendButton1.innerText = "Accept";
        manageFriendButton2.innerText = "Reject";
        manageFriendButton2.hidden = false;
        linkForBtn = `manageFriendRequest`;
        flag = true;  
    }
    if(!flag){
        manageFriendButton1.innerText = "Send Friend Request";
        linkForBtn += `sendFriendRequest/${userId}`;
    }

    if(linkForBtn!=='manageFriendRequest'){
        manageFriendButton1.addEventListener("click",async (e)=>{
            e.preventDefault();
            try {
                await axios.get(linkForBtn, {
                    withCredentials: true
                });
            } catch (error) {
                console.log("Unable to perform the operation due to "+error);
            throw error;

            }
            window.location.reload();
        });
    }else{
        manageFriendButton1.addEventListener("click",async (e)=>{
            e.preventDefault();
            try {
                await axios.get(`http://localhost:3000/api/v1/manageFriendRequest/${userId}/yes`, {
                    withCredentials: true
                });
            } catch (error) {
                console.log("Unable to perform the operation due to "+error);
                throw error;
            }
            window.location.reload();
        });
        manageFriendButton2.addEventListener("click",async (e)=>{
            e.preventDefault();
            try {
                await axios.get(`http://localhost:3000/api/v1/manageFriendRequest/${userId}/no`, {
                    withCredentials: true
                });
            } catch (error) {
                console.log("Unable to perform the operation due to "+error);
                throw error;    
            }
            window.location.reload();
        });
    }
}

addAppropriateValueToBtn(userId);