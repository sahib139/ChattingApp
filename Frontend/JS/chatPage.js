document.addEventListener("DOMContentLoaded", async () => {
    const friendsList = document.getElementById("usersList");
    
    try {
        const response = await axios.get("http://localhost:3000/api/v1/friendsList", {
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
        
    } catch (error) {
        console.log(error);
        console.log("Unable to fetch friends!!!");
    }    
});

const searchBtn = document.getElementById("searchBtn");
console.log(searchBtn);

searchBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    const searchUser = document.getElementById("SearchBar").value;
    window.location.href=`/html/searchUserPage.html?user=${searchUser}&page=1`;
});
