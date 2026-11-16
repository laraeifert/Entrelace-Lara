import { Link, useNavigate } from 'react-router-dom'
import usePage from '../hooks/usePage.js'
import css from '../styles/home.css?inline'

export default function Home() {
  usePage({ css, title: 'Entrelace - Conecte-se com o seu bairro' })
  const navigate = useNavigate()

  return (
    <>
      {/* Barra de Navegação Superior */}
      <nav className="navbar">
        <div className="nav-left">
          <div className="logo-container">
            <div className="logo-icon"><i className="ph-fill ph-circles-three-plus"></i></div>
            <span className="logo-text">Entrelace</span>
          </div>
          <span className="badge-wireframe">Wireframe MVP</span>
        </div>

        <div className="nav-right">
          <Link to="/login" className="nav-link">Entrar</Link>
          <button className="btn-primary" onClick={() => navigate('/validacao')}>Criar Conta</button>
        </div>
      </nav>

      {/* Conteúdo Principal - Layout em duas colunas */}
      <main className="hero-split-container">

        {/* Coluna Esquerda: Cartões em cascata */}
        <section className="hero-visual">
          <article className="feature-card card-1">
            <div className="feature-icon">
              <i className="ph ph-house"></i>
            </div>
            <h3>Sua comunidade real</h3>
            <p>Conteúdos e murais estritamente exclusivos para moradores que comprovam residência no território por CEP.</p>
          </article>

          <article className="feature-card card-2">
            <div className="feature-icon">
              <i className="ph ph-shield-check"></i>
            </div>
            <h3>Telefone 100% privado</h3>
            <p>Converse com vizinhos diretamente pela plataforma sem expor seu número de celular ou dados sensíveis.</p>
          </article>

          <article className="feature-card card-3">
            <div className="feature-icon">
              <i className="ph ph-chat-circle"></i>
            </div>
            <h3>Soluções no bairro</h3>
            <p>Discuta segurança, peça ajuda mútua, organize eventos locais e encontre soluções colaborativas com a vizinhança.</p>
          </article>
        </section>

        {/* Coluna Direita: Textos e CTA */}
        <section className="hero-content">
          <div className="hero-badge">
            <i className="ph ph-users-three"></i> Rede Privada para Moradores
          </div>

          <h1 className="hero-title">Conecte-se com o seu bairro de verdade</h1>

          <p className="hero-subtitle">
            Um espaço seguro e exclusivo para compartilhar avisos, resolver problemas locais e conversar com seus vizinhos mantendo sua privacidade.
          </p>
          <Link to="/validacao" className="btn-primary btn-large">
            <button className="btn-primary btn-large">
              Começar Agora <i className="ph ph-arrow-right"></i>
            </button>
          </Link>
        </section>

      </main>

      <footer className="site-footer">
        <p>Entrelace - Protótipo Acadêmico de Front-End (Sem Back-end)</p>
      </footer>
    </>
  )
}
