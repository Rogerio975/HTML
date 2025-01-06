document.getElementById('colorBox').addEventListener('click', function() {
    const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', '#4169E1', 'rgb(177, 108, 177)'];
    console.log('Números de cores disponíveis: ' + colors.length);
    
    const currentColor = this.style.backgroundColor;
    let newColor = colors[Math.floor(Math.random() * colors.length)];
    
    while (newColor === currentColor) {
        newColor = colors[Math.floor(Math.random() * colors.length)];
    }
    
    this.style.backgroundColor = newColor;
});