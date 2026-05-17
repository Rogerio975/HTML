document.getElementById("loginForm").addEventListener("submit", function(event){
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const remember = document.getElementById("remember").checked;

    // Aqui você pode adicionar a lógica de autenticação
    console.log("Usuário:", username);
    console.log("Senha:", password);
    console.log("Armazenar a senha:", remember);

    // Exemplo de redirecionamento após login
    alert("Login realizado com sucesso!");
    window.location.href = "dashboard.html"; // Simula um redirecionamento
});