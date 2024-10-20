// Seleciona todas as divs
const div1 = document.querySelector('.div1');
const div2 = document.querySelector('.div2');
const div3 = document.querySelector('.div3');

// Adiciona um evento de clique para cada div
div1.addEventListener('click', () => {
    div1.querySelector('p').innerText = 'O texto do Parágrafo 1 foi alterado!';
});

div2.addEventListener('click', () => {
    div2.querySelector('p').innerText = 'O texto do Parágrafo 2 foi alterado!';
});

div3.addEventListener('click', () => {
    div3.querySelector('p').innerText = 'O texto longo foi alterado!';
});