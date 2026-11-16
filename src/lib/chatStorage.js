// Mesmas chaves usadas pelo chat.html original.
const CHATS_KEY = 'entrelaceChats'
const ACTIVE_KEY = 'entrelaceActiveContact'

export const horaAtual = () =>
  new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })

export function loadChats() {
  try {
    const dados = JSON.parse(localStorage.getItem(CHATS_KEY) || '{}')
    return dados && typeof dados === 'object' ? dados : {}
  } catch {
    return {}
  }
}

export function loadActive() {
  try {
    return localStorage.getItem(ACTIVE_KEY) || ''
  } catch {
    return ''
  }
}

export function saveChats(chats) {
  try {
    localStorage.setItem(CHATS_KEY, JSON.stringify(chats))
  } catch {
    /* armazenamento indisponível: ignora */
  }
}

export function saveActive(nome) {
  try {
    localStorage.setItem(ACTIVE_KEY, nome)
  } catch {
    /* armazenamento indisponível: ignora */
  }
}

// Usada pelo Perfil: cria/abre a conversa com o morador e envia a 1ª mensagem.
export function iniciarConversa(nome, texto) {
  const chats = loadChats()
  chats[nome] = [...(chats[nome] || []), { from: 'me', text: texto, time: horaAtual() }]
  saveChats(chats)
  saveActive(nome)
}
