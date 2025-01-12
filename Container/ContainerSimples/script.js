const container = document.querySelector('.container');
let divCounter = 2; // Inicia o contador a partir da 2ª div

container.addEventListener('click', () => {
    const newDiv = document.createElement('div');
    newDiv.className = 'container';
    newDiv.innerHTML = `<h1>Container ${divCounter}</h1><p>Este é o container ${divCounter}.</p>`;
    document.body.appendChild(newDiv);
    divCounter++; // Incrementa o contador
});