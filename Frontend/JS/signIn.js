const ServerLink = "http://13.60.19.44:3000";
document.addEventListener("DOMContentLoaded", () => {

    if(document.cookie){
        window.location.href='/html/chatPage.html';
    }
    const form = document.getElementById("loginForm");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const response = await axios.post(`${ServerLink}/api/v1/logIn`, {
                email,
                password
            });
            console.log("Login successful:", response.data);
            setCookie("token",response.data.token.value,response.data.token.expires);
            window.location.href = '../html/chatPage.html';
        } catch (error) {
            window.alert("Wrong Password");
            document.getElementById("email").value="";
            document.getElementById("password").value="";
            console.error("Login failed:", error);
        }
    });
    const SignUp = document.getElementById('SignUp-btn');
    SignUp.addEventListener("click",(e)=>{
        e.preventDefault(); 
        window.location.href = "/html/signUp.html";
    });
});


function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
