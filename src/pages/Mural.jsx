import { useState } from 'react'
import PostModal from '../components/PostModal'
import Rodape from '../components/Rodape'
import { BAIRROS, ESTILOS, FILTROS } from '../data/dados'
import '../styles/mural.css'

function Mural({ usuario, bairro, posts, setPosts, irPara, onConversar }) {  // Estados só do mural: filtros e modal
  const [categoria, setCategoria] = useState('Todos')
  const [busca, setBusca] = useState('')
  const [ordem, setOrdem] = useState('recentes')
  const [modalAberto, setModalAberto] = useState(false)

  const nomeBairro = BAIRROS.find((b) => b.id === bairro).nome

  // Só entram os posts do bairro atual (isolamento por território)
  // que combinam com a categoria e com o texto buscado
  const visiveis = posts[bairro].filter(
    (p) =>
      (categoria === 'Todos' || p.categoria === categoria) &&
      p.texto.toLowerCase().includes(busca.toLowerCase()),
  )
  if (ordem === 'curtidas') {
    visiveis.sort((a, b) => b.curtidas - a.curtidas)
  }

  function limparFiltros() {
    setBusca('')
    setCategoria('Todos')
    setOrdem('recentes')
  }

  function publicar(texto, cat) {
    const novo = {
      id: Date.now(),
      autor: usuario,
      categoria: cat,
      tempo: 'agora mesmo',
      texto,
      curtidas: 0,
      comentarios: 0,
      curtido: false,
    }
    // Copia os posts e coloca o novo no topo, só no bairro atual
    setPosts({ ...posts, [bairro]: [novo, ...posts[bairro]] })
  }

  function curtir(id) {
    setPosts({
      ...posts,
      [bairro]: posts[bairro].map((p) =>
        p.id === id
          ? { ...p, curtido: !p.curtido, curtidas: p.curtidas + (p.curtido ? -1 : 1) }
          : p,
      ),
    })
  }

  return (
    <>
      <main className="mural">
        <header className="mural-topo">
          <div className="saudacao">
            <span className="avatar">{usuario.charAt(0).toUpperCase()}</span>
            <div>
              <span>Olá 👋</span>
              <strong>{usuario}</strong>
            </div>
          </div>
          <button className="sino" aria-label="Notificações">
            <i className="ph-bold ph-bell"></i>
            <span className="sino-ponto"></span>
          </button>
        </header>

        <div className="busca">
          <div className="busca-campo">
            <i className="ph-bold ph-magnifying-glass"></i>
            <input
              type="text"
              placeholder={`Buscar avisos em ${nomeBairro}`}
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
          <button className="busca-filtro" aria-label="Limpar filtros" onClick={limparFiltros}>
            <i className="ph-bold ph-sliders-horizontal"></i>
          </button>
        </div>

        <nav className="categorias">
          {FILTROS.map((nome) => (
            <button
              key={nome}
              className={`cat-item ${categoria === nome ? 'ativo' : ''}`}
              onClick={() => setCategoria(nome)}
            >
              <span className="cat-circulo">
                <i className={`ph-bold ${ESTILOS[nome].icone}`}></i>
              </span>
              {nome}
            </button>
          ))}
        </nav>

        <section className="banner">
          <div className="banner-texto">
            <h2>Tem um aviso para o bairro?</h2>
            <p>
              Compartilhe com os moradores validados de {nomeBairro}. Seu telefone nunca aparece.
            </p>
            <button className="btn btn-branco" onClick={() => setModalAberto(true)}>
              <i className="ph-bold ph-plus"></i> Nova publicação
            </button>
          </div>
          <div className="banner-arte" aria-hidden="true">
            <span className="arte-circulo c1"></span>
            <span className="arte-circulo c2"></span>
            <i className="ph-fill ph-megaphone"></i>
          </div>
        </section>

        <div className="lista-topo">
          <h3>
            Publicações do bairro <span className="contador">{visiveis.length}</span>
          </h3>
          <div className="alternar">
            <button
              className={ordem === 'recentes' ? 'ativo' : ''}
              onClick={() => setOrdem('recentes')}
            >
              Recentes
            </button>
            <button
              className={ordem === 'curtidas' ? 'ativo' : ''}
              onClick={() => setOrdem('curtidas')}
            >
              Mais curtidas
            </button>
          </div>
        </div>

        {visiveis.length === 0 ? (
          <div className="vazio">
            <i className="ph ph-folder-open"></i>
            <h4>Nenhuma publicação</h4>
            <p>Não há postagens com esses filtros neste bairro.</p>
          </div>
        ) : (
          <section className="grade">
            {visiveis.map((p) => {
              const estilo = ESTILOS[p.categoria]
              return (
                <article key={p.id} className={`post ${estilo.classe}`}>
                  <div className="post-capa">
                    <span className="post-selo">{p.tempo}</span>
                    <span className="post-categoria">{p.categoria}</span>
                    <i className={`ph-fill ${estilo.icone}`}></i>
                  </div>

                  <div className="post-corpo">
                    <button className="post-autor" onClick={() => irPara('perfil')}>
                      <span className="avatar avatar-pequeno">{p.autor.charAt(0)}</span>
                      <strong>{p.autor}</strong>
                    </button>
                    <p>{p.texto}</p>
                  </div>

                  <footer className="post-rodape">
                    <button className={`acao ${p.curtido ? 'curtido' : ''}`} onClick={() => curtir(p.id)}>
                      <i className={`${p.curtido ? 'ph-fill' : 'ph-bold'} ph-thumbs-up`}></i>
                      {p.curtidas}
                    </button>
                    <span className="acao">
                      <i className="ph-bold ph-chat-circle"></i>
                      {p.comentarios}
                    </span>
                    <button 
                      className="btn-conversar"
                      onClick={() => onConversar(p.autor)}
                    >
                    Conversar <i className="ph-bold ph-arrow-right"></i>
                    </button>
                  </footer>
                </article>
              )
            })}
          </section>
        )}
      </main>

      <Rodape />

      {modalAberto && (
        <PostModal onFechar={() => setModalAberto(false)} onPublicar={publicar} />
      )}
    </>
  )
}

export default Mural
