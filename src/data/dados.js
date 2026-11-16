// Dados de mentira (simulam um banco de dados). Não existe back-end no MVP.

export const BAIRROS = [
  { id: 'centro', nome: 'Centro Histórico' },
  { id: 'jardim', nome: 'Jardim das Flores' },
]

// Ícone e cor de cada categoria (a cor vem das classes do mural.css)
export const ESTILOS = {
  Todos: { icone: 'ph-squares-four', classe: '' },
  Segurança: { icone: 'ph-shield-check', classe: 'cat-seguranca' },
  'Ajuda Mútua': { icone: 'ph-handshake', classe: 'cat-ajuda' },
  Eventos: { icone: 'ph-calendar-star', classe: 'cat-eventos' },
  Geral: { icone: 'ph-megaphone', classe: 'cat-geral' },
}

export const FILTROS = ['Todos', 'Segurança', 'Ajuda Mútua', 'Eventos']
export const CATEGORIAS_POST = ['Geral', 'Segurança', 'Ajuda Mútua', 'Eventos']

// Cada bairro tem a sua própria lista: um bairro nunca vê os posts do outro.
export const POSTS_INICIAIS = {
  centro: [
    {
      id: 1,
      autor: 'Gabriel Santos',
      categoria: 'Segurança',
      tempo: 'há 15 min',
      texto: 'Atenção moradores da Rua das Flores: iluminação do poste da esquina está apagada.',
      curtidas: 4,
      comentarios: 2,
      curtido: false,
    },
    {
      id: 2,
      autor: 'Lara Oliveira',
      categoria: 'Ajuda Mútua',
      tempo: 'há 2 horas',
      texto: 'Alguém tem uma escada dobrável para emprestar nesta tarde?',
      curtidas: 2,
      comentarios: 5,
      curtido: false,
    },
  ],
  jardim: [
    {
      id: 3,
      autor: 'Pedro Henrique',
      categoria: 'Eventos',
      tempo: 'há 1 hora',
      texto: 'Feirinha de orgânicos da comunidade no domingo a partir das 9h na praça central!',
      curtidas: 12,
      comentarios: 3,
      curtido: false,
    },
  ],
}
