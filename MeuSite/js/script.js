const botao = document.getElementById("botao");

botao.addEventListener("click", function () {
    alert("Olá! JavaScript está funcionando.");
});

const mensagem = document.getElementById("mensagem");

botao.addEventListener("click", function () {
    mensagem.innerHTML = "<p>Você clicou no botão <strong>Clique aqui</strong>!</p>";
});