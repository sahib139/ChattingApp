document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("signUpForm");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        try {
            const response = await axios.post("http://localhost:3000/v1/singUp", {
                username,
                password
            });

            console.log("signUp successful:", response.data);
        } catch (error) {
            console.error("Login failed:", error);
        }
    });
});