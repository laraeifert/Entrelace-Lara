
import { useState } from 'react'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Validacao from './pages/Validacao'
import Mural from './pages/Mural'
import Perfil from './pages/Perfil'
import Chat from './pages/Chat'
import { POSTS_INICIAIS } from './data/dados'

const TELAS_LOGADAS = ['mural', 'perfil', 'mensagens']

function App() {
  const [tela, setTela] = useState('landing')
  const [usuario, setUsuario] = useState('')
  const [contatoChat, setContatoChat] = useState('')
  const [bairro, setBairro] = useState('centro')
  const [posts, setPosts] = useState(POSTS_INICIAIS)

  function abrirChat(nome) {
    setContatoChat(nome)
    setTela('mensagens')
  }

  function entrar(nome) {
    setUsuario('Mariana Silva')
    setTela('validacao')
  }

  function sair() {
    setUsuario('')
    setTela('landing')
  }

  return (
    <>
      {TELAS_LOGADAS.includes(tela) && (
        <Navbar
          tela={tela}
          irPara={setTela}
          bairro={bairro}
          setBairro={setBairro}
          usuario={usuario}
          onSair={sair}
        />
      )}

      {tela === 'landing' && <Landing aoEntrar={entrar} />}

      {tela === 'validacao' && <Validacao irPara={setTela} />}

      {tela === 'mural' && (
        <Mural
          usuario={usuario}
          bairro={bairro}
          posts={posts}
          setPosts={setPosts}
          irPara={setTela}
          onConversar={abrirChat}
        />
      )}

      {tela === 'perfil' && (
        <Perfil usuario={usuario} bairro={bairro} />
      )}

      {tela === 'mensagens' && (
        <Chat contatoInicial={contatoChat} />
      )}
    </>
  )
}

export default App
