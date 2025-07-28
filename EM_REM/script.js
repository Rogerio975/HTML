let isYellow = true;
document.getElementById('meuBotao').addEventListener('click', function() {
    if (isYellow) {
        document.getElementById('minhaDiv').style.backgroundColor = '';
    } else {
        document.getElementById('minhaDiv').style.backgroundColor = '#fff9c4';
    }
    isYellow = !isYellow;
});