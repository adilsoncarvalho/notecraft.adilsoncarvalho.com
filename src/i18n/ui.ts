import { defaultLang, type Lang } from './config';

/**
 * UI strings, keyed by locale. Every locale must define every key: the
 * `satisfies` clause below turns a missing or misspelled key into a build-time
 * type error rather than a blank spot on the rendered page.
 *
 * Page prose lives in the pages themselves. This file is for chrome — nav,
 * buttons, footer, and metadata.
 */
export const ui = {
  en: {
    'site.title': 'Notecraft',
    'site.tagline': 'A note-taking method for paper and pixels',
    'site.description':
      'A practical system for taking notes by hand and keeping them useful once they are digital — refined over years of notebooks, pens, and apps.',

    'nav.home': 'Home',
    'nav.method': 'The method',
    'nav.skipToContent': 'Skip to content',

    'lang.switcher.label': 'Language',

    'home.hero.eyebrow': 'Notes that survive',
    'home.hero.heading': 'Write it down once. Find it forever.',
    'home.hero.body':
      'Most note systems fail at the same two points: capture is slower than thinking, and nothing is ever read again. Notecraft is the method I built to close both gaps — one that works the same in a paper notebook and in a text file.',
    'home.hero.cta': 'Read the method',

    'home.principles.heading': 'Three principles',
    'home.principles.capture.title': 'Capture without friction',
    'home.principles.capture.body':
      'The best tool is whichever one is already open. A method that demands the right app at the right moment is a method you will abandon by Thursday.',
    'home.principles.structure.title': 'Structure after the fact',
    'home.principles.structure.body':
      'Sorting while writing splits your attention and costs you the thought. Write first, then impose order in a pass of its own.',
    'home.principles.review.title': 'Build for the reread',
    'home.principles.review.body':
      'A note is only worth the minute it took if a later you can find it and act on it. Every convention here earns its place at reread time.',

    'method.heading': 'The method',
    'method.intro':
      'Four stages, in the order you actually perform them. Each one works on paper and on a screen, and neither medium is treated as second-class.',
    'method.stage': 'Stage',
    'method.capture.title': 'Capture',
    'method.capture.body':
      'One inbox per medium and no more: a single notebook in your bag, a single note file on your machine. Date every entry. Never break the flow of a thought to decide where it belongs.',
    'method.mark.title': 'Mark',
    'method.mark.body':
      'A small, fixed set of margin symbols carries the metadata: an action, an open question, a decision, something to look up. Fixed is what matters — a symbol you have to think about is a symbol you will stop using.',
    'method.distil.title': 'Distil',
    'method.distil.body':
      'Once a week, reread the inbox and pull out only what still matters. Most of it will not. What survives gets rewritten in your own words, which is where the actual understanding happens.',
    'method.file.title': 'File',
    'method.file.body':
      'Distilled notes go somewhere durable and searchable, titled as the claim they make rather than the topic they cover. A title you would recognise in a search result is worth more than a perfect folder tree.',

    'footer.builtWith': 'Built with Astro',
    'footer.sourceCode': 'Source on GitHub',
    'footer.rights': 'All rights reserved.',

    'notFound.heading': 'Page not found',
    'notFound.body': 'That page does not exist — it may have been moved or renamed.',
    'notFound.cta': 'Back to the home page',
  },

  'pt-br': {
    'site.title': 'Notecraft',
    'site.tagline': 'Um método de anotações para o papel e para a tela',
    'site.description':
      'Um sistema prático para tomar notas à mão e mantê-las úteis depois de digitalizadas — lapidado ao longo de anos de cadernos, canetas e aplicativos.',

    'nav.home': 'Início',
    'nav.method': 'O método',
    'nav.skipToContent': 'Pular para o conteúdo',

    'lang.switcher.label': 'Idioma',

    'home.hero.eyebrow': 'Notas que sobrevivem',
    'home.hero.heading': 'Escreva uma vez. Encontre para sempre.',
    'home.hero.body':
      'A maioria dos sistemas de notas falha nos mesmos dois pontos: registrar é mais lento do que pensar, e nada é lido de novo. O Notecraft é o método que criei para fechar as duas lacunas — e que funciona igual no caderno de papel e num arquivo de texto.',
    'home.hero.cta': 'Ler o método',

    'home.principles.heading': 'Três princípios',
    'home.principles.capture.title': 'Registrar sem atrito',
    'home.principles.capture.body':
      'A melhor ferramenta é a que já está aberta. Um método que exige o aplicativo certo no momento certo é um método que você abandona na quinta-feira.',
    'home.principles.structure.title': 'Organizar depois',
    'home.principles.structure.body':
      'Classificar enquanto escreve divide sua atenção e custa o pensamento. Escreva primeiro; imponha ordem em uma passagem separada.',
    'home.principles.review.title': 'Escrever para a releitura',
    'home.principles.review.body':
      'Uma nota só vale o minuto que custou se o seu eu futuro conseguir encontrá-la e agir. Toda convenção aqui se justifica na hora da releitura.',

    'method.heading': 'O método',
    'method.intro':
      'Quatro etapas, na ordem em que você de fato as executa. Cada uma funciona no papel e na tela, e nenhum dos dois meios é tratado como secundário.',
    'method.stage': 'Etapa',
    'method.capture.title': 'Registrar',
    'method.capture.body':
      'Uma caixa de entrada por meio, e só: um caderno na mochila, um arquivo de notas no computador. Date toda entrada. Nunca interrompa o fluxo de uma ideia para decidir onde ela se encaixa.',
    'method.mark.title': 'Marcar',
    'method.mark.body':
      'Um conjunto pequeno e fixo de símbolos de margem carrega os metadados: uma ação, uma pergunta em aberto, uma decisão, algo a pesquisar. O que importa é ser fixo — um símbolo que exige reflexão é um símbolo que você deixa de usar.',
    'method.distil.title': 'Destilar',
    'method.distil.body':
      'Uma vez por semana, releia a caixa de entrada e extraia só o que ainda importa. A maior parte não importará. O que sobrevive é reescrito com suas próprias palavras — é aí que a compreensão realmente acontece.',
    'method.file.title': 'Arquivar',
    'method.file.body':
      'As notas destiladas vão para um lugar durável e pesquisável, com títulos que expressam a afirmação que fazem, não o assunto que cobrem. Um título que você reconheceria num resultado de busca vale mais que uma árvore de pastas perfeita.',

    'footer.builtWith': 'Feito com Astro',
    'footer.sourceCode': 'Código no GitHub',
    'footer.rights': 'Todos os direitos reservados.',

    'notFound.heading': 'Página não encontrada',
    'notFound.body': 'Essa página não existe — ela pode ter sido movida ou renomeada.',
    'notFound.cta': 'Voltar para a página inicial',
  },
} as const satisfies Record<Lang, Record<string, string>>;

export type UIKey = keyof (typeof ui)[typeof defaultLang];

/**
 * Returns a lookup function bound to `lang`, falling back to the default
 * locale for any key a translation has not yet filled in.
 */
export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}
