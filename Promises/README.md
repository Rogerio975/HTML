# Exemplos de Promises no JavaScript

Este projeto contém exemplos práticos e interativos sobre **Promises** em JavaScript, cobrindo desde conceitos básicos até técnicas avançadas.

## 📁 Arquivos do Projeto

- **index.html** - Interface interativa com exemplos executáveis
- **exemplo-promises.js** - Código com todos os exemplos comentados
- **README.md** - Este arquivo

## 🚀 Como Usar

### Opção 1: Abrir no Navegador
1. Abra o arquivo `index.html` em seu navegador
2. Clique nos botões para executar cada exemplo
3. Veja os resultados no console interativo

### Opção 2: Node.js
```bash
node exemplo-promises.js
```

## 📚 Conceitos Cobertos

### 1. **Promise Simples**
Uma Promise é um objeto que representa uma operação assíncrona que pode resultar em sucesso ou falha.

```javascript
const promise = new Promise((resolve, reject) => {
  // Executar operação assíncrona
  if (sucesso) {
    resolve(valor); // Sucesso
  } else {
    reject(erro);   // Falha
  }
});
```

**Estados de uma Promise:**
- ⏳ **Pending** (Pendente): A operação ainda está em progresso
- ✓ **Fulfilled** (Resolvida): A operação foi concluída com sucesso
- ✗ **Rejected** (Rejeitada): A operação falhou

---

### 2. **then(), catch() e finally()**

```javascript
promise
  .then((resultado) => {
    // Executado se a promise for resolvida
    console.log('Sucesso:', resultado);
  })
  .catch((erro) => {
    // Executado se a promise for rejeitada
    console.log('Erro:', erro);
  })
  .finally(() => {
    // Executado sempre, independente do resultado
    console.log('Finalizado');
  });
```

---

### 3. **Promise Chain (Encadeamento)**
Conectar múltiplas operações assíncrona em sequência:

```javascript
fetch('/api/usuarios/1')
  .then(response => response.json())
  .then(usuario => fetch(`/api/posts/${usuario.id}`))
  .then(response => response.json())
  .then(posts => console.log('Posts do usuário:', posts))
  .catch(erro => console.log('Erro:', erro));
```

---

### 4. **Promise.all()**
Aguardar múltiplas promises **em paralelo**. Se uma falhar, todas falham:

```javascript
Promise.all([
  fetch('/api/usuarios'),
  fetch('/api/posts'),
  fetch('/api/comentarios')
])
.then(([usuarios, posts, comentarios]) => {
  console.log('Todos os dados carregados!');
})
.catch(erro => console.log('Erro ao carregar dados:', erro));
```

---

### 5. **Promise.race()**
Retorna o resultado da **primeira promise** que resolver:

```javascript
Promise.race([
  fetch('/api/usuarios', { signal: timeout(5000) }),
  new Promise((_, reject) => 
    setTimeout(() => reject('Timeout'), 5000)
  )
])
.then(response => console.log('Resposta rápida:', response))
.catch(erro => console.log('Timeout ou erro:', erro));
```

---

### 6. **Promise.allSettled()**
Aguarda todas as promises, retornando seus resultados (sucesso ou falha):

```javascript
Promise.allSettled([promise1, promise2, promise3])
  .then(resultados => {
    resultados.forEach((resultado, index) => {
      if (resultado.status === 'fulfilled') {
        console.log(`Promise ${index}: ${resultado.value}`);
      } else {
        console.log(`Promise ${index} falhou: ${resultado.reason}`);
      }
    });
  });
```

---

### 7. **Promise.any()**
Retorna a primeira promise **resolvida** (ignora rejeitadas):

```javascript
Promise.any([promise1, promise2, promise3])
  .then(resultado => console.log('Primeira a resolver:', resultado))
  .catch(erro => console.log('Todas falharam:', erro));
```

---

### 8. **Async/Await (Sintaxe Moderna)**
Forma mais legível e intuitiva de trabalhar com Promises:

```javascript
async function buscarDados() {
  try {
    // Aguardar promise como se fosse síncrono
    const usuario = await fetch('/api/usuarios/1').then(r => r.json());
    const posts = await fetch(`/api/posts/${usuario.id}`).then(r => r.json());
    
    console.log('Usuário:', usuario);
    console.log('Posts:', posts);
  } catch (erro) {
    console.log('Erro:', erro);
  }
}

buscarDados();
```

---

### 9. **Promise.resolve() e Promise.reject()**
Criar promises que já estão resolvidas ou rejeitadas:

```javascript
// Atalho para criar promise resolvida
Promise.resolve('Valor')
  .then(valor => console.log(valor)); // Imprime: Valor

// Atalho para criar promise rejeitada
Promise.reject('Erro')
  .catch(erro => console.log(erro)); // Imprime: Erro
```

---

## 💡 Casos de Uso Comuns

### Requisições HTTP
```javascript
async function buscarUsuario(id) {
  try {
    const response = await fetch(`/api/usuarios/${id}`);
    if (!response.ok) throw new Error('Usuário não encontrado');
    return await response.json();
  } catch (erro) {
    console.error('Erro:', erro);
  }
}
```

### Operações em Sequência
```javascript
async function fluxoCompleto() {
  try {
    const usuario = await criarUsuario({ nome: 'João' });
    const perfil = await criarPerfil(usuario.id);
    const preferencias = await carregarPreferencias(usuario.id);
    return { usuario, perfil, preferencias };
  } catch (erro) {
    console.error('Erro no fluxo:', erro);
  }
}
```

### Requisições em Paralelo
```javascript
async function buscarDadosCompletos(id) {
  try {
    const [usuario, posts, comentarios] = await Promise.all([
      fetch(`/api/usuarios/${id}`).then(r => r.json()),
      fetch(`/api/usuarios/${id}/posts`).then(r => r.json()),
      fetch(`/api/usuarios/${id}/comentarios`).then(r => r.json())
    ]);
    return { usuario, posts, comentarios };
  } catch (erro) {
    console.error('Erro:', erro);
  }
}
```

### Timeout em Requisições
```javascript
async function buscarComTimeout(url, timeout = 5000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, { signal: controller.signal });
    return await response.json();
  } catch (erro) {
    if (erro.name === 'AbortError') {
      console.error('Requisição expirou');
    } else {
      console.error('Erro:', erro);
    }
  } finally {
    clearTimeout(timeoutId);
  }
}
```

---

## 🎯 Boas Práticas

✅ **Faça:**
```javascript
// Sempre use .catch() ou try/catch
fetch(url)
  .then(r => r.json())
  .catch(erro => console.error(erro));

// Use async/await para código mais legível
async function buscar() {
  try {
    const dados = await fetch(url).then(r => r.json());
  } catch (erro) {
    console.error(erro);
  }
}

// Use Promise.all() para operações paralelas
await Promise.all([op1, op2, op3]);
```

❌ **Não faça:**
```javascript
// Não ignore erros
fetch(url).then(r => r.json()); // Sem .catch()

// Não sequencie quando pode paralelizar
await op1;
await op2; // Lento
// Melhor: await Promise.all([op1, op2]);

// Não misture callbacks com promises
promise.then(callback);
promise.on('resolved', callback); // Inconsistente
```

---

## 🔗 Recursos Adicionais

- [MDN - Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [MDN - Async/Await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [JavaScript.info - Promises](https://javascript.info/promise-basics)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

---

## 📝 Resumo Rápido

| Método | Uso | Retorna |
|--------|-----|---------|
| `new Promise()` | Criar nova promise | Promise |
| `.then()` | Próximo passo se resolveu | Promise |
| `.catch()` | Tratar erro | Promise |
| `.finally()` | Lógica final | Promise |
| `Promise.all()` | Aguardar todas (paralelo) | Promise |
| `Promise.race()` | Primeira a resolver | Promise |
| `Promise.allSettled()` | Resultado de todas | Promise |
| `Promise.any()` | Primeira resolvida | Promise |
| `Promise.resolve()` | Criar promise resolvida | Promise |
| `Promise.reject()` | Criar promise rejeitada | Promise |
| `async/await` | Sintaxe moderna | Promise |

---

## 📧 Dúvidas?

Para mais informações, consulte a documentação oficial do JavaScript ou teste os exemplos interativos no `index.html`.

**Bom aprendizado!** 🎓
