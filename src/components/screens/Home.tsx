import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Award, BookOpen, Sparkles, TrendingUp } from 'lucide-react-native';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { Brand } from '@/constants/theme';
import { gameHref, games } from '@/data/games';
import { storyHref, stories } from '@/data/stories';

const heroItems = [
  { title: 'New Story Competition', subtitle: 'Win amazing prizes!', bgColor: Brand.rose },
  { title: 'Featured Schools', subtitle: 'Top performers this month', bgColor: Brand.blue },
  { title: 'Holiday Anthology', subtitle: 'Special collection available', bgColor: Brand.orange },
];

const continueReading = stories.filter((s) => s.id === 'story-1' || s.id === 'story-2');
const popularStories = stories.filter((s) => ['story-3', 'story-4', 'story-5', 'story-6'].includes(s.id));
const homeGames = games.slice(0, 5);

const topSchools = [
  { rank: 1, name: 'Lagos Primary School', points: 12450, stories: 89, icon: '🥇' },
  { rank: 2, name: 'Accra International', points: 11230, stories: 76, icon: '🥈' },
  { rank: 3, name: 'Nairobi Academy', points: 10890, stories: 72, icon: '🥉' },
];

const dailyChallenges = [
  { id: 1, task: 'Read a story', reward: '+50 XP', icon: '📖', color: Brand.blue },
  { id: 2, task: 'Finish a game', reward: '+75 XP', icon: '🎮', color: Brand.orange },
  { id: 3, task: 'Write a story', reward: '+100 XP', icon: '✍️', color: Brand.rose },
];

export function Home() {
  const handleChallengePress = (challengeId: number) => {
    if (challengeId === 1) router.push(storyHref(popularStories[0].id));
    else if (challengeId === 2) router.push(gameHref(homeGames[0].id));
    else if (challengeId === 3) router.push('/write');
  };

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
        <View className="flex-row items-center justify-between mb-4">
          <View>
            <Text style={{ color: 'rgba(255,255,255,0.8)' }} className="text-sm">
              Welcome back,
            </Text>
            <Text className="text-white text-2xl font-bold">Amina! 👋</Text>
          </View>
          <View className="rounded-full p-3" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
            <Sparkles size={24} color={Brand.yellow} />
          </View>
        </View>

        <View className="flex-row gap-3">
          {[
            { label: 'Stories Read', value: '12' },
            { label: 'XP Points', value: '450' },
            { label: 'Badges', value: '5' },
          ].map((stat) => (
            <View key={stat.label} className="flex-1 rounded-xl p-3 items-center" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
              <Text className="text-2xl text-white mb-1">{stat.value}</Text>
              <Text style={{ color: 'rgba(255,255,255,0.8)' }} className="text-xs text-center">
                {stat.label}
              </Text>
            </View>
          ))}
        </View>
      </LinearGradient>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4 mb-6">
        <View className="flex-row gap-3">
          {heroItems.map((item) => (
            <View key={item.title} className="w-72 rounded-2xl p-6" style={{ backgroundColor: item.bgColor }}>
              <Text className="text-xl mb-2 font-bold text-white">{item.title}</Text>
              <Text style={{ color: 'rgba(255,255,255,0.9)' }} className="text-sm">
                {item.subtitle}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {continueReading.length > 0 && (
        <View className="px-4 mb-6">
          <Text className="text-xl mb-3 font-bold">Continue Reading</Text>
          <View className="gap-3">
            {continueReading.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => router.push(storyHref(item.id))}
                className="bg-white rounded-2xl p-4 border border-gray-100"
              >
                <View className="flex-row gap-3 mb-3">
                  <LinearGradient
                    colors={[Brand.rose, Brand.orange]}
                    style={{ width: 48, height: 64, borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Text className="text-2xl">{item.cover}</Text>
                  </LinearGradient>
                  <View className="flex-1">
                    <Text className="mb-1 font-semibold">{item.title}</Text>
                    <Text className="text-sm text-gray-600">by {item.author}</Text>
                  </View>
                </View>
                <View className="bg-gray-100 rounded-full h-2 overflow-hidden">
                  <View style={{ width: `${item.progress ?? 0}%`, backgroundColor: Brand.blue }} className="h-full" />
                </View>
                <Text className="text-xs text-gray-500 mt-1">{item.progress}% complete</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      <View className="px-4 mb-6">
        <View className="flex-row items-center justify-between mb-3">
          <Text className="text-xl font-bold">Popular Stories</Text>
          <Text className="text-sm font-semibold" style={{ color: Brand.blue }}>
            See All
          </Text>
        </View>
        <View className="flex-row flex-wrap gap-3">
          {popularStories.map((story) => (
            <TouchableOpacity
              key={story.id}
              onPress={() => router.push(storyHref(story.id))}
              style={{ width: '47%' }}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100"
            >
              <View style={{ backgroundColor: story.bgColor }} className="h-32 items-center justify-center">
                <Text style={{ fontSize: 48 }}>{story.cover}</Text>
              </View>
              <View className="p-3">
                <Text className="text-sm mb-1 font-semibold" numberOfLines={1}>
                  {story.title}
                </Text>
                <Text className="text-xs text-gray-600 mb-1">by {story.author}</Text>
                <Text className="text-xs text-gray-500 mb-2">{story.school}</Text>
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center gap-1">
                    <BookOpen size={12} color="#4B5563" />
                    <Text className="text-xs text-gray-600">{story.reads}</Text>
                  </View>
                  <Text className="text-xs font-semibold" style={{ color: Brand.blue }}>
                    Read
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View className="mb-6">
        <Text className="text-xl mb-3 font-bold px-4">Educational Games</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4">
          <View className="flex-row gap-3">
            {homeGames.map((game) => (
              <TouchableOpacity key={game.id} onPress={() => router.push(gameHref(game.id))} style={{ width: 128 }}>
                <View style={{ backgroundColor: game.bgColor }} className="h-32 rounded-2xl items-center justify-center mb-2">
                  <Text style={{ fontSize: 48 }}>{game.icon}</Text>
                </View>
                <Text className="text-sm text-center font-semibold">{game.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <View className="px-4 mb-6">
        <View className="flex-row items-center gap-2 mb-3">
          <Award size={24} color={Brand.yellow} />
          <Text className="text-xl font-bold">Top Schools</Text>
        </View>
        <View className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          {topSchools.map((school, index) => (
            <View
              key={school.rank}
              className={`flex-row items-center gap-3 p-4 ${index !== topSchools.length - 1 ? 'border-b border-gray-100' : ''}`}
            >
              <Text style={{ fontSize: 30 }}>{school.icon}</Text>
              <View className="flex-1">
                <Text className="text-sm mb-1 font-semibold">{school.name}</Text>
                <View className="flex-row gap-4">
                  <Text className="text-xs text-gray-600">{school.points} pts</Text>
                  <Text className="text-xs text-gray-600">{school.stories} stories</Text>
                </View>
              </View>
              <TrendingUp size={20} color={Brand.cyan} />
            </View>
          ))}
        </View>
      </View>

      <View className="px-4 mb-6">
        <Text className="text-xl mb-3 font-bold">Daily Challenges</Text>
        <View className="gap-3">
          {dailyChallenges.map((challenge) => (
            <View key={challenge.id} className="bg-white rounded-2xl p-4 border border-gray-100 flex-row items-center gap-3">
              <View style={{ backgroundColor: challenge.color }} className="w-12 h-12 rounded-xl items-center justify-center">
                <Text className="text-2xl">{challenge.icon}</Text>
              </View>
              <View className="flex-1">
                <Text className="text-sm mb-1 font-semibold">{challenge.task}</Text>
                <Text className="text-xs text-gray-600">{challenge.reward}</Text>
              </View>
              <TouchableOpacity
                onPress={() => handleChallengePress(challenge.id)}
                style={{ backgroundColor: Brand.rose }}
                className="px-4 py-2 rounded-xl"
              >
                <Text className="text-white text-sm font-semibold">Start</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
