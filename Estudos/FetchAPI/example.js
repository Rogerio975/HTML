fetch('https://jsonplaceholder.typicode.com/posts')
  .then(resposta => {
    if (resposta.ok) {
      return resposta.json();
    } else {
      console.log('Deu erro!');
    }
  })
  .then(json => console.log(json))
  .catch(erro => console.log('Erro de conexão:', erro));