const buttonContainer = document.querySelector('.cartao');

buttonContainer.addEventListener('click', (event) => {
  if (event.target.tagName.toLowerCase() === 'button') {
    const newButton = document.createElement('button');
    newButton.textContent = 'Novo!';
    newButton.classList.add('button');

    buttonContainer.insertBefore(newButton, event.target.nextSibling);
  }
});