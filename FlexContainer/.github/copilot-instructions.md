## Objetivo rápido

Este repositório é um pequeno exemplo de layout usando Flexbox em HTML/CSS. O objetivo principal do agente é manter, melhorar e documentar pequenos ajustes de layout, responsividade e estilos.

## Estrutura essencial

- `index.html` — página HTML simples com uma estrutura: um `h1` e uma `.container` que contém `.list` com múltiplos `.item`.
- `style.css` — estilos centrais. Note os seletores principais: `.container`, `.list`, `.item`, `h1`.

## Padrões e intenções do projeto

- Layout com Flexbox: `.container` usa `display:flex` e centraliza conteúdo verticalmente com `height:100vh`.
- Lista responsiva: `.list` usa `display:flex` com `flex-wrap:wrap` e `gap` para organizar itens em múltiplas linhas.
- Itens com comportamento flex: `.item` define `flex:1` para permitir que elementos cresçam; margem e padding combinam para espaçamento.

## O que um agente deve priorizar

1. Manter compatibilidade visual simples e legível — preservar cores e espaçamentos existentes ao ajustar regras.
2. Garantir responsividade mínima: verificar behavior em larguras pequenas (mobile) e ajustar `flex-direction`, `flex-basis`, `min-width` ou `@media` quando necessário.
3. Evitar mudanças de markup desnecessárias — prefira ajustes em CSS salvo quando corrige semântica ou acessibilidade.

## Exemplos concretos de mudanças aceitáveis

- Adicionar breakpoint mobile: exemplo em `style.css` usando `@media (max-width: 600px)` para mudar `.container { flex-direction: column }`.
- Adicionar breakpoint mobile: exemplo já presente em `style.css` usando `@media (max-width: 600px)` para mudar `.container { flex-direction: column }`.
- Alterar `.item` para definir `min-width: 120px` em vez de depender só de `flex:1` se itens colapsarem em telas pequenas.
- Alterar `.item` para definir `min-width: 120px` em vez de depender só de `flex:1` se itens colapsarem em telas pequenas. O arquivo `style.css` já contém um exemplo (`min-width:120px`) no breakpoint móvel.
- Trocar `gap` ou `padding` para ajustar espaçamento — preserve proporção visual com base nas medidas existentes (gap:15px, padding:20px).

## Convenções do repositório

- Prefer editar `style.css` para mudanças de layout visuais. Modificações em `index.html` devem ser motivadas por correção semântica ou acessibilidade (ex.: usar `<ul>`/`<li>` para listas).
- Arquivos devem manter encoding UTF-8 e comentários em português.

## Comandos de desenvolvedor (local)

- Este é um projeto estático. Para testar localmente, abra `index.html` no navegador ou sirva com um servidor estático (ex.: `Live Server` extension do VS Code ou `python -m http.server`).
 - Este é um projeto estático. Para testar localmente, abra `index.html` no navegador ou sirva com um servidor estático (ex.: `Live Server` extension do VS Code ou `python -m http.server`).

Passo rápido para testar o breakpoint móvel:

1. Abra `index.html` no navegador.
2. Abra as DevTools (F12) e ative o modo de dispositivo responsivo.
3. Reduza a largura do viewport para <= 600px e verifique se os itens passam a empilhar verticalmente (container em column) e cada `.item` ocupa a largura total.

## Integrações e dependências externas

- Nenhuma dependência externa direta no repositório. Quando sugerir adicionar bibliotecas (ex.: normalize.css ou tiny reset), documente o motivo e a alternativa CSS pura.

## Como escrever patches úteis

- Forneça descrição curta no commit: o que foi mudado e por quê (ex.: "Ajuste breakpoint mobile: muda direction para column em <600px para melhorar leitura").
- Inclua antes/depois (capturas de tela ou descrições de layout) quando alterar visualmente elementos.

## Exemplos do código-base para referência

- `.container` (linha em `style.css`) — centralização vertical: `height:100vh; align-items:center; justify-content:space-around;`.
- `.list` — comportamento de wrap: `display:flex; flex-wrap:wrap; gap:15px;`.
- `.item` — comportamento flexível: `flex:1; padding:20px; border-radius:5px;`.

Se alguma seção estiver incompleta ou você quer que eu expanda exemplos (ex.: snippets de @media, commits de exemplo), diga qual parte quer que eu detalhe.
