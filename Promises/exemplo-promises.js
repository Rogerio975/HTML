// ============================================
// EXEMPLO DE USO DE PROMISES NO JAVASCRIPT
// ============================================

// 1. CRIANDO UMA PROMISE SIMPLES
// ================================
console.log('--- 1. Promise Simples ---');

const minhaPromise = new Promise((resolve, reject) => {
  // Simular uma operação assíncrona
  setTimeout(() => {
    const sucesso = true;
    
    if (sucesso) {
      resolve('Operação completada com sucesso!');
    } else {
      reject('Erro na operação!');
    }
  }, 1000);
});

minhaPromise
  .then((resultado) => {
    console.log('✓ Sucesso:', resultado);
  })
  .catch((erro) => {
    console.log('✗ Erro:', erro);
  });


// 2. PROMISE COM REJEIÇÃO
// ========================
console.log('\n--- 2. Promise com Rejeição ---');

const promiseComErro = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('Algo deu errado!');
  }, 1500);
});

promiseComErro
  .then((resultado) => {
    console.log('Sucesso:', resultado);
  })
  .catch((erro) => {
    console.log('✗ Erro capturado:', erro);
  });


// 3. PROMISE CHAIN (ENCADEAMENTO)
// =================================
console.log('\n--- 3. Promise Chain ---');

function buscarDados(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, nome: 'João Silva' });
    }, 500);
  });
}

function buscarDetalhes(usuario) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ...usuario, email: 'joao@example.com', idade: 30 });
    }, 500);
  });
}

buscarDados(1)
  .then((usuario) => {
    console.log('Usuário obtido:', usuario);
    return buscarDetalhes(usuario);
  })
  .then((usuarioCompleto) => {
    console.log('Detalhes completos:', usuarioCompleto);
  })
  .catch((erro) => {
    console.log('Erro na cadeia:', erro);
  });


// 4. PROMISE.ALL - AGUARDAR MÚLTIPLAS PROMISES
// ==============================================
console.log('\n--- 4. Promise.all ---');

const promise1 = new Promise((resolve) => setTimeout(() => resolve('Primeira'), 1000));
const promise2 = new Promise((resolve) => setTimeout(() => resolve('Segunda'), 800));
const promise3 = new Promise((resolve) => setTimeout(() => resolve('Terceira'), 600));

Promise.all([promise1, promise2, promise3])
  .then((resultados) => {
    console.log('Todas as promises resolvidas:', resultados);
  })
  .catch((erro) => {
    console.log('Uma das promises falhou:', erro);
  });


// 5. PROMISE.RACE - PRIMEIRA A RESOLVER
// =======================================
console.log('\n--- 5. Promise.race ---');

const promiseRapida = new Promise((resolve) => setTimeout(() => resolve('Rápida'), 300));
const promiseLenta = new Promise((resolve) => setTimeout(() => resolve('Lenta'), 2000));

Promise.race([promiseRapida, promiseLenta])
  .then((resultado) => {
    console.log('Primeira promise resolvida:', resultado);
  });


// 6. ASYNC/AWAIT (FORMA MODERNA)
// ================================
console.log('\n--- 6. Async/Await ---');

async function executarAsync() {
  try {
    const resultado1 = await buscarDados(2);
    console.log('Dados do usuário:', resultado1);
    
    const resultado2 = await buscarDetalhes(resultado1);
    console.log('Dados completos:', resultado2);
  } catch (erro) {
    console.log('Erro:', erro);
  }
}

executarAsync();


// 7. MULTIPLE ASYNC/AWAIT COM PROMISE.ALL
// ==========================================
console.log('\n--- 7. Multiple Async/Await ---');

async function buscarMultiplosDados() {
  try {
    const [user1, user2, user3] = await Promise.all([
      buscarDados(1),
      buscarDados(2),
      buscarDados(3)
    ]);
    
    console.log('Usuários:', user1, user2, user3);
  } catch (erro) {
    console.log('Erro ao buscar dados:', erro);
  }
}

buscarMultiplosDados();


// 8. PROMISE.RESOLVE E PROMISE.REJECT (ATALHOS)
// ===============================================
console.log('\n--- 8. Promise.resolve e Promise.reject ---');

Promise.resolve('Valor resolvido')
  .then((valor) => {
    console.log('✓ Resolvido:', valor);
  });

Promise.reject('Erro rejeitado')
  .catch((erro) => {
    console.log('✗ Rejeitado:', erro);
  });


// 9. EXEMPLO PRÁTICO: FETCH (API)
// =================================
console.log('\n--- 9. Fetch (Exemplo Prático) ---');

// Exemplo com Fetch API (comentado, pois requer acesso à internet)
/*
fetch('https://api.github.com/users/github')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Erro na requisição');
    }
    return response.json();
  })
  .then((dados) => {
    console.log('Dados da API:', dados.name, dados.bio);
  })
  .catch((erro) => {
    console.log('Erro ao buscar dados:', erro);
  });

// Ou com async/await:
async function buscarUsuario() {
  try {
    const response = await fetch('https://api.github.com/users/github');
    const dados = await response.json();
    console.log('Usuário:', dados.name);
  } catch (erro) {
    console.log('Erro:', erro);
  }
}

buscarUsuario();
*/

console.log('Exemplos de Promises executados!');
