const ServerLink = "http://13.60.19.44:3000"
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("signUpForm");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        try {
            const response = await axios.post(`${ServerLink}/api/v1/signUp`, {
                name,
                email,
                password
            });

            console.log("signUp successful:", response.data);
            window.location.href = '/html/signIn.html';
        } catch (error) {
            console.error("Login failed:", error);
        }
    });
    const LogIn = document.getElementById('LogIn-btn');
    LogIn.addEventListener("click",(e)=>{
        e.preventDefault(); 
        window.location.href = "/html/signIn.html";
    });
});