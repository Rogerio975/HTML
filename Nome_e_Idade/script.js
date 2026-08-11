function exibirNomeIdade() {
    const nome = document.getElementById("nome").value.trim();
    const idade = document.getElementById("idade").value;

    if (!nome || !idade) {
        document.getElementById("parágrafo").textContent = "Por favor, informe seu nome e idade.";
        return;
    }

    document.getElementById("parágrafo").textContent = `Nome: ${nome}, Idade: ${idade}`;
}