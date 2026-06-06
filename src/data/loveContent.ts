export type TimelineItem = {
  dateLabel: string;
  title: string;
  description: string;
};

export type PlaylistItem = {
  title: string;
  artist?: string;
  note: string;
  url?: string;
};

export type ReasonItem = {
  id: string;
  text: string;
};

export const loveProfile = {
  forName: "Marcela",
  fromName: "Gustavo",
  headline: "Você é meu lugar favorito.",
  subheadline: "Vem cá: eu escondi amor (e umas bobeirinhas fofas) em cada clique.",
};

export const loveLetter = [
  "Eu não sei se existe uma forma perfeita de dizer tudo o que você desperta em mim — então eu construí uma.",
  "Esse site é uma tentativa honesta de transformar carinho em pixels, e saudade em brilho.",
  "Obrigado por ser abrigo, por rir das minhas besteiras, por me lembrar que a vida pode ser leve mesmo quando o dia pesa.",
  "Se um dia você esquecer o tamanho do meu amor, volta aqui. Eu deixei ele espalhado em cada detalhe (sim, até nos coraçõezinhos).",
];

export const timeline: TimelineItem[] = [
  {
    dateLabel: "18 de fevereiro",
    title: "O dia que eu te conheci",
    description: "O mundo seguiu normal, mas eu não. Alguma coisa em mim já sabia: aqui começa uma história.",
  },
  {
    dateLabel: "8 de março • 2:03",
    title: "A gente se entregou",
    description: "O tipo de momento que muda tudo. Eu senti: é você, e é de verdade.",
  },
  {
    dateLabel: "7 de abril • 22:42",
    title: "O pedido",
    description: "Eu pedi você em namoro. E foi o meu “sim” favorito, mesmo antes de ouvir a resposta.",
  },
  {
    dateLabel: "Hoje",
    title: "Eu escolho você (de novo)",
    description: "Na rotina e na aventura. No silêncio e na música. No agora e no depois.",
  },
];

export const playlist: PlaylistItem[] = [
  {
    title: "Chuva de Arroz",
    artist: "Luan Santana",
    note: "A música que eu dediquei pra você uma vez, tocando no violão. Você chorou… e eu juro que ali virou uma chave: eu senti que você queria ficar comigo pra sempre.",
  },
  {
    title: "Caso Indefinido",
    artist: "Cristiano Araújo",
    note: "A gente escutava quando ainda não era namoro. E eu fazia questão de mostrar que a única que eu queria era você me querendo de volta — e que, se você quisesse, a gente casava ou namorava, ficava ou enrolava… mas era nós.",
  },
  {
    title: "MC Lençol e DJ Travesseiro",
    artist: "Luan Santana",
    note: "A nossa música de aquietar. A gente vive escutando porque ela fala de largar a vida de festa e escolher uma vida calma e feliz entre nós dois.",
  },
];

export const reasons: ReasonItem[] = [
  { id: "r1", text: "porque você tem um jeito de tornar tudo mais bonito" },
  { id: "r2", text: "porque eu me sinto em paz quando estou perto" },
  { id: "r3", text: "porque você me inspira a ser melhor sem me cobrar ser perfeita" },
  { id: "r4", text: "porque sua risada melhora qualquer lugar" },
  { id: "r5", text: "porque você é coragem e carinho ao mesmo tempo" },
  { id: "r6", text: "porque eu amo o nosso 'nós'" },
];

export const promise = {
  title: "Uma promessa pequena, mas séria",
  text: "Eu prometo cuidar de você em detalhes: ouvir com atenção, celebrar suas vitórias, e estar presente de verdade.",
  seal: "Assinado com amor",
};

export const surprise = {
  title: "Uma surpresa pra você",
  lines: [
    "Eu escolho te amar",
    "todo dia",
    "todo momento",
    "em toda situação",
    "e cada dia que passa",
    "estou certo que é a melhor decisão da minha vida",
  ],
  ctaOpen: "Abrir surpresa",
  ctaClose: "Guardar no coração",
};
