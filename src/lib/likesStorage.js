// Ids das publicações que o usuário já curtiu (limite de 1 curtida por publicação).
const LIKES_KEY = 'entrelaceLikes'

export function loadLikes() {
  try {
    const dados = JSON.parse(localStorage.getItem(LIKES_KEY) || '[]')
    return Array.isArray(dados) ? dados : []
  } catch {
    return []
  }
}

export function saveLikes(ids) {
  try {
    localStorage.setItem(LIKES_KEY, JSON.stringify(ids))
  } catch {
    /* armazenamento indisponível: ignora */
  }
}
