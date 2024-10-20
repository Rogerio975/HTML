// Seleciona todas as divs
const div1 = document.querySelector('.div1');
const div2 = document.querySelector('.div2');
const div3 = document.querySelector('.div3');

// Adiciona um evento de clique para a div1
div1.addEventListener('click', () => {
    div1.querySelector('p').innerText = 'O texto do Parágrafo 1 foi alterado!';
});

// Adiciona um evento de clique para a div2 com prompt
div2.addEventListener('click', () => {
    const userInput = prompt('Digite o novo texto para o Parágrafo 2:');
    if (userInput !== null && userInput.trim() !== "") {
        div2.querySelector('p').innerText = userInput;
    }
});

// Adiciona um evento de clique para a div3
div3.addEventListener('click', () => {
    div3.querySelector('p').innerText = 'O texto longo foi alterado!';
});