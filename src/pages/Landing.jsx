import { useState } from 'react'
import Logo from '../components/Logo'
import Rodape from '../components/Rodape'
import '../styles/landing.css'

// Lista fixa: o .map() abaixo transforma cada item em um <li>
const BENEFICIOS = [
  {
    icone: 'ph-house-line',
    titulo: 'Sua comunidade real',
    texto: 'Mural exclusivo para quem comprova residência no bairro por CEP.',
  },
  {
    icone: 'ph-shield-check',
    titulo: 'Telefone 100% privado',
    texto: 'Converse com vizinhos sem expor seu número de celular.',
  },
  {
    icone: 'ph-chats-circle',
    titulo: 'Soluções no bairro',
    texto: 'Segurança, ajuda mútua e eventos locais em um só lugar.',
  },
]

// "aoEntrar" é uma função que vem do App. Chamamos ela quando o formulário é enviado.
function Landing({ aoEntrar }) {
  const [modo, setModo] = useState('cadastro') // 'cadastro' ou 'login'
  const [nome, setNome] = useState('')
  const emLogin = modo === 'login'

  function enviarCadastro(e) {
    e.preventDefault() // impede a página de recarregar
    aoEntrar(nome)
  }

  function enviarLogin(e) {
    e.preventDefault()
    aoEntrar('')
  }

  return (
    <div className="landing">
      <header className="topbar topbar--clara">
        <div className="topbar-inner">
          <Logo />
        </div>
      </header>

      <main className="landing-centro">
        {/* A classe "modo-login" faz o painel azul deslizar para o outro lado */}
        <div className={`auth-card ${emLogin ? 'modo-login' : ''}`}>
          <aside className="auth-painel">
            <span className="painel-selo">
              <i className="ph-bold ph-users-three"></i> Rede privada para moradores
            </span>
            <h2>{emLogin ? 'Novo por aqui?' : 'Conecte-se com o seu bairro de verdade'}</h2>
            <p>
              {emLogin
                ? 'Crie sua conta e valide sua residência por CEP para entrar no mural.'
                : 'Um espaço seguro e exclusivo para falar com seus vizinhos, mantendo sua privacidade.'}
            </p>

            <ul className="painel-lista">
              {BENEFICIOS.map((item) => (
                <li key={item.titulo}>
                  <i className={`ph-bold ${item.icone}`}></i>
                  <span>
                    <strong>{item.titulo}</strong>
                    {item.texto}
                  </span>
                </li>
              ))}
            </ul>

            <button
              className="btn btn-fantasma"
              type="button"
              onClick={() => setModo(emLogin ? 'cadastro' : 'login')}
            >
              {emLogin ? 'Criar conta' : 'Já tenho conta'}
            </button>
          </aside>

          {/* Só um formulário existe por vez: depende do estado "modo" */}
          {!emLogin ? (
            <form className="auth-form form-cadastro" onSubmit={enviarCadastro}>
              <h1>Criar conta</h1>
              <div className="sociais">
                <button className="social-btn" type="button" aria-label="Google">
                  <i className="ph-bold ph-google-logo"></i>
                </button>
                <button className="social-btn" type="button" aria-label="Facebook">
                  <i className="ph-bold ph-facebook-logo"></i>
                </button>
                <button className="social-btn" type="button" aria-label="Apple">
                  <i className="ph-bold ph-apple-logo"></i>
                </button>
              </div>
              <p className="auth-ou">ou use seu e-mail para se cadastrar</p>

              <label className="campo">
                <i className="ph ph-user"></i>
                <input
                  type="text"
                  placeholder="Seu nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </label>
              <label className="campo">
                <i className="ph ph-envelope-simple"></i>
                <input type="email" placeholder="Seu e-mail" required />
              </label>
              <label className="campo">
                <i className="ph ph-lock-simple"></i>
                <input type="password" placeholder="Crie uma senha" minLength={6} required />
              </label>

              <button className="btn btn-primary btn-block btn-lg" type="submit">
                Criar conta <i className="ph-bold ph-arrow-right"></i>
              </button>
            </form>
          ) : (
            <form className="auth-form form-login" onSubmit={enviarLogin}>
              <h1>Entrar</h1>
              <div className="sociais">
                <button className="social-btn" type="button" aria-label="Google">
                  <i className="ph-bold ph-google-logo"></i>
                </button>
                <button className="social-btn" type="button" aria-label="Facebook">
                  <i className="ph-bold ph-facebook-logo"></i>
                </button>
                <button className="social-btn" type="button" aria-label="Apple">
                  <i className="ph-bold ph-apple-logo"></i>
                </button>
              </div>
              <p className="auth-ou">ou entre com seu e-mail</p>

              <label className="campo">
                <i className="ph ph-envelope-simple"></i>
                <input type="email" placeholder="Seu e-mail" required />
              </label>
              <label className="campo">
                <i className="ph ph-lock-simple"></i>
                <input type="password" placeholder="Sua senha" required />
              </label>
              <label className="lembrar">
                <input type="checkbox" /> Lembrar de mim
              </label>

              <button className="btn btn-primary btn-block btn-lg" type="submit">
                Entrar <i className="ph-bold ph-arrow-right"></i>
              </button>
            </form>
          )}
        </div>
      </main>

      <Rodape />
    </div>
  )
}

export default Landing
