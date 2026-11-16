import Logo from './Logo'
import { BAIRROS } from '../data/dados'

// Barra de cima das telas de morador (mural, perfil e mensagens).
// Tudo que ela precisa chega pelas props, vindo do App.
function Navbar({ tela, irPara, bairro, setBairro, usuario, onSair }) {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Logo />

        <label className="seletor-bairro">
          <i className="ph-bold ph-map-pin"></i>
          <span>Bairro:</span>
          <select value={bairro} onChange={(e) => setBairro(e.target.value)}>
            {BAIRROS.map((b) => (
              <option key={b.id} value={b.id}>
                {b.nome}
              </option>
            ))}
          </select>
        </label>

        <nav className="menu">
          <button
            className={`menu-link ${tela === 'mural' ? 'ativo' : ''}`}
            onClick={() => irPara('mural')}
          >
            Mural
          </button>
          <button
            className={`menu-link ${tela === 'mensagens' ? 'ativo' : ''}`}
            onClick={() => irPara('mensagens')}
          >
            Mensagens <span className="contador-menu">2</span>
          </button>
          <button
            className={`menu-link ${tela === 'perfil' ? 'ativo' : ''}`}
            onClick={() => irPara('perfil')}
          >
            Meu Perfil
          </button>
        </nav>

        <div className="usuario">
          <span className="avatar avatar-pequeno">{usuario.charAt(0).toUpperCase()}</span>
          <button className="sair" onClick={onSair}>
            Sair
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
