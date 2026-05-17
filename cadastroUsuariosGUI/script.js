let pessoas = [];
let editIndex = null;

// Exibir formulário de cadastro
document.getElementById("btnCadastrar").addEventListener("click", () => {
  abrirFormulario();
});

function abrirFormulario() {
  document.getElementById("form-container").classList.remove("hidden");
  document.getElementById("tituloForm").innerText = "Cadastrar Usuário";

  document.getElementById("nome").value = "";
  document.getElementById("idade").value = "";
  document.getElementById("profissao").value = "";

  editIndex = null;
}

function cancelar() {
  document.getElementById("form-container").classList.add("hidden");
}

function salvarPessoa() {
  const nome = document.getElementById("nome").value;
  const idade = document.getElementById("idade").value;
  const profissao = document.getElementById("profissao").value;

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
  cancelar();
}

function atualizarLista() {
  let div = document.getElementById("lista");
  div.innerHTML = "";

  pessoas.forEach((p, i) => {
    div.innerHTML += `
      <div class="pessoa">
        <strong>${p.nome}</strong><br>
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

  document.getElementById("modalInfo").innerHTML = `
    <strong>Nome:</strong> ${p.nome}<br>
    <strong>Idade:</strong> ${p.idade}<br>
    <strong>Profissão:</strong> ${p.profissao}
  `;

  document.getElementById("modal").classList.remove("hidden");
}

function fecharModal() {
  document.getElementById("modal").classList.add("hidden");
}

function editar(i) {
  const p = pessoas[i];

  editIndex = i;

  document.getElementById("form-container").classList.remove("hidden");
  document.getElementById("tituloForm").innerText = "Editar Usuário";

  document.getElementById("nome").value = p.nome;
  document.getElementById("idade").value = p.idade;
  document.getElementById("profissao").value = p.profissao;
}

function excluir(i) {
  if (confirm("Deseja realmente excluir?")) {
    pessoas.splice(i, 1);
    atualizarLista();
  }
}