import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Lock, Play, Star, Trophy, Zap } from 'lucide-react-native';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { Brand } from '@/constants/theme';
import { gameHref, games } from '@/data/games';

const achievements = [
  { name: 'First Win', icon: '🎯', earned: true },
  { name: 'Speed Reader', icon: '⚡', earned: true },
  { name: 'Word Master', icon: '📚', earned: true },
  { name: 'Culture Expert', icon: '🌍', earned: false },
  { name: 'Champion', icon: '👑', earned: false },
];

const rankingSystem = [
  { title: 'Citizen', range: '0 - 1K XP', icon: '👶', color: '#9CA3AF' },
  { title: 'Explorer', range: '1K - 5K XP', icon: '🧒', color: Brand.blue },
  { title: 'Scholar', range: '5K - 10K XP', icon: '📚', color: Brand.cyan },
  { title: 'Achiever', range: '10K - 25K XP', icon: '⭐', color: Brand.yellow },
  { title: 'Master', range: '25K - 50K XP', icon: '🎓', color: Brand.orange },
  { title: 'Legend', range: '50K+ XP', icon: '👑', color: Brand.rose },
];

export function Games() {
  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ paddingBottom: 16 }}>
      <LinearGradient
        colors={[Brand.blue, Brand.cyan]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
          paddingHorizontal: 16,
          paddingVertical: 24,
          marginBottom: 16,
        }}
      >
        <Text className="text-white text-2xl mb-4 font-bold">Educational Games</Text>

        <View style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} className="rounded-2xl p-4">
          <View className="flex-row items-center gap-3 mb-3">
            <View style={{ backgroundColor: 'rgba(255,255,255,0.3)' }} className="w-16 h-16 rounded-full items-center justify-center">
              <Text style={{ fontSize: 28 }}>🧒</Text>
            </View>
            <View className="flex-1">
              <Text className="text-white text-lg mb-1 font-bold">Explorer</Text>
              <Text style={{ color: 'rgba(255,255,255,0.8)' }} className="text-sm">
                Level 15 • 2,450 XP
              </Text>
            </View>
            <Zap size={28} color={Brand.yellow} />
          </View>

          <View style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} className="rounded-full h-2 overflow-hidden">
            <View style={{ width: '65%', backgroundColor: Brand.yellow }} className="h-full" />
          </View>
          <Text style={{ color: 'rgba(255,255,255,0.8)' }} className="text-xs mt-1">
            2,450 / 5,000 XP to Scholar
          </Text>
        </View>
      </LinearGradient>

      <View className="px-4 mb-6">
        <Text className="text-lg mb-3 font-bold">All Games</Text>
        <View className="gap-4">
          {games.map((game) => (
            <View key={game.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 flex-row">
              <View style={{ backgroundColor: game.bgColor }} className="w-24 h-24 items-center justify-center">
                <Text style={{ fontSize: 40 }}>{game.icon}</Text>
                {!game.unlocked && (
                  <View style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} className="absolute inset-0 items-center justify-center">
                    <Lock size={28} color="#ffffff" />
                  </View>
                )}
              </View>

              <View className="flex-1 p-4">
                <Text className="text-base mb-1 font-bold">{game.name}</Text>
                <Text className="text-xs text-gray-600 mb-2">{game.description}</Text>

                {game.unlocked ? (
                  <>
                    <View className="flex-row gap-4 mb-2">
                      <View className="flex-row items-center gap-1">
                        <Trophy size={12} color="#4B5563" />
                        <Text className="text-xs text-gray-600">{game.score}</Text>
                      </View>
                      <View className="flex-row items-center gap-1">
                        <Star size={12} color={Brand.yellow} />
                        <Text className="text-xs text-gray-600">{game.stars}</Text>
                      </View>
                      <View className="flex-row items-center gap-1">
                        <Zap size={12} color={Brand.orange} />
                        <Text className="text-xs text-gray-600">Lvl {game.level}</Text>
                      </View>
                    </View>

                    <View className="mb-2">
                      <View className="bg-gray-100 rounded-full h-1.5 overflow-hidden">
                        <View style={{ width: `${game.progress}%`, backgroundColor: game.bgColor }} className="h-full" />
                      </View>
                      <Text className="text-xs text-gray-500 mt-1">{game.progress}% complete</Text>
                    </View>
                  </>
                ) : (
                  <View className="flex-row items-center gap-2 mb-2">
                    <Lock size={12} color="#6B7280" />
                    <Text className="text-xs text-gray-500">Unlock at Level 20</Text>
                  </View>
                )}

                <TouchableOpacity
                  onPress={() => game.unlocked && router.push(gameHref(game.id))}
                  disabled={!game.unlocked}
                  style={{ backgroundColor: game.unlocked ? game.bgColor : '#F3F4F6' }}
                  className="flex-row items-center gap-2 px-4 py-2 rounded-xl self-start"
                >
                  <Play size={16} color={game.unlocked ? '#FFFFFF' : '#9CA3AF'} />
                  <Text style={{ color: game.unlocked ? '#FFFFFF' : '#9CA3AF' }} className="text-sm font-semibold">
                    {game.unlocked ? 'Play Now' : 'Locked'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View className="px-4 mb-6">
        <Text className="text-lg mb-3 font-bold">Achievements</Text>
        <View className="bg-white rounded-2xl p-4 border border-gray-100">
          <View className="flex-row flex-wrap justify-between">
            {achievements.map((achievement) => (
              <View key={achievement.name} style={{ opacity: achievement.earned ? 1 : 0.3, width: '18%' }} className="items-center gap-1">
                <LinearGradient
                  colors={achievement.earned ? [Brand.yellow, Brand.orange] : ['#F3F4F6', '#F3F4F6']}
                  style={{ width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' }}
                >
                  <Text className="text-2xl">{achievement.icon}</Text>
                </LinearGradient>
                <Text className="text-xs text-center">{achievement.name}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View className="px-4 mb-6">
        <View className="flex-row items-center gap-2 mb-3">
          <Trophy size={24} color={Brand.yellow} />
          <Text className="text-lg font-bold">Ranking System</Text>
        </View>
        <View style={{ backgroundColor: '#FFF7ED', borderColor: '#FDBA74' }} className="rounded-2xl p-4 border">
          <View className="gap-2">
            {rankingSystem.map((rank, index) => (
              <View key={rank.title} className="flex-row items-center gap-3">
                <View style={{ backgroundColor: rank.color }} className="w-10 h-10 rounded-full items-center justify-center">
                  <Text style={{ fontSize: 18 }}>{rank.icon}</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-semibold">{rank.title}</Text>
                  <Text className="text-xs text-gray-600">{rank.range}</Text>
                </View>
                {index === 1 && (
                  <View style={{ backgroundColor: Brand.cyan }} className="rounded-full px-2 py-1">
                    <Text className="text-white text-xs font-semibold">Current</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
