# Entrelace (React)

Versão em React do protótipo HTML/CSS do Entrelace, com o mesmo design e as páginas conectadas por rotas.

Fluxo de cadastro: Início → Validação de residência → Login → Mural.

## Como rodar

```bash
npm install
npm run dev
```

## Rotas

| Rota      | Página (original) | Navega para                                                |
| --------- | ----------------- | ---------------------------------------------------------- |
| `/`       | `index.html`      | `/validacao` (Criar Conta, Começar Agora), `/login` (Entrar) |
| `/validacao` | `validacao.html` | `/login` (enviar para análise e Entrar), `/` (logo)     |
| `/login`  | `login.html`      | `/mural` (entrar e botões sociais), `/` (logo)             |
| `/mural`  | `mural.html`      | `/chat` (Mensagens), `/perfil` (Meu Perfil), `/` (Sair); "Nova Publicação" abre o modal de post |
| `/perfil` | `perfil.html`     | menu (Mural, Mensagens, Meu Perfil, Sair)                  |
| `/chat`   | `chat.html`       | menu (Mural, Mensagens, Meu Perfil, Sair)                  |

## Estrutura

```
src/
├── components/Navbar.jsx # menu único (com dropdown) do Mural, Perfil e Chat
├── pages/      # Home, Validacao, Login, Mural, Perfil, Chat (HTML original convertido para JSX)
├── styles/     # CSS de cada página; navbar.css é a navbar compartilhada
├── hooks/usePage.js     # injeta o CSS da página ao entrar na rota e remove ao sair
├── lib/chatStorage.js   # localStorage das conversas (mesmas chaves do chat.html)
├── lib/likesStorage.js  # localStorage das curtidas (1 por publicação)
├── App.jsx     # rotas
└── main.jsx
```

Cada página tinha seu próprio CSS (com `body`, `.navbar`, `.btn-primary`... diferentes),
por isso o hook `usePage` carrega só o CSS da página atual, evitando conflitos e
preservando o visual idêntico ao original.

Todas as páginas respeitam o tema claro/escuro do sistema (`prefers-color-scheme`),
com a mesma paleta escura.
