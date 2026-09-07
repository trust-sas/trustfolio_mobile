import { router, useLocalSearchParams } from 'expo-router';

import { StoryReader } from '@/components/screens/StoryReader';
import { getStoryById } from '@/data/stories';

export default function StoryRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const story = getStoryById(id);

  if (!story) {
    router.back();
    return null;
  }

  return <StoryReader story={story} />;
}
