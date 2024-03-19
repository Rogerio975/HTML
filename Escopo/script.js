// Função para gerar uma cor aleatória em hexadecimal
function gerarCorAleatoria() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }
  
  // Adicionando um evento de clique ao botão
  document.getElementById("botao").addEventListener("click", function() {
    // Selecionando o elemento do parágrafo pelo ID
    var paragrafo = document.getElementById("texto");
  
    // Gerando uma cor aleatória
    var corAleatoria = gerarCorAleatoria();
  
    // Mudando a cor do texto do parágrafo
    paragrafo.style.color = corAleatoria;
  });