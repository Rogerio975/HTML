let pessoas = [];
let total = 0;
let atual = 0;
let editIndex = null;

function iniciarCadastro() {
  total = Number(document.getElementById("qtd").value);

  if (isNaN(total) || total <= 0) {
    alert("Digite uma quantidade válida!");
    return;
  }

  document.getElementById("form-qtd").classList.add("hidden");
  document.getElementById("form-pessoas").classList.remove("hidden");

  atual = 1;
  document.getElementById("numAtual").innerText = atual + " de " + total;
}

function salvarPessoa() {
  let nome = document.getElementById("nome").value;
  let idade = document.getElementById("idade").value;
  let profissao = document.getElementById("profissao").value;

  if (!nome || !idade || !profissao) {
    alert("Preencha todos os campos!");
    return;
  }

  if (editIndex !== null) {
    pessoas[editIndex] = { nome, idade, profissao };
    editIndex = null;
  } else {
    pessoas.push({ nome, idade, profissao });
  }

  atualizarLista();

  document.getElementById("nome").value = "";
  document.getElementById("idade").value = "";
  document.getElementById("profissao").value = "";

  atual++;

  if (atual <= total) {
    document.getElementById("numAtual").innerText = atual + " de " + total;
  } else {
    document.getElementById("form-pessoas").classList.add("hidden");
  }
}

function atualizarLista() {
  let div = document.getElementById("lista");
  div.innerHTML = "";

  pessoas.forEach((p, i) => {
    div.innerHTML += `
      <div class="pessoa">
        <strong>${i + 1}. ${p.nome}</strong><br>
        Idade: ${p.idade}<br>
        Profissão: ${p.profissao}

        <div class="btns">
          <button class="btn-view" onclick="visualizar(${i})">Visualizar</button>
          <button class="btn-edit" onclick="editar(${i})">Editar</button>
          <button class="btn-delete" onclick="excluir(${i})">Excluir</button>
        </div>
      </div>
    `;
  });
}

function visualizar(i) {
  const p = pessoas[i];
  document.getElementById("modalInfo").innerHTML =
    `<strong>Nome:</strong> ${p.nome}<br>
     <strong>Idade:</strong> ${p.idade}<br>
     <strong>Profissão:</strong> ${p.profissao}`;

  document.getElementById("modal").classList.remove("hidden");
}

function fecharModal() {
  document.getElementById("modal").classList.add("hidden");
}

function editar(i) {
  const p = pessoas[i];
  document.getElementById("form-pessoas").classList.remove("hidden");

  document.getElementById("nome").value = p.nome;
  document.getElementById("idade").value = p.idade;
  document.getElementById("profissao").value = p.profissao;

  editIndex = i;
}

function excluir(i) {
  if (confirm("Deseja realmente excluir esta pessoa?")) {
    pessoas.splice(i, 1);
    atualizarLista();
  }
}