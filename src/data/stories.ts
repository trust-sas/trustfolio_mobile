export interface Story {
  id: string;
  title: string;
  author: string;
  school: string;
  class?: string;
  age?: number;
  content: string;
  cover: string;
  bgColor: string;
  category: string;
  reads: number;
  likes: number;
  rating: number;
  progress?: number;
}

export const stories: Story[] = [
  {
    id: "story-1",
    title: "Le Lion Courageux",
    author: "Amina K.",
    school: "École Primaire de Lagos",
    progress: 65,
    cover: "🦁",
    bgColor: "#FFD700",
    category: "Courage",
    content: `Dans la grande savane africaine, vivait un jeune lion nommé Kaya. Tout le monde pensait qu'il était brave, mais en son for intérieur, Kaya avait peur du tonnerre. Un jour, une terrible tempête s'abattit sur la plaine. Les autres animaux se cachèrent, terrifiés. Kaya comprit alors que le vrai courage, c'est d'agir malgré sa peur — et il guida sa famille vers un abri sûr, la crinière trempée mais le cœur fier.`,
    reads: 1500,
    likes: 234,
    rating: 4.8,
  },
  {
    id: "story-2",
    title: "Mon Village",
    author: "Kwame M.",
    school: "École d'Accra",
    progress: 30,
    cover: "🏘️",
    bgColor: "#00C9D7",
    category: "Culture",
    content: `Mon village s'appelle Nkosi. Le matin, les femmes pilent le mil pendant que les hommes partent aux champs. Le soir, on se retrouve autour du feu pour écouter les histoires des anciens. Grand-père dit toujours : « Un arbre seul ne fait pas une forêt. » Je comprends maintenant ce qu'il veut dire.`,
    reads: 1200,
    likes: 189,
    rating: 4.7,
  },
  {
    id: "story-3",
    title: "Le Garçon Honnête",
    author: "Chioma A.",
    school: "École Primaire de Lagos",
    reads: 1234,
    likes: 187,
    cover: "🎯",
    bgColor: "#0077C8",
    category: "Honnêteté",
    content: `Kofi trouva un billet de mille francs devant la boutique du vieux Ibrahim. Il aurait pu le garder — personne ne l'avait vu. Mais quelque chose le retenait. Il rentra dans la boutique et tendit le billet au commerçant. Le vieil Ibrahim sourit et dit : « L'honnêteté est un trésor que personne ne peut te voler. »`,
    rating: 4.9,
  },
  {
    id: "story-4",
    title: "Le Jardin de Maman",
    author: "Amara N.",
    school: "École d'Accra",
    reads: 987,
    likes: 145,
    cover: "🌺",
    bgColor: "#00C9D7",
    category: "Famille",
    content: `Chaque samedi matin, ma mère et moi arrosons ensemble notre petit jardin. Elle m'apprend les noms des plantes en dioula et en français. « Les plantes sont comme les enfants, dit-elle, elles ont besoin d'amour, d'eau et de lumière. » Je sais maintenant que prendre soin de quelque chose, c'est aussi prendre soin de soi.`,
    rating: 4.8,
  },
  {
    id: "story-5",
    title: "Le Jeune Commerçant",
    author: "Kofi B.",
    school: "Académie de Nairobi",
    reads: 856,
    likes: 123,
    cover: "💼",
    bgColor: "#FF8C00",
    category: "Leadership",
    content: `À douze ans, Seun décida de vendre des mangues au marché pour payer ses fournitures scolaires. Il se leva à cinq heures du matin, négocia les prix avec les fournisseurs et finit par économiser assez pour acheter son cartable et ses cahiers. Ses amis lui demandèrent son secret. Il répondit : « Le travail et l'organisation. »`,
    rating: 4.7,
  },
  {
    id: "story-6",
    title: "La Fête du Village",
    author: "Zara M.",
    school: "Institut de Dakar",
    reads: 745,
    likes: 98,
    cover: "🎉",
    bgColor: "#FF1493",
    category: "Culture",
    content: `Une fois par an, notre village organise la Fête des Récoltes. Les femmes portent leurs plus beaux pagnes. Les tambourinaires jouent du matin au soir. On mange des plats que l'on ne prépare qu'une fois l'an. Je danse avec ma cousine Awa jusqu'à tomber de fatigue. Ces moments-là, je les garderai toute ma vie.`,
    rating: 4.6,
  },
  {
    id: "story-7",
    title: "Le Petit Oiseau Brave",
    author: "Amina K.",
    school: "École Primaire de Lagos",
    class: "CM2",
    age: 10,
    category: "Courage",
    reads: 1456,
    likes: 234,
    cover: "🐦",
    bgColor: "#00C9D7",
    rating: 4.8,
    content: `Lila était un oisillon qui refusait de voler. Les autres oiseaux partaient chaque matin explorer la forêt, mais elle restait accrochée à sa branche, les ailes serrées contre son corps. Un jour, une rafale de vent emporta son nid. Sans réfléchir, Lila déploya ses ailes et vola pour la première fois. La peur avait disparu — il ne restait que la liberté.`,
  },
  {
    id: "story-8",
    title: "La Recette de Grand-Mère",
    author: "Chioma A.",
    school: "École Internationale d'Accra",
    class: "CM2",
    age: 11,
    category: "Famille",
    reads: 1234,
    likes: 198,
    cover: "👵",
    bgColor: "#FF8C00",
    rating: 4.9,
    content: `Grand-mère Fatou fait le meilleur thiéboudiène du quartier. Chaque vendredi, je m'assieds à ses côtés dans la cuisine et j'apprends. Elle ne mesure rien — elle fait tout au feeling, avec ses mains et son cœur. « La cuisine, c'est de l'amour rendu visible », dit-elle. Je comprends enfin pourquoi ses plats ont toujours un goût différent des autres.`,
  },
  {
    id: "story-9",
    title: "Le Marchand Honnête",
    author: "Kwame M.",
    school: "Académie de Nairobi",
    class: "CM2",
    age: 10,
    category: "Honnêteté",
    reads: 987,
    likes: 167,
    cover: "🏪",
    bgColor: "#0077C8",
    rating: 4.7,
    content: `Moussa tenait une épicerie au carrefour principal. Un client lui remit accidentellement deux fois le prix de ses achats. Moussa aurait pu garder le surplus en silence. Mais il courut après l'homme et lui rendit la monnaie. Le bouche-à-oreille se répandit dans tout le quartier et Moussa eut bientôt plus de clients que jamais. L'honnêteté, c'est aussi un bon investissement.`,
  },
  {
    id: "story-10",
    title: "La Danse des Tambours",
    author: "Zara M.",
    school: "Institut de Dakar",
    class: "CM1",
    age: 12,
    category: "Culture",
    reads: 876,
    likes: 145,
    cover: "🥁",
    bgColor: "#FF1493",
    rating: 4.6,
    content: `Les djembés commencent à résonner à l'heure où le soleil touche l'horizon. Chaque coup de tambour raconte une histoire — une victoire, un deuil, une naissance. Mon père m'a dit que les tambours sont la voix de nos ancêtres. Quand je danse sur ce rythme, je sens qu'une longue chaîne invisible me relie à tous ceux qui m'ont précédé.`,
  },
  {
    id: "story-11",
    title: "La Jeune Cheffe",
    author: "Kofi B.",
    school: "École du Cap",
    class: "CM2",
    age: 11,
    category: "Leadership",
    reads: 756,
    likes: 132,
    cover: "⭐",
    bgColor: "#FFD700",
    rating: 4.8,
    content: `Quand la maîtresse demanda qui voulait organiser la journée de nettoyage de l'école, personne ne leva la main. Alors Aïssa se leva. Elle partagea les tâches, motiva les hésitants, récompensa les efforts avec des encouragements. À la fin de la journée, l'école brillait. La maîtresse dit : « Le vrai leader ne commande pas — il montre la voie. »`,
  },
  {
    id: "story-12",
    title: "La Rivière des Rêves",
    author: "Amara N.",
    school: "École Primaire de Kigali",
    class: "CM2",
    age: 10,
    category: "Culture",
    reads: 698,
    likes: 118,
    cover: "🌊",
    bgColor: "#00C9D7",
    rating: 4.5,
    content: `La rivière Okapi coule depuis les collines jusqu'à notre village depuis des siècles. Ma grand-mère dit qu'elle est vivante — qu'elle a une mémoire. Nous y puisons l'eau, y faisons la lessive et y pêchons. Mais cette année, les berges sont plus basses. J'ai décidé d'écrire une lettre au chef du village pour qu'on protège notre rivière avant qu'il soit trop tard.`,
  },
];

export function getStoryById(id: string): Story | undefined {
  return stories.find((s) => s.id === id);
}

export function storyHref(id: string) {
  return { pathname: "/story/[id]" as const, params: { id } };
}

export const storyCategories = [
  { name: "Tous", count: 234 },
  { name: "Courage", count: 45 },
  { name: "Famille", count: 52 },
  { name: "Culture", count: 41 },
  { name: "Honnêteté", count: 38 },
  { name: "Leadership", count: 29 },
];

export const storyFullContent = (story: Story): string => {
  // Contenu étendu pour la lecture complète
  const base = story.content;
  return `${base}

Il y avait longtemps de cela, dans un pays où les étoiles brillaient plus fort qu'aujourd'hui, vivaient des gens dont la sagesse se transmettait de génération en génération. Les anciens réunissaient les enfants chaque soir pour partager leurs récits — des histoires vraies, des fables, des souvenirs.

Ces histoires ne mouraient jamais. Elles voyageaient dans le temps portées par les voix de ceux qui les racontaient. Et aujourd'hui, c'est à ton tour de les entendre. Écoute bien, car chaque mot porte un enseignement que tu emporteras avec toi toute ta vie.

La leçon de cette histoire est simple : ce que tu fais dans les petits moments forge le caractère que tu auras dans les grands. Chaque geste compte. Chaque choix compte. Et chaque histoire que tu lis t'aide à grandir.`;
};
