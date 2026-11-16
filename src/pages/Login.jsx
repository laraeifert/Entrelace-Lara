import { useNavigate } from 'react-router-dom'
import usePage from '../hooks/usePage.js'
import css from '../styles/login.css?inline'

export default function Login() {
  usePage({ css, title: 'Entrelace - Entrar' })
  const navigate = useNavigate()

  const entrar = (e) => {
    e.preventDefault()
    navigate('/mural')
  }

  return (
    <>
      <nav className="navbar">
        <div className="nav-left">
          <div
            className="logo-container"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            <div className="logo-icon"><i className="ph-fill ph-circles-three-plus"></i></div>
            <span className="logo-text">Entrelace</span>
          </div>
          <span className="badge-wireframe">Wireframe MVP</span>
        </div>
      </nav>

      {/* Conteúdo Principal - Layout em duas colunas */}
      <main className="login-split-container">

        {/* Coluna Esquerda: Espaço vazio conforme protótipo */}
        <section className="login-left">
          {/* Espaço reservado */}
        </section>

        {/* Coluna Direita: Formulário de Login */}
        <section className="login-right">
          <div className="login-form-wrapper">
            <h1 className="login-title">Bem-vindo!</h1>

            <form className="login-form" onSubmit={entrar}>

              <div className="form-group">
                <label htmlFor="email">Endereço de e-mail:</label>
                <input type="email" id="email" placeholder="Adicione seu e-mail" required />
              </div>

              <div className="form-group">
                <label htmlFor="password">Senha</label>
                <input type="password" id="password" placeholder="Adicione sua senha" required />
              </div>

              <div className="form-options">
                <label className="custom-checkbox">
                  <input type="checkbox" id="remember" />
                  <span className="checkmark"></span>
                  Lembrar de mim
                </label>
              </div>

              <button type="submit" className="btn-primary btn-block">
                entrar <i className="ph ph-arrow-right"></i>
              </button>

            </form>

            <div className="social-login-section">
              <p>Continuar com:</p>
              <div className="social-buttons">
                <button type="button" className="btn-social" onClick={() => navigate('/mural')}>Google</button>
                <button type="button" className="btn-social" onClick={() => navigate('/mural')}>Facebook</button>
                <button type="button" className="btn-social" onClick={() => navigate('/mural')}>Icloud</button>
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer className="site-footer">
        <p>Entrelace - Protótipo Acadêmico de Front-End (Sem Back-end)</p>
      </footer>
    </>
  )
}
