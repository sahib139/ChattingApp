document.addEventListener("DOMContentLoaded", async () => {
    const friendsList = document.querySelector(".friendsList");
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

// document.getElementById("searchBtn").addEventListener("click", function() {
//     let searchInput = document.querySelector(".SearchBar").value;

//     window.location.href = "search-results.html?query=" + encodeURIComponent(searchInput);
// });
