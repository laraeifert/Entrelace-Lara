import { useLayoutEffect } from 'react'

/**
 * Cada página do site original tinha seu próprio CSS (com :root, body, .navbar,
 * .btn-primary... diferentes entre si). Para manter o design 100% idêntico,
 * o CSS original da página é injetado ao entrar na rota e removido ao sair,
 * evitando conflitos entre as páginas. Também define o <title> da aba.
 */
export default function usePage({ css, title }) {
  useLayoutEffect(() => {
    const style = document.createElement('style')
    style.textContent = css
    document.head.appendChild(style)
    document.title = title
    return () => style.remove()
  }, [css, title])
}
