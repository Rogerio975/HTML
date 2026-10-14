// Chave do LocalStorage
const STORAGE_KEY = 'cadastros_usuarios_app';

// Elementos do DOM
const userForm = document.getElementById('userForm');
const dataNascimentoInput = document.getElementById('dataNascimento');
const idadeDisplay = document.getElementById('idadeDisplay');
const userTableBody = document.getElementById('userTableBody');
const emptyState = document.getElementById('emptyState');
const userCount = document.getElementById('userCount');
const btnLimparTudo = document.getElementById('btnLimparTudo');
const confirmModal = document.getElementById('confirmModal');
const searchInput = document.getElementById('searchInput');

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    renderizarTabela();
    const hoje = new Date().toISOString().split('T')[0];
    dataNascimentoInput.setAttribute('max', hoje);
});

// Função de cálculo de idade
function calcularIdade(dataNascimentoStr) {
    if (!dataNascimentoStr) return null;

    const nascimento = new Date(dataNascimentoStr + 'T00:00:00');
    const hoje = new Date();

    if (isNaN(nascimento.getTime())) return null;

    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mesDiff = hoje.getMonth() - nascimento.getMonth();

    if (mesDiff < 0 || (mesDiff === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }

    return idade >= 0 ? idade : null;
}

// Atualização dinâmica do campo de exibição de idade
function atualizarIdadeCalculada() {
    const dataVal = dataNascimentoInput.value;
    const idade = calcularIdade(dataVal);

    if (idade !== null) {
        idadeDisplay.innerHTML = `<span class="text-brand-600 font-bold">${idade} ${idade === 1 ? 'ano' : 'anos'}</span><i class="fa-solid fa-circle-check text-green-500 text-xs"></i>`;
    } else {
        idadeDisplay.innerHTML = `<span>-- anos</span><i class="fa-regular fa-clock text-slate-400 text-xs"></i>`;
    }
}

// Obter usuários do LocalStorage
function getUsuarios() {
    const dados = localStorage.getItem(STORAGE_KEY);
    return dados ? JSON.parse(dados) : [];
}

// Salvar usuários no LocalStorage
function setUsuarios(usuarios) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(usuarios));
}

// Cadastrar novo usuário
function cadastrarUsuario() {
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const endereco = document.getElementById('endereco').value.trim();
    const dataNascimento = dataNascimentoInput.value;
    const idade = calcularIdade(dataNascimento);

    if (!nome || !email || !endereco || !dataNascimento) {
        mostrarToast('Por favor, preencha todos os campos!', 'error');
        return;
    }

    if (idade === null) {
        mostrarToast('Por favor, informe uma data de nascimento válida!', 'error');
        return;
    }

    const novoUsuario = {
        id: Date.now(),
        nome,
        email,
        endereco,
        dataNascimento,
        idade
    };

    const usuarios = getUsuarios();
    usuarios.unshift(novoUsuario);
    setUsuarios(usuarios);

    userForm.reset();
    atualizarIdadeCalculada();

    renderizarTabela();
    mostrarToast('Usuário cadastrado com sucesso!', 'success');
}

// Formatar data AAAA-MM-DD para DD/MM/AAAA
function formatarDataBR(dataISO) {
    if (!dataISO) return '';
    const [ano, mes, dia] = dataISO.split('-');
    return `${dia}/${mes}/${ano}`;
}

// Renderizar Lista / Tabela
function renderizarTabela() {
    const usuarios = getUsuarios();
    const termoBusca = searchInput.value.toLowerCase().trim();

    const usuariosFiltrados = usuarios.filter(u =>
        u.nome.toLowerCase().includes(termoBusca) ||
        u.email.toLowerCase().includes(termoBusca)
    );

    userCount.textContent = `${usuarios.length} ${usuarios.length === 1 ? 'usuário' : 'usuários'}`; // Atualiza contagem de usuários

    if (usuarios.length > 0) {
        btnLimparTudo.classList.remove('hidden');
    } else {
        btnLimparTudo.classList.add('hidden');
    }

    if (usuariosFiltrados.length === 0) {
        userTableBody.innerHTML = '';
        emptyState.classList.remove('hidden');
        return;
    }

    emptyState.classList.add('hidden');

    userTableBody.innerHTML = usuariosFiltrados.map(usuario => `
        <tr class="hover:bg-slate-50/80 transition-colors group">
            <td class="py-3 px-4 font-medium text-slate-800">
                <div class="font-semibold text-slate-900">${escapeHTML(usuario.nome)}</div>
                <div class="text-xs text-slate-400 font-normal truncate max-w-[200px]" title="${escapeHTML(usuario.endereco)}">
                    <i class="fa-solid fa-location-dot text-[10px] mr-1"></i>${escapeHTML(usuario.endereco)}
                </div>
            </td>
            <td class="py-3 px-4 text-xs">
                <span class="text-slate-600 block">${escapeHTML(usuario.email)}</span>
            </td>
            <td class="py-3 px-4 text-xs whitespace-nowrap">
                <div class="font-medium text-slate-700">${formatarDataBR(usuario.dataNascimento)}</div>
                <div class="inline-block mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-50 text-brand-700 border border-brand-100">
                    ${usuario.idade} ${usuario.idade === 1 ? 'ano' : 'anos'}
                </div>
            </td>
            <td class="py-3 px-4 text-center">
                <button onclick="confirmarExclusao(${usuario.id})" title="Excluir cadastro"
                    class="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                    <i class="fa-regular fa-trash-can"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Busca e filtro
function filtrarUsuarios() {
    renderizarTabela();
}

// Confirmar e Deletar registro individual
function confirmarExclusao(id) {
    abrirModal(
        'Excluir Registro',
        'Tem certeza de que deseja remover este usuário? Esta ação não pode ser desfeita.',
        () => {
            let usuarios = getUsuarios();
            usuarios = usuarios.filter(u => u.id !== id);
            setUsuarios(usuarios);
            renderizarTabela();
            fecharModal();
            mostrarToast('Registro excluído!', 'info');
        }
    );
}

// Confirmar e Limpar todos os registros
function confirmarLimparTudo() {
    abrirModal(
        'Limpar Todos os Registros',
        'Tem certeza de que deseja excluir TODOS os usuários salvos? Todos os dados serão perdidos.',
        () => {
            localStorage.removeItem(STORAGE_KEY);
            renderizarTabela();
            fecharModal();
            mostrarToast('Todos os registros foram removidos.', 'info');
        }
    );
}

// Controle do Modal Customizado
function abrirModal(titulo, descricao, acaoConfirmar) {
    document.getElementById('modalTitle').textContent = titulo;
    document.getElementById('modalDescription').textContent = descricao;

    const btnConfirm = document.getElementById('modalConfirmBtn');
    btnConfirm.onclick = acaoConfirmar;

    confirmModal.classList.remove('hidden');
}

function fecharModal() {
    confirmModal.classList.add('hidden');
}

// Notificações Toast para Feedback do usuário
function mostrarToast(mensagem, tipo = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    const toastIcon = document.getElementById('toastIcon');

    toastMessage.textContent = mensagem;

    if (tipo === 'success') {
        toast.className = 'fixed bottom-5 right-5 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg text-white font-medium animate-fade-in bg-emerald-600';
        toastIcon.className = 'fa-solid fa-circle-check';
    } else if (tipo === 'error') {
        toast.className = 'fixed bottom-5 right-5 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg text-white font-medium animate-fade-in bg-red-600';
        toastIcon.className = 'fa-solid fa-circle-exclamation';
    } else {
        toast.className = 'fixed bottom-5 right-5 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg text-white font-medium animate-fade-in bg-slate-800';
        toastIcon.className = 'fa-solid fa-circle-info';
    }

    toast.classList.remove('hidden');

    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

// Utilitário para previnir XSS em textos do usuário
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g,
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}
