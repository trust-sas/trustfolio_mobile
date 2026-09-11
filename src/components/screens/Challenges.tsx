import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { TrendingUp, Trophy } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { Brand } from '@/constants/theme';
import { showAlert } from '@/utils/alerts';

type TabId = 'children' | 'class' | 'school' | 'national';

const tabs: { id: TabId; label: string; icon: string }[] = [
  { id: 'children', label: 'Children', icon: '👧' },
  { id: 'class', label: 'Class', icon: '🏫' },
  { id: 'school', label: 'School', icon: '🎓' },
  { id: 'national', label: 'National', icon: '🌍' },
];

const childrenRanking = [
  { rank: 1, name: 'Amina K.', school: 'Lagos Primary', score: 3450, avatar: '👧', trend: 'up' },
  { rank: 2, name: 'Kwame M.', school: 'Accra Int.', score: 3210, avatar: '👦', trend: 'same' },
  { rank: 3, name: 'Chioma A.', school: 'Nairobi Academy', score: 3050, avatar: '👧', trend: 'up' },
  { rank: 4, name: 'Zara M.', school: 'Dakar Institute', score: 2890, avatar: '👧', trend: 'down' },
  { rank: 5, name: 'Kofi B.', school: 'Cape Town', score: 2750, avatar: '👦', trend: 'up' },
  { rank: 6, name: 'Amara N.', school: 'Kigali Primary', score: 2680, avatar: '👧', trend: 'same' },
  { rank: 7, name: 'Omar S.', school: 'Lagos Primary', score: 2590, avatar: '👦', trend: 'up' },
  { rank: 8, name: 'Fatima H.', school: 'Accra Int.', score: 2480, avatar: '👧', trend: 'down' },
];

const classRanking = [
  { rank: 1, name: 'Grade 6A', school: 'Lagos Primary', score: 15420, students: 25 },
  { rank: 2, name: 'Grade 5B', school: 'Accra Int.', score: 14890, students: 23 },
  { rank: 3, name: 'Grade 6C', school: 'Nairobi Academy', score: 13750, students: 24 },
];

const schoolRanking = [
  { rank: 1, name: 'Lagos Primary School', students: 450, score: 45680, stories: 89 },
  { rank: 2, name: 'Accra International', students: 380, score: 42340, stories: 76 },
  { rank: 3, name: 'Nairobi Academy', students: 420, score: 39870, stories: 72 },
];

const currentUserRank = 7;

const dailyChallenges = [
  { title: 'Daily Reader', description: 'Read 3 stories today', progress: 2, total: 3, reward: '50 XP', icon: '📖', color: Brand.blue },
  { title: 'Game Master', description: 'Complete any game level', progress: 0, total: 1, reward: '75 XP', icon: '🎮', color: Brand.orange },
  { title: 'Social Star', description: 'Like 5 stories', progress: 3, total: 5, reward: '30 XP', icon: '❤️', color: Brand.rose },
];

const weeklyChallenge = {
  title: 'Week of Reading',
  description: 'Read 10 stories this week',
  progress: 6,
  total: 10,
  reward: '200 XP + Badge',
  daysLeft: 3,
};

const medal = (rank: number) => (rank === 1 ? '🥇' : rank === 2 ? '🥈' : '🥉');

export function Challenges() {
  const [activeTab, setActiveTab] = useState<TabId>('children');

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ paddingBottom: 16 }}>
      <LinearGradient
        colors={[Brand.yellow, Brand.orange]}
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
        <Text className="text-white text-2xl mb-4 font-bold">Challenges & Rankings</Text>

        <BlurView
          intensity={40}
          tint="light"
          style={{
            borderRadius: 16,
            padding: 16,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            overflow: 'hidden',
            backgroundColor: 'rgba(255,255,255,0.2)',
          }}
        >
          <View style={{ backgroundColor: 'rgba(255,255,255,0.3)' }} className="w-16 h-16 rounded-full items-center justify-center">
            <Text style={{ fontSize: 28 }}>👧</Text>
          </View>
          <View className="flex-1">
            <Text style={{ color: 'rgba(255,255,255,0.8)' }} className="text-sm">
              Your Current Rank
            </Text>
            <View className="flex-row items-center gap-2">
              <Trophy size={20} color={Brand.yellow} />
              <Text className="text-2xl text-white font-bold">#{currentUserRank}</Text>
            </View>
          </View>
          <View className="items-end">
            <Text style={{ color: 'rgba(255,255,255,0.8)' }} className="text-sm">
              Score
            </Text>
            <Text className="text-xl text-white font-bold">2,590</Text>
          </View>
        </BlurView>
      </LinearGradient>

      <View className="px-4 mb-6">
        <Text className="text-lg mb-3 font-bold">Daily Challenges</Text>
        <View className="gap-3">
          {dailyChallenges.map((challenge) => (
            <View key={challenge.title} className="bg-white rounded-2xl p-4 border border-gray-100">
              <View className="flex-row items-start gap-3 mb-3">
                <View style={{ backgroundColor: challenge.color }} className="w-12 h-12 rounded-xl items-center justify-center">
                  <Text className="text-2xl">{challenge.icon}</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-sm mb-1 font-semibold">{challenge.title}</Text>
                  <Text className="text-xs text-gray-600 mb-2">{challenge.description}</Text>
                  <Text className="text-xs font-semibold" style={{ color: Brand.blue }}>
                    Reward: {challenge.reward}
                  </Text>
                </View>
              </View>
              <View className="bg-gray-100 rounded-full h-2 overflow-hidden">
                <View
                  style={{ width: `${(challenge.progress / challenge.total) * 100}%`, backgroundColor: challenge.color }}
                  className="h-full"
                />
              </View>
              <Text className="text-xs text-gray-500 mt-1">
                {challenge.progress}/{challenge.total} completed
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View className="px-4 mb-6">
        <Text className="text-lg mb-3 font-bold">Weekly Challenge</Text>
        <LinearGradient
          colors={[Brand.rose, Brand.orange]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ borderRadius: 16, padding: 20 }}
        >
          <View className="flex-row items-start justify-between mb-3">
            <View className="flex-1 pr-2">
              <Text className="text-lg mb-1 text-white font-bold">{weeklyChallenge.title}</Text>
              <Text style={{ color: 'rgba(255,255,255,0.9)' }} className="text-sm mb-2">
                {weeklyChallenge.description}
              </Text>
              <Text className="text-sm font-semibold" style={{ color: Brand.yellow }}>
                🎁 {weeklyChallenge.reward}
              </Text>
            </View>
            <View style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} className="rounded-xl px-3 py-2 items-center">
              <Text className="text-2xl text-white mb-1 font-bold">{weeklyChallenge.daysLeft}</Text>
              <Text className="text-xs text-white">days left</Text>
            </View>
          </View>
          <View style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} className="rounded-full h-3 overflow-hidden">
            <View
              style={{ width: `${(weeklyChallenge.progress / weeklyChallenge.total) * 100}%`, backgroundColor: Brand.yellow }}
              className="h-full"
            />
          </View>
          <Text className="text-sm mt-2 text-white">
            {weeklyChallenge.progress}/{weeklyChallenge.total} stories read
          </Text>
        </LinearGradient>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4 mb-4">
        <View className="flex-row gap-2">
          {tabs.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <TouchableOpacity
                key={tab.id}
                onPress={() => setActiveTab(tab.id)}
                style={{
                  backgroundColor: active ? Brand.orange : '#FFFFFF',
                  borderWidth: active ? 0 : 1,
                  borderColor: '#E5E7EB',
                }}
                className="flex-row items-center gap-2 px-4 py-2 rounded-full"
              >
                <Text>{tab.icon}</Text>
                <Text style={{ color: active ? '#FFFFFF' : '#374151' }} className="text-sm font-semibold">
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <View className="px-4">
        <View className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          {activeTab === 'children' &&
            childrenRanking.map((player, index) => {
              const isCurrentUser = player.rank === currentUserRank;
              return (
                <View
                  key={player.rank}
                  style={{ backgroundColor: isCurrentUser ? '#F0F9FF' : 'transparent' }}
                  className={`flex-row items-center gap-3 p-4 ${index !== childrenRanking.length - 1 ? 'border-b border-gray-100' : ''}`}
                >
                  <View style={{ width: 40 }} className="items-center">
                    {player.rank <= 3 ? (
                      <Text className="text-2xl">{medal(player.rank)}</Text>
                    ) : (
                      <Text className="text-lg text-gray-600 font-bold">#{player.rank}</Text>
                    )}
                  </View>
                  <LinearGradient
                    colors={[Brand.rose, Brand.orange]}
                    style={{ width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Text className="text-2xl">{player.avatar}</Text>
                  </LinearGradient>
                  <View className="flex-1">
                    <Text className="text-sm mb-0.5 font-semibold">
                      {player.name} {isCurrentUser && '(You)'}
                    </Text>
                    <Text className="text-xs text-gray-600">{player.school}</Text>
                  </View>
                  <View className="items-end">
                    <Text className="text-lg mb-0.5 font-bold">{player.score}</Text>
                    <View className="flex-row items-center gap-1">
                      {player.trend === 'up' && <TrendingUp size={12} color={Brand.cyan} />}
                      {player.trend === 'down' && <TrendingUp size={12} color={Brand.rose} style={{ transform: [{ rotate: '180deg' }] }} />}
                      {player.trend === 'same' && <Text className="text-xs text-gray-400">—</Text>}
                    </View>
                  </View>
                </View>
              );
            })}

          {activeTab === 'class' &&
            classRanking.map((item, index) => (
              <View
                key={item.rank}
                className={`flex-row items-center gap-3 p-4 ${index !== classRanking.length - 1 ? 'border-b border-gray-100' : ''}`}
              >
                <Text style={{ width: 40, fontSize: 24 }} className="text-center">
                  {medal(item.rank)}
                </Text>
                <LinearGradient
                  colors={[Brand.blue, Brand.cyan]}
                  style={{ width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center' }}
                >
                  <Text className="text-2xl">🏫</Text>
                </LinearGradient>
                <View className="flex-1">
                  <Text className="text-sm mb-0.5 font-semibold">{item.name}</Text>
                  <Text className="text-xs text-gray-600">
                    {item.school} • {item.students} students
                  </Text>
                </View>
                <Text className="text-lg font-bold">{item.score}</Text>
              </View>
            ))}

          {activeTab === 'school' &&
            schoolRanking.map((school, index) => (
              <View
                key={school.rank}
                className={`flex-row items-center gap-3 p-4 ${index !== schoolRanking.length - 1 ? 'border-b border-gray-100' : ''}`}
              >
                <Text style={{ width: 40, fontSize: 24 }} className="text-center">
                  {medal(school.rank)}
                </Text>
                <LinearGradient
                  colors={[Brand.cyan, Brand.blue]}
                  style={{ width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center' }}
                >
                  <Text className="text-2xl">🎓</Text>
                </LinearGradient>
                <View className="flex-1">
                  <Text className="text-sm mb-1 font-semibold">{school.name}</Text>
                  <Text className="text-xs text-gray-600">
                    {school.students} students • {school.stories} stories
                  </Text>
                </View>
                <Text className="text-lg font-bold">{school.score}</Text>
              </View>
            ))}

          {activeTab === 'national' && (
            <View className="p-8 items-center">
              <Text style={{ fontSize: 56 }} className="mb-4">
                🌍
              </Text>
              <Text className="text-lg mb-2 font-bold">National Rankings</Text>
              <Text className="text-sm text-gray-600 mb-4 text-center">Compete with students from all across Africa!</Text>
              <TouchableOpacity
                onPress={() => showAlert('Coming soon', 'National rankings across Africa are launching soon!')}
              >
                <LinearGradient colors={[Brand.rose, Brand.orange]} style={{ borderRadius: 12, paddingHorizontal: 24, paddingVertical: 12 }}>
                  <Text className="text-white font-semibold">View National Rankings</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
