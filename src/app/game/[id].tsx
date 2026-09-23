import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';

import { GamePlay } from '@/components/screens/GamePlay';
import { getGameById } from '@/data/games';
import { goBack } from '@/utils/navigation';

export default function GameRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const game = getGameById(id);

  useEffect(() => {
    if (!game) goBack('/(tabs)/home');
  }, [game]);

  if (!game) return null;

  return <GamePlay game={game} />;
}
