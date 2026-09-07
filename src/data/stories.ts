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
    id: 'story-1',
    title: 'The Brave Lion',
    author: 'Amina K.',
    school: 'Lagos Primary',
    progress: 65,
    cover: '🦁',
    bgColor: '#FFD700',
    category: 'Courage',
    content: 'A brave lion learns that true courage comes from within...',
    reads: 1500,
    likes: 234,
    rating: 4.8,
  },
  {
    id: 'story-2',
    title: 'My Village',
    author: 'Kwame M.',
    school: 'Accra School',
    progress: 30,
    cover: '🏘️',
    bgColor: '#00C9D7',
    category: 'Culture',
    content: 'Discover the rich traditions of an African village...',
    reads: 1200,
    likes: 189,
    rating: 4.7,
  },
  {
    id: 'story-3',
    title: 'The Honest Boy',
    author: 'Chioma A.',
    school: 'Lagos Primary',
    reads: 1234,
    likes: 187,
    cover: '🎯',
    bgColor: '#0077C8',
    category: 'Honesty',
    content: 'A young boy learns the value of honesty when faced with a difficult choice...',
    rating: 4.9,
  },
  {
    id: 'story-4',
    title: "Mama's Garden",
    author: 'Amara N.',
    school: 'Accra School',
    reads: 987,
    likes: 145,
    cover: '🌺',
    bgColor: '#00C9D7',
    category: 'Family',
    content: 'A heartwarming story about family bonds and nature...',
    rating: 4.8,
  },
  {
    id: 'story-5',
    title: 'The Smart Trader',
    author: 'Kofi B.',
    school: 'Nairobi Academy',
    reads: 856,
    likes: 123,
    cover: '💼',
    bgColor: '#FF8C00',
    category: 'Entrepreneurship',
    content: 'Learn about business and trade in a bustling African market...',
    rating: 4.7,
  },
  {
    id: 'story-6',
    title: 'Festival Day',
    author: 'Zara M.',
    school: 'Dakar Institute',
    reads: 745,
    likes: 98,
    cover: '🎉',
    bgColor: '#FF1493',
    category: 'Culture',
    content: 'Experience the joy and excitement of a traditional festival...',
    rating: 4.6,
  },
  {
    id: 'story-7',
    title: 'The Brave Little Bird',
    author: 'Amina K.',
    school: 'Lagos Primary School',
    class: 'Grade 5',
    age: 10,
    category: 'Courage',
    reads: 1456,
    likes: 234,
    cover: '🐦',
    bgColor: '#00C9D7',
    rating: 4.8,
    content: 'A young bird learns to fly despite her fears...',
  },
  {
    id: 'story-8',
    title: "My Grandmother's Recipe",
    author: 'Chioma A.',
    school: 'Accra International',
    class: 'Grade 6',
    age: 11,
    category: 'Family',
    reads: 1234,
    likes: 198,
    cover: '👵',
    bgColor: '#FF8C00',
    rating: 4.9,
    content: 'Cooking with grandmother teaches valuable life lessons...',
  },
  {
    id: 'story-9',
    title: 'The Honest Merchant',
    author: 'Kwame M.',
    school: 'Nairobi Academy',
    class: 'Grade 5',
    age: 10,
    category: 'Honesty',
    reads: 987,
    likes: 167,
    cover: '🏪',
    bgColor: '#0077C8',
    rating: 4.7,
    content: 'A merchant chooses honesty over profit...',
  },
  {
    id: 'story-10',
    title: 'Dance of the Drums',
    author: 'Zara M.',
    school: 'Dakar Institute',
    class: 'Grade 7',
    age: 12,
    category: 'Culture',
    reads: 876,
    likes: 145,
    cover: '🥁',
    bgColor: '#FF1493',
    rating: 4.6,
    content: 'Traditional drumming brings the village together...',
  },
  {
    id: 'story-11',
    title: 'The Young Leader',
    author: 'Kofi B.',
    school: 'Cape Town School',
    class: 'Grade 6',
    age: 11,
    category: 'Leadership',
    reads: 756,
    likes: 132,
    cover: '⭐',
    bgColor: '#FFD700',
    rating: 4.8,
    content: 'A young student steps up to lead their class...',
  },
  {
    id: 'story-12',
    title: 'River of Dreams',
    author: 'Amara N.',
    school: 'Kigali Primary',
    class: 'Grade 5',
    age: 10,
    category: 'Environment',
    reads: 698,
    likes: 118,
    cover: '🌊',
    bgColor: '#00C9D7',
    rating: 4.5,
    content: 'Protecting the river that gives life to the village...',
  },
];

export function getStoryById(id: string): Story | undefined {
  return stories.find((s) => s.id === id);
}

export function storyHref(id: string) {
  return { pathname: '/story/[id]' as const, params: { id } };
}

export const storyCategories = [
  { name: 'All', count: 234 },
  { name: 'Courage', count: 45 },
  { name: 'Honesty', count: 38 },
  { name: 'Leadership', count: 29 },
  { name: 'Family', count: 52 },
  { name: 'Culture', count: 41 },
];

export const readerPages = (story: Story) => [
  `${story.content}\n\nOnce upon a time in a beautiful African village, there lived a young child with big dreams. Every day brought new adventures and lessons to learn.`,
  `The sun would rise over the savanna, painting the sky in brilliant oranges and golds. The child would wake early, excited to explore and discover new things about the world.`,
  `Through courage, honesty, and kindness, the child learned valuable lessons from elders and friends. These teachings would shape who they would become.`,
  `And so the story continues, with each day bringing new wisdom and understanding. The end... or is it just the beginning?`,
];
