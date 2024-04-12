const ServerLink = "http://localhost:3000";
let userParams = new URLSearchParams(window.location.search);
let toSearch = userParams.get('user');
let pageNo = parseInt(userParams.get('page'));

const searchBar = document.getElementById("SearchBar");
searchBar.value = toSearch;

const searchList = document.getElementById("searchList");
const prevPageBtn = document.getElementById("prevPage");
const nextPageBtn = document.getElementById("nextPage");
const searchBtn = document.getElementById("searchBtn");


async function userNameList(toSearch,pageNo){
    try {
        let users = await axios.get(`${ServerLink}api/v1/users?name=${toSearch}&offset=${(pageNo-1)*3}&limit=${3}`,{
            withCredentials: true,
        });
        users = users.data.data;
        return users;
    } catch (error) {
        checkForTokenAuthenticationError(error);
        console.log("Unable to fetch users!!");
        return [];
    }
}

async function addFetchUserList(){
    const list = await userNameList(toSearch,pageNo);
    if(list.length>0){
        nextPageBtn.value = `Page-${pageNo+1}`;
    }else{
        nextPageBtn.hidden = true;
    }
    list.forEach((user) => {
        const addUser = document.createElement("li");
        addUser.innerText = user.name;
        const addFriendLink = document.createElement("a");
        addFriendLink.href = `/html/addFriendPage.html?userName=${user.name}&userId=${user._id}`; 
        addFriendLink.appendChild(addUser);
        searchList.appendChild(addFriendLink);
    }); 
}

addFetchUserList();

if(pageNo === 1){
    prevPageBtn.hidden = true;
}else{
    prevPageBtn.value = `Page-${pageNo-1}`;
}

prevPageBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    window.location.href=`/html/searchUserPage.html?user=${toSearch}&page=${Math.max((pageNo-1),1)}`;
});

nextPageBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    window.location.href=`/html/searchUserPage.html?user=${toSearch}&page=${pageNo + 1}`;
});

searchBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    toSearch = searchBar.value;
    window.location.href = `/html/searchUserPage.html?user=${toSearch}&page=1`;
});

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

async function addFriendRequestList(){
    try {
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
}

addFriendRequestList();