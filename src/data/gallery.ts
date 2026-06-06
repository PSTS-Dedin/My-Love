export type GalleryItem = {
  id: string;
  title: string;
  caption: string;
  src: string;
};

const img = (prompt: string, size: "portrait_16_9" | "landscape_16_9" | "square_hd") =>
  `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent(prompt)}&image_size=${size}`;

const userPhotos: GalleryItem[] = [
  {
    id: "u1",
    title: "Aquele abraço",
    caption: "Onde eu gosto de morar.",
    src: "/u1.jpg.jpeg",
  },
  {
    id: "u2",
    title: "Nosso espelho",
    caption: "Dois corações na mesma foto.",
    src: "/u2.jpg.jpeg",
  },
  {
    id: "u3",
    title: "Beijo roubado",
    caption: "Um clichê perfeito.",
    src: "/u3.jpg.jpeg",
  },
  {
    id: "u4",
    title: "A gente de novo",
    caption: "Porque eu nunca enjoaria.",
    src: "/u4.jpg.jpeg",
  },
  {
    id: "u5",
    title: "Só nós",
    caption: "Do jeitinho que eu gosto.",
    src: "/u5.jpg.jpeg",
  },
  {
    id: "u6",
    title: "Final feliz (por enquanto)",
    caption: "E eu quero muitos capítulos.",
    src: "/u6.jpg.jpeg",
  },
];

export const gallery: GalleryItem[] = [
  ...userPhotos.filter((p) => p.src.trim().length > 0),
  {
    id: "g1",
    title: "Noite de luzes",
    caption: "Quando o mundo apaga, a gente acende um ao outro.",
    src: img(
      "cinematic realistic photo, couple holding hands walking under streetlights at night, warm blush and soft gold highlights, city bokeh, subtle film grain, shallow depth of field, editorial romance",
      "landscape_16_9",
    ),
  },
  {
    id: "g2",
    title: "Café e conversa",
    caption: "O tipo de dia que vira casa.",
    src: img(
      "realistic photo, two cups of coffee on a wooden table by a rainy window, soft reflections, cozy mood, warm amber light, subtle grain, romantic editorial still life",
      "landscape_16_9",
    ),
  },
  {
    id: "g3",
    title: "Cartas que não enviei",
    caption: "Eu escrevo amor até quando fico em silêncio.",
    src: img(
      "realistic photo, handwritten love letter on cream paper with fountain pen, wax seal, soft candlelight, dark plum background, gentle highlights, editorial photography, subtle grain",
      "landscape_16_9",
    ),
  },
  {
    id: "g4",
    title: "Dança na sala",
    caption: "A vida fica melhor quando vira música.",
    src: img(
      "realistic photo, couple dancing at home in dim warm light, silhouettes with soft rim light, dreamy atmosphere, romantic editorial, film grain, shallow depth of field",
      "portrait_16_9",
    ),
  },
  {
    id: "g5",
    title: "Detalhes",
    caption: "O amor mora no pequeno.",
    src: img(
      "macro realistic photo, intertwined fingers with delicate ring, soft warm light, dark plum background, creamy bokeh, editorial romance, subtle grain",
      "square_hd",
    ),
  },
  {
    id: "g6",
    title: "Promessa",
    caption: "Eu fico. Eu cuido. Eu escolho.",
    src: img(
      "realistic photo, small golden wax seal on a letter with a heart stamp, warm candlelight, dark romantic background, editorial still life, subtle film grain",
      "square_hd",
    ),
  },
];
