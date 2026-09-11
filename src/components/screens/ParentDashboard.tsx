import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { BookOpen, Gamepad2, Shield, X } from 'lucide-react-native';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { Brand } from '@/constants/theme';
import { useApp } from '@/context/AppContext';

const readingStats = { storiesRead: 24, timeSpent: '12h 45m', favoriteCategory: 'Adventure', streak: 7 };
const gamesStats = { gamesPlayed: 18, totalScore: 2450, level: 15 };
const subscription = { plan: 'Premium', price: '3500 FCFA', access: ['1 School', '2 Classes', 'All Games'] };

export function ParentDashboard() {
  const { profile, privacyPreferences, setParentModeEnabled } = useApp();

  const handleBackToKidView = () => {
    setParentModeEnabled(false);
    router.back();
  };

  return (
    <View className="flex-1 bg-white">
      <View className="px-4 py-4 border-b border-gray-200 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <X size={24} color="#000000" />
        </TouchableOpacity>
        <Text className="text-lg font-bold">Parent Dashboard</Text>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 24 }}>
        <View className="px-4 pt-4 mb-6">
          <Text className="text-sm text-gray-500 mb-1">Monitoring</Text>
          <Text className="text-2xl font-bold">{profile.fullName}</Text>
          <Text className="text-sm text-gray-600">
            {profile.grade}, {profile.school}
          </Text>
        </View>

        <View className="px-4 mb-6">
          <View className="flex-row items-center gap-2 mb-3">
            <BookOpen size={20} color={Brand.blue} />
            <Text className="text-lg font-bold">Reading Progress</Text>
          </View>
          <View className="bg-white rounded-2xl p-4 border border-gray-100 flex-row flex-wrap gap-4">
            {[
              { bg: '#EFF6FF', value: readingStats.storiesRead, label: 'Stories Read' },
              { bg: '#FCE7F3', value: readingStats.timeSpent, label: 'Time Spent' },
              { bg: '#ECFDF5', value: readingStats.favoriteCategory, label: 'Favorite' },
              { bg: '#FFF7ED', value: `${readingStats.streak} days`, label: 'Reading Streak' },
            ].map((item) => (
              <View key={item.label} style={{ backgroundColor: item.bg, width: '47%' }} className="rounded-xl p-3 items-center">
                <Text className="text-2xl mb-1 font-bold">{item.value}</Text>
                <Text className="text-xs text-gray-600">{item.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View className="px-4 mb-6">
          <View className="flex-row items-center gap-2 mb-3">
            <Gamepad2 size={20} color={Brand.orange} />
            <Text className="text-lg font-bold">Games Activity</Text>
          </View>
          <View className="bg-white rounded-2xl p-4 border border-gray-100 flex-row flex-wrap gap-4">
            {[
              { bg: '#FCE7F3', value: gamesStats.gamesPlayed, label: 'Games Played' },
              { bg: '#FFF7ED', value: gamesStats.totalScore, label: 'Total Score' },
              { bg: '#EFF6FF', value: `Level ${gamesStats.level}`, label: 'Current Level' },
            ].map((item) => (
              <View key={item.label} style={{ backgroundColor: item.bg, width: '47%' }} className="rounded-xl p-3 items-center">
                <Text className="text-2xl mb-1 font-bold">{item.value}</Text>
                <Text className="text-xs text-gray-600">{item.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View className="px-4 mb-6">
          <LinearGradient colors={[Brand.yellow, Brand.orange]} style={{ borderRadius: 16, padding: 20 }}>
            <Text className="text-lg text-white mb-2 font-bold">{subscription.plan} Plan</Text>
            <Text className="text-2xl mb-2 text-white font-bold">{subscription.price}/month</Text>
            <View className="gap-1">
              {subscription.access.map((item) => (
                <Text key={item} className="text-white text-sm">
                  ✓ {item}
                </Text>
              ))}
            </View>
          </LinearGradient>
        </View>

        <View className="px-4 mb-6">
          <View className="flex-row items-center gap-2 mb-3">
            <Shield size={20} color={Brand.cyan} />
            <Text className="text-lg font-bold">Privacy Settings</Text>
          </View>
          <View className="bg-white rounded-2xl border border-gray-100 p-4 gap-2">
            <View className="flex-row items-center justify-between">
              <Text className="text-sm text-gray-700">Profile Visibility</Text>
              <Text className="text-sm font-semibold">{privacyPreferences.profileVisibility}</Text>
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="text-sm text-gray-700">Story Sharing</Text>
              <Text className="text-sm font-semibold">{privacyPreferences.storySharing}</Text>
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="text-sm text-gray-700">Data Collection</Text>
              <Text className="text-sm font-semibold">{privacyPreferences.dataCollection ? 'Allowed' : 'Off'}</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => router.push({ pathname: '/settings', params: { section: 'privacy' } })}
            className="mt-3 self-start"
          >
            <Text style={{ color: Brand.blue }} className="text-sm font-semibold">
              Manage privacy settings →
            </Text>
          </TouchableOpacity>
        </View>

        <View className="px-4">
          <TouchableOpacity
            onPress={handleBackToKidView}
            style={{ backgroundColor: Brand.blue }}
            className="rounded-2xl py-4 items-center"
          >
            <Text className="text-white font-semibold">Switch back to Kid View</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
