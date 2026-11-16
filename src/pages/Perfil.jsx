
import Rodape from '../components/Rodape'
import '../styles/perfil.css'

const FOTO_PERFIL =
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces'

function Perfil({ usuario, bairro }) {
  return (
    <>
      <main className="perfil">
        <section className="perfil-card">
          <div className="perfil-capa"></div>

          <div className="perfil-conteudo">
            <img
              className="perfil-foto"
              src={FOTO_PERFIL}
              alt={`Foto de ${usuario}`}
            />

            <div className="perfil-espaco-foto"></div>

            <div className="perfil-identificacao">
              <h1>{usuario}</h1>
              <span className="perfil-validado">
                Morador validado
              </span>
            </div>

            <p className="perfil-localizacao">
              ⌖ Residente em {bairro}
            </p>

            <div className="perfil-privacidade">
              <span>⛨ Contato protegido via Entrelace</span>
              <span>Telefone oculto</span>
            </div>
          </div>
        </section>

        <section className="perfil-publicacoes">
          <h2>Publicações deste morador</h2>

          <div className="grade">
            <article className="post cat-ajuda">
              <div className="post-capa">
                <span className="post-selo">há 3 dias</span>
                <span className="post-categoria">Ajuda</span>
                <i className="ph-fill ph-wrench"></i>
              </div>

              <div className="post-corpo">
                <div className="post-autor">
                  <span className="avatar avatar-pequeno">M</span>
                  <strong>{usuario}</strong>
                </div>

                <p>
                  Alguém tem indicação de eletricista no bairro?
                </p>
              </div>

              <footer className="post-rodape">
                <span className="acao">
                  <i className="ph-bold ph-thumbs-up"></i>
                  5
                </span>

                <span className="acao">
                  <i className="ph-bold ph-chat-circle"></i>
                  2
                </span>
              </footer>
            </article>
          </div>
        </section>
      </main>

      <Rodape />
    </>
  )
}

export default Perfil
