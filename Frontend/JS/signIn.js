document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        try {
            const response = await axios.post("http://localhost:3000/v1/logIn", {
                email,
                password
            });

            console.log("Login successful:", response.data);
            window.location.href = './html/user-homepage.html';
        } catch (error) {
            console.error("Login failed:", error);
        }
    });
    const SignUp = document.getElementById('SignUp-btn');
    SignUp.addEventListener("click",(e)=>{
        e.preventDefault(); 
        window.location.href = "./html/signUp.html";
    });
});
