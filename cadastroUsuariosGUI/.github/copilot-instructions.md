<!-- Copilot / AI agent instructions for the cadastroUsuariosGUI project -->
# Copilot Instructions — cadastroUsuariosGUI

Purpose: Help an AI agent be immediately productive editing this small, single-page user-management GUI. The app is static (HTML/CSS/JS), keeps state in-memory, and is intended to run in a browser. There is no build system or test harness.

**Big Picture**
- **Single-page static app**: UI in `index.html`, logic in `script.js`, presentation in `style.css`.
- **In-memory state**: The user list is stored in the global `pessoas` array in `script.js` and rendered via `atualizarLista()`.
- **No backend or persistence**: Do not assume any server or database. If you need persistence, use `localStorage` and add `saveState()` / `loadState()` helpers.

**Key files & responsibilities**
- `index.html`: main DOM structure — form inputs (`#nome`, `#idade`, `#profissao`), `#btnCadastrar`, `#form-container`, and `#lista`.
- `script.js`: application logic. Important symbols:
  - `pessoas` (global array) — current user list.
  - `editIndex` — index being edited, `null` when creating.
  - `salvarPessoa()` — validate and push/update `pessoas`.
  - `atualizarLista()` — renders `pessoas` into `#lista` using template strings and inline `onclick` handlers.
  - `editar(i)`, `excluir(i)`, `visualizar(i)` — row operations.
- `style.css`: visual class names to keep in mind (`.btn-primary`, `.card`, `.hidden`, `.pessoa`).

**Concrete patterns and gotchas (from this codebase)**
- The code mixes modern event listeners with inline `onclick` handlers generated inside `atualizarLista()` (e.g. `onclick="editar(${i})"`). When modifying rendering, preserve existing IDs/classes or migrate all handlers to addEventListener consistently.
- `script.js` references `#modal` and `#modalInfo` inside `visualizar()` but `index.html` currently lacks those elements — verify or add modal markup before relying on modal behavior.
- Text is in Portuguese; keep UI copy consistent when editing (e.g. `Cadastrar Usuário`, `Preencha todos os campos!`).
- Mutations happen directly on `pessoas` (push, splice, direct index assignment). If you introduce immutability, ensure `atualizarLista()` receives the updated reference or re-renders after changes.

**When making changes**
- Preserve DOM IDs used by JS (`#nome`, `#idade`, `#profissao`, `#lista`, `#form-container`, `#btnCadastrar`, `#tituloForm`).
- Prefer refactoring inline `onclick` handlers to delegated event listeners for testability, but do it in a single, atomic PR with examples and migration notes.
- If enabling persistence, add `saveState()` and `loadState()` functions and call them from `salvarPessoa()` and on script init; keep the existing behavior as a fallback.

**Developer workflow / how to run locally**
- No build step — open `index.html` in browser or serve the folder with a simple HTTP server. Example using Python (PowerShell):

```
python -m http.server 8000
# then open http://localhost:8000 in your browser
```

- Alternatively, use VS Code Live Server extension ("Go Live").
- Debugging: use browser DevTools console and set breakpoints inside `script.js` (notably in `salvarPessoa()` and `atualizarLista()`).

**Examples from code**
- Rendering template (keep pattern or migrate carefully):

```
div.innerHTML += `
  <div class="pessoa">
    <strong>${p.nome}</strong>... 
    <button onclick="editar(${i})">Editar</button>
  </div>`;
```

- Use of global state:

```
let pessoas = [];
let editIndex = null;
```

**Merging guidance**
- If `.github/copilot-instructions.md` already exists, preserve any project-specific notes and follow the file's structure. Merge new sections under clear headers (Big Picture, Key files, Patterns, Workflow).

If anything in this file is unclear or you want the agent to follow stricter rules (for example: always add tests, always add `localStorage`), tell me which rules to enforce and I will update this doc.
