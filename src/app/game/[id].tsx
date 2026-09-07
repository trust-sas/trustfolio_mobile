import { router, useLocalSearchParams } from 'expo-router';

import { GamePlay } from '@/components/screens/GamePlay';
import { getGameById } from '@/data/games';

export default function GameRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const game = getGameById(id);

  if (!game) {
    router.back();
    return null;
  }

  return <GamePlay game={game} />;
}
