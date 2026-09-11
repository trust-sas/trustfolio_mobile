export interface Game {
  id: string;
  name: string;
  description: string;
  subtitle: string;
  icon: string;
  bgColor: string;
  progress: number;
  score: number;
  stars: number;
  level: number;
  unlocked: boolean;
}

export const games: Game[] = [
  {
    id: 'game-1',
    name: 'TrustTreasure',
    description: 'Word and vocabulary adventure game',
    subtitle: 'Vocabulaire et orthographe',
    icon: '💎',
    bgColor: '#FFD700',
    progress: 75,
    score: 2450,
    stars: 312,
    level: 15,
    unlocked: true,
  },
  {
    id: 'game-2',
    name: 'TrustBridge',
    description: 'Reading comprehension challenge',
    subtitle: 'Compréhension de lecture',
    icon: '🌉',
    bgColor: '#0077C8',
    progress: 60,
    score: 1890,
    stars: 245,
    level: 12,
    unlocked: true,
  },
  {
    id: 'game-3',
    name: 'TrustTree',
    description: 'Environmental learning game',
    subtitle: 'Sciences de l\'environnement',
    icon: '🌳',
    bgColor: '#00C9D7',
    progress: 45,
    score: 1340,
    stars: 178,
    level: 9,
    unlocked: true,
  },
  {
    id: 'game-4',
    name: 'TrustRoots',
    description: 'African culture discovery game',
    subtitle: 'Culture africaine',
    icon: '🎭',
    bgColor: '#FF1493',
    progress: 30,
    score: 980,
    stars: 134,
    level: 6,
    unlocked: true,
  },
  {
    id: 'game-5',
    name: 'TrustBiz',
    description: 'Financial literacy simulator',
    subtitle: 'Éducation financière',
    icon: '💰',
    bgColor: '#FF8C00',
    progress: 15,
    score: 450,
    stars: 67,
    level: 3,
    unlocked: true,
  },
];

export function getGameById(id: string): Game | undefined {
  return games.find((g) => g.id === id);
}

export function gameHref(id: string) {
  return { pathname: '/game/[id]' as const, params: { id } };
}

export const quizQuestions = [
  {
    question: "Que signifie le mot « Courage » ?",
    answers: ['Avoir peur', 'Être brave', 'Être rapide', 'Être silencieux'],
    correct: 1,
  },
  {
    question: "Quel mot rime avec « chat » ?",
    answers: ['Chien', 'Rat', 'Poisson', 'Oiseau'],
    correct: 1,
  },
  {
    question: "Quel est le synonyme de « heureux » ?",
    answers: ['Triste', 'Joyeux', 'En colère', 'Fatigué'],
    correct: 1,
  },
];
