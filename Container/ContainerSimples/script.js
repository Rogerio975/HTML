let divCounter = 2; // Inicia o contador a partir da 2ª div

function createDiv() {
    const newDiv = document.createElement('div');
    newDiv.className = 'container';
    newDiv.innerHTML = `<h1>Container ${divCounter}</h1><p>Este é o container ${divCounter}.</p>`;
    newDiv.addEventListener('click', createDiv);
    document.body.appendChild(newDiv);
    divCounter++; // Incrementa o contador
}

const initialContainer = document.querySelector('.container');
initialContainer.addEventListener('click', createDiv);