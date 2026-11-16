
import { useEffect, useRef, useState } from 'react'
import {
  horaAtual,
  loadActive,
  loadChats,
  saveActive,
  saveChats,
} from '../lib/chatStorage'
import Rodape from '../components/Rodape'
import '../styles/chat.css'

function Chat({ contatoInicial }) {
  const [chats, setChats] = useState(loadChats)
  const [active, setActive] = useState(() => {
    const salvo = loadActive()
    return loadChats()[salvo] ? salvo : ''
  })
  const [busca, setBusca] = useState('')
  const [texto, setTexto] = useState('')
  const [mostrarLista, setMostrarLista] = useState(true)

  const mensagensRef = useRef(null)

  const nomes = Object.keys(chats)
  const mensagens = chats[active] || []
  const termo = busca.toLowerCase()

  useEffect(() => {
    saveChats(chats)
    saveActive(active)
  }, [chats, active])

  useEffect(() => {
    if (!contatoInicial) return

    setChats((atual) =>
      atual[contatoInicial]
        ? atual
        : { ...atual, [contatoInicial]: [] },
    )

    setActive(contatoInicial)
    setMostrarLista(false)
    setTexto('')
  }, [contatoInicial])

  useEffect(() => {
    const elemento = mensagensRef.current

    if (elemento) {
      elemento.scrollTop = elemento.scrollHeight
    }
  }, [active, mensagens.length])

  function abrirConversa(nome) {
    setActive(nome)
    setTexto('')
    setMostrarLista(false)
  }

  function enviar(e) {
    e.preventDefault()

    const valor = texto.trim()

    if (!valor || !active) return

    setChats((atual) => ({
      ...atual,
      [active]: [
        ...(atual[active] || []),
        { from: 'me', text: valor, time: horaAtual() },
      ],
    }))

    setTexto('')
  }

  return (
    <>
      <main className="chat-page">
        <div className="chat-layout">

          <aside
            className={`chat-sidebar ${mostrarLista ? 'show' : ''}`}
          >
            <div className="chat-sidehead">
              <h1>Conversas</h1>

              <input
                className="chat-search"
                type="search"
                placeholder="Buscar conversa..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>

            <div className="chat-list">
              {nomes.length === 0 ? (
                <div className="chat-empty-list">
                  <i className="ph ph-chat-circle"></i>
                  <p>Nenhuma conversa ainda.</p>
                </div>
              ) : (
                nomes.map((nome) => {
                  const ultima =
                    chats[nome].at(-1)?.text || 'Conversa iniciada'

                  if (
                    !(nome + ultima)
                      .toLowerCase()
                      .includes(termo)
                  ) {
                    return null
                  }

                  return (
                    <button
                      type="button"
                      key={nome}
                      className={`chat-person ${
                        nome === active ? 'active' : ''
                      }`}
                      onClick={() => abrirConversa(nome)}
                    >
                      <span className="chat-avatar">
                        {nome.charAt(0).toUpperCase()}
                      </span>

                      <span className="chat-person-info">
                        <strong>{nome}</strong>
                        <small>{ultima}</small>
                      </span>
                    </button>
                  )
                })
              )}
            </div>
          </aside>

          <section
            className={`chat-panel ${mostrarLista ? 'hide' : ''}`}
          >
            {!active ? (
              <div className="chat-empty">
                <i className="ph ph-chats"></i>
                <h2>Suas conversas</h2>
                <p>
                  Entre no mural da comunidade e toque em
                  “Conversar” em uma publicação para iniciar
                  uma conversa privada.
                </p>
              </div>
            ) : (
              <>
                <header className="chat-head">
                  <button
                    type="button"
                    className="chat-mobile-back"
                    onClick={() => setMostrarLista(true)}
                    aria-label="Voltar para a lista de conversas"
                  >
                    ←
                  </button>

                  <span className="chat-avatar">
                    {active.charAt(0).toUpperCase()}
                  </span>

                  <div>
                    <strong>{active}</strong>
                    <small>
                      Conversa privada • telefone protegido
                    </small>
                  </div>
                </header>

                <div className="chat-messages" ref={mensagensRef}>
                  {mensagens.map((mensagem, i) => (
                    <div
                      key={i}
                      className={`chat-bubble ${
                        mensagem.from === 'me' ? 'mine' : ''
                      }`}
                    >
                      {mensagem.text}
                      <span className="chat-time">
                        {mensagem.time || ''}
                      </span>
                    </div>
                  ))}

                  {mensagens.length === 0 && (
                    <div className="chat-empty">
                      Conversa iniciada. Envie a primeira mensagem.
                    </div>
                  )}
                </div>

                <div className="chat-privacy">
                  Suas mensagens ficam salvas somente neste navegador
                  neste protótipo.
                </div>

                <form className="chat-composer" onSubmit={enviar}>
                  <input
                    type="text"
                    placeholder="Digite sua mensagem..."
                    maxLength={1000}
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                  />

                  <button type="submit" className="chat-send">
                    Enviar
                  </button>
                </form>
              </>
            )}
          </section>

        </div>
      </main>

      <Rodape />
    </>
  )
}

export default Chat
