document.addEventListener("DOMContentLoaded", () => {
    console.log("hello");
    const form = document.getElementById("signUpForm");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        try {
            const response = await axios.post("http://localhost:3000/v1/singUp", {
                name,
                email,
                password
            });

            console.log("signUp successful:", response.data);
            window.location.href = '/';
        } catch (error) {
            console.error("Login failed:", error);
        }
    });
});