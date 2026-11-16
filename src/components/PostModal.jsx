import { useState } from 'react'
import { CATEGORIAS_POST } from '../data/dados'

// Procura telefone (ex.: 51 99999-9999) ou e-mail dentro do texto
const TEM_DADO_PESSOAL = /(\(?\d{2}\)?\s?)?\d{4,5}[-\s]?\d{4}|\S+@\S+\.\S+/

function PostModal({ onFechar, onPublicar }) {
  const [texto, setTexto] = useState('')
  const [categoria, setCategoria] = useState('Geral')
  const [analisando, setAnalisando] = useState(false)
  const [erro, setErro] = useState('')

  function enviar(e) {
    e.preventDefault()
    setErro('')
    setAnalisando(true)

    // Simula a triagem por IA (LGPD): espera 2 segundos e decide
    setTimeout(() => {
      if (TEM_DADO_PESSOAL.test(texto)) {
        setAnalisando(false)
        setErro(
          'Detectamos um telefone ou e-mail no texto. Remova para proteger a privacidade (LGPD).',
        )
        return
      }
      onPublicar(texto.trim(), categoria)
      onFechar()
    }, 2000)
  }

  return (
    <div
      className="modal-fundo"
      role="dialog"
      aria-modal="true"
      onClick={() => !analisando && onFechar()}
    >
      {/* stopPropagation: clicar dentro do modal não deve fechá-lo */}
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-topo">
          <h3>Nova Publicação</h3>
          <button className="modal-x" onClick={onFechar} disabled={analisando} aria-label="Fechar">
            <i className="ph-bold ph-x"></i>
          </button>
        </div>

        <form onSubmit={enviar} className="modal-form">
          <label>
            O que está acontecendo na comunidade?
            <textarea
              rows={4}
              required
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              placeholder="Compartilhe um aviso, dúvida ou necessidade com seus vizinhos..."
            />
          </label>

          <label>
            Categoria
            <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
              {CATEGORIAS_POST.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>

          {analisando && (
            <div className="ia-carregando">
              <i className="ph-bold ph-spinner"></i>
              <strong>Verificando diretrizes de privacidade (LGPD)...</strong>
              <span>Classificando categoria e validando conteúdo seguro.</span>
            </div>
          )}

          {erro && <p className="ia-erro">{erro}</p>}

          <div className="modal-acoes">
            <button type="button" className="btn btn-link" onClick={onFechar} disabled={analisando}>
              Cancelar
            </button>
            {!analisando && (
              <button type="submit" className="btn btn-primary">
                Publicar
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default PostModal
