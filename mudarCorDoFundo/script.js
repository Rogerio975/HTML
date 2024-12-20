function changeBackgroundColor() {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33A2', '#33FFF3'];
    const currentHour = new Date().getHours();
    const colorIndex = currentHour % colors.length; // Ciclo baseado na hora do dia
    document.body.style.backgroundColor = colors[colorIndex];
  }
  
  // Alterar cor assim que o script carregar
  changeBackgroundColor();
  
  // Atualizar a cada hora (3600000 ms)
  setInterval(changeBackgroundColor, 3600000);  