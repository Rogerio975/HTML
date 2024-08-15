// JavaScript para adicionar funcionalidade de rolagem (simplificado)
const carousel = document.querySelector('.carousel');
const cards = carousel.querySelectorAll('.card');

// Função para rolar para o próximo card
function scrollNext() {
  carousel.scrollLeft += cards[0].offsetWidth;
}

// Adicione um botão ou evento para chamar a função scrollNext()

setInterval(scrollNext, 3000);