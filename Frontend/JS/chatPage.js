const ServerLink = "http://localhost:3000";
document.addEventListener("DOMContentLoaded", async () => {
    const friendsList = document.getElementById("usersList");
    
    try {
        const response = await axios.get(`${ServerLink}/api/v1/friendsList`, {
            withCredentials: true
        });
        const list = response.data.data; 
        
        list.forEach(friend => {
            const roomLink = document.createElement("a");
            const data = { id: friend.roomId , friendName: friend.name };
            roomLink.href = `/html/chattingArea.html?roomId=${JSON.stringify(data)}`;
            const friendLi = document.createElement("li");
            friendLi.textContent = friend.name;
            roomLink.appendChild(friendLi);
            friendsList.appendChild(roomLink);
        });
        
        const friendRequestsList = document.getElementById("friendRequestsList");

        const responseRequest = await axios.get(`${ServerLink}/api/v1/friendRequests`, {
            withCredentials: true
        });
        const RequestList = responseRequest.data.data; 
    
        RequestList.forEach(request => {
            const requestLi = document.createElement("li");
            const requestLink = document.createElement("a");
            requestLink.href = `/html/addFriendPage.html?userName=${request.name}&userId=${request.id}`; 
            requestLi.textContent = request.name;
            friendRequestsList.appendChild(requestLink);
            requestLink.appendChild(requestLi);
        });

    } catch (error) {
        checkForTokenAuthenticationError(error);
        console.log(error);
        throw error;
    }    

});

const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    const searchUser = document.getElementById("SearchBar").value;
    window.location.href=`/html/searchUserPage.html?user=${searchUser}&page=1`;
});



const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = '/html/signIn.html';
});

function checkForTokenAuthenticationError(error){
    if(error.response.data.err==='JwtTokenError'){
        window.location.href = '/html/signIn.html';
    }
    return false;
}