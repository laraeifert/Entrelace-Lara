import { useState } from 'react'
import Logo from '../components/Logo'
import Rodape from '../components/Rodape'
import '../styles/validacao.css'

const LIMITE_MB = 5

function Validacao({ irPara }) {
  const [cep, setCep] = useState('')
  const [arquivo, setArquivo] = useState(null)
  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [aprovado, setAprovado] = useState(false)

  // Deixa o CEP no formato 90000-000 enquanto a pessoa digita
  function mudarCep(e) {
    const numeros = e.target.value.replace(/\D/g, '').slice(0, 8)
    setCep(numeros.length > 5 ? `${numeros.slice(0, 5)}-${numeros.slice(5)}` : numeros)
  }

  function escolherArquivo(e) {
    const escolhido = e.target.files[0]
    if (escolhido && escolhido.size > LIMITE_MB * 1024 * 1024) {
      setErro(`O arquivo passa de ${LIMITE_MB}MB. Escolha um menor.`)
      setArquivo(null)
      return
    }
    setErro('')
    setArquivo(escolhido || null)
  }

  function enviar(e) {
    e.preventDefault()
    if (!arquivo) {
      setErro('Selecione o comprovante de residência.')
      return
    }
    setEnviando(true)
    // Simula a análise: espera 1,2 segundo e aprova
    setTimeout(() => {
      setEnviando(false)
      setAprovado(true)
    }, 1200)
  }

  return (
    <>
      <header className="topbar">
        <div className="topbar-inner">
          <Logo />
          <button className="btn btn-link" onClick={() => irPara('landing')}>
            ← Voltar
          </button>
        </div>
      </header>

      <main className="validacao">
        <section className="validacao-card">
          <header className="validacao-topo">
            <div className="validacao-icone">
              <i className="ph-bold ph-identification-card"></i>
            </div>
            <h1>Validação de Residência</h1>
            <p>
              Informe seu CEP e envie um comprovante para liberar o acesso ao mural da sua
              região.
            </p>
          </header>

          {aprovado ? (
            <div className="aprovado">
              <div className="aprovado-icone">
                <i className="ph-bold ph-check"></i>
              </div>
              <h2>Residência Aprovada!</h2>
              <p>
                Seu endereço foi verificado para o <strong>Centro Histórico</strong>.
              </p>
              <button className="btn btn-sucesso btn-block btn-lg" onClick={() => irPara('mural')}>
                Entrar na Comunidade
              </button>
            </div>
          ) : (
            <form className="validacao-form" onSubmit={enviar}>
              <label className="grupo">
                <span>CEP de residência</span>
                <input
                  type="text"
                  placeholder="90000-000"
                  value={cep}
                  onChange={mudarCep}
                  pattern="\d{5}-\d{3}"
                  title="Use o formato 90000-000"
                  required
                />
              </label>

              <div className="grupo">
                <span>Comprovante de residência (conta de luz/água)</span>
                <label className={`upload ${arquivo ? 'com-arquivo' : ''}`}>
                  <i className={`ph-bold ${arquivo ? 'ph-file-check' : 'ph-upload-simple'}`}></i>
                  <strong>{arquivo ? arquivo.name : 'Clique para selecionar o arquivo'}</strong>
                  <small>PDF, PNG ou JPG até {LIMITE_MB}MB</small>
                  <input type="file" accept=".pdf,.png,.jpg,.jpeg" onChange={escolherArquivo} />
                </label>
              </div>

              <div className="aviso-seguro">
                <i className="ph-bold ph-lock"></i>
                <p>
                  <strong>Documento Seguro:</strong> Seu comprovante é 100% privado e visualizado
                  apenas pela moderação para confirmação do CEP.
                </p>
              </div>

              {erro && <p className="erro-form">{erro}</p>}

              <button className="btn btn-primary btn-block btn-lg" type="submit" disabled={enviando}>
                {enviando ? 'Verificando CEP...' : 'Enviar para Análise'}
                {!enviando && <i className="ph-bold ph-check-circle"></i>}
              </button>
            </form>
          )}
        </section>
      </main>

      <Rodape />
    </>
  )
}

export default Validacao
