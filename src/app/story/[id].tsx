import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';

import { StoryReader } from '@/components/screens/StoryReader';
import { getStoryById } from '@/data/stories';
import { goBack } from '@/utils/navigation';

export default function StoryRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const story = getStoryById(id);

  useEffect(() => {
    if (!story) goBack('/(tabs)/home');
  }, [story]);

  if (!story) return null;

  return <StoryReader story={story} />;
}
