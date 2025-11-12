document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // You can replace this with your authentication logic
    if (username === "user" && password === "password") {
        // Redirect to dashboard or any other page upon successful login
        window.location.href = "dashboard.html";
    } else {
        document.getElementById("error-message").innerText = "Invalid username or password";
    }
});