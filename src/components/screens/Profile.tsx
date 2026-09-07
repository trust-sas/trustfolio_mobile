import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import {
  Bell,
  BookOpen,
  ChevronRight,
  Crown,
  Gamepad2,
  Heart,
  HelpCircle,
  LogOut,
  Settings as SettingsIcon,
  Shield,
} from 'lucide-react-native';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { Brand } from '@/constants/theme';
import { useApp } from '@/context/AppContext';
import { SettingsSection } from '@/components/screens/Settings';
import { storyHref, stories } from '@/data/stories';
import { showAlert, showConfirm } from '@/utils/alerts';

const badges = [
  { name: 'First Story', emoji: '📖', unlocked: true },
  { name: 'Speed Reader', emoji: '⚡', unlocked: true },
  { name: 'Game Master', emoji: '🎮', unlocked: true },
  { name: 'Author', emoji: '✍️', unlocked: true },
  { name: 'Champion', emoji: '🏆', unlocked: false },
  { name: 'Legend', emoji: '👑', unlocked: false },
];

const readingStats = { storiesRead: 24, timeSpent: '12h 45m', favoriteCategory: 'Adventure', streak: 7 };
const gamesStats = { gamesPlayed: 18, totalScore: 2450, level: 15, achievements: 12 };
const favoriteStories = stories.filter((s) => ['story-1', 'story-4', 'story-5'].includes(s.id));

const menuItems: { icon: typeof SettingsIcon; label: string; color: string; badge?: string; section?: SettingsSection }[] = [
  { icon: SettingsIcon, label: 'Account Settings', color: '#6B7280', section: 'account' },
  { icon: Bell, label: 'Notifications', color: Brand.blue, badge: '3', section: 'notifications' },
  { icon: Crown, label: 'Subscription & Billing', color: Brand.yellow },
  { icon: Shield, label: 'Privacy & Safety', color: Brand.cyan, section: 'privacy' },
  { icon: HelpCircle, label: 'Help & Support', color: Brand.orange, section: 'help' },
];

const subscription = { plan: 'Premium', price: '3500 FCFA', access: ['1 School', '2 Classes', 'All Games'] };

export function Profile() {
  const { profile, parentModeEnabled, setParentModeEnabled, logOut } = useApp();

  const handleMenuPress = (item: (typeof menuItems)[number]) => {
    if (item.section) {
      router.push({ pathname: '/settings', params: { section: item.section } });
    } else {
      showAlert('Coming soon', 'Subscription & billing management will be available once payments are connected.');
    }
  };

  const handleSwitchToParentView = () => {
    setParentModeEnabled(true);
    router.push('/parent-dashboard');
  };

  const handleLogOut = () => {
    showConfirm('Log Out', 'Are you sure you want to log out?', async () => {
      await logOut();
      router.replace('/onboarding');
    }, 'Log Out');
  };

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ paddingBottom: 16 }}>
      <LinearGradient
        colors={[Brand.rose, Brand.orange]}
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
        <View className="flex-row items-center gap-4 mb-4">
          <View
            style={{ backgroundColor: 'rgba(255,255,255,0.2)', borderColor: 'rgba(255,255,255,0.3)', borderWidth: 4 }}
            className="w-20 h-20 rounded-full items-center justify-center"
          >
            <Text style={{ fontSize: 36 }}>👧</Text>
          </View>
          <View>
            <Text className="text-2xl mb-1 text-white font-bold">{profile.fullName}</Text>
            <Text style={{ color: 'rgba(255,255,255,0.8)' }} className="text-sm">
              {profile.grade}, {profile.school}
            </Text>
            <Text style={{ color: 'rgba(255,255,255,0.8)' }} className="text-sm">
              Member since Jan 2026
            </Text>
          </View>
        </View>

        <View style={{ backgroundColor: 'rgba(255,255,255,0.15)' }} className="rounded-2xl p-4 flex-row justify-around">
          {[
            { label: 'Stories', value: '24' },
            { label: 'XP', value: '2.4K' },
            { label: 'Badges', value: '4' },
            { label: 'Streak', value: '7' },
          ].map((stat) => (
            <View key={stat.label} className="items-center">
              <Text className="text-2xl mb-1 text-white">{stat.value}</Text>
              <Text style={{ color: 'rgba(255,255,255,0.8)' }} className="text-xs">
                {stat.label}
              </Text>
            </View>
          ))}
        </View>
      </LinearGradient>

      <View className="px-4 mb-6">
        <LinearGradient colors={[Brand.yellow, Brand.orange]} style={{ borderRadius: 16, padding: 20 }}>
          <View className="flex-row items-center gap-2 mb-2">
            <Crown size={20} color="#ffffff" />
            <Text className="text-lg text-white font-bold">{subscription.plan} Plan</Text>
          </View>
          <Text className="text-2xl mb-2 text-white font-bold">{subscription.price}/month</Text>
          <View className="gap-1 mb-3">
            {subscription.access.map((item) => (
              <View key={item} className="flex-row items-center gap-2">
                <Text className="text-white text-sm">✓</Text>
                <Text className="text-white text-sm">{item}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity
            onPress={() =>
              showAlert('Coming soon', 'Subscription & billing management will be available once payments are connected.')
            }
            className="bg-white rounded-xl py-2 items-center"
          >
            <Text style={{ color: Brand.orange }} className="text-sm font-semibold">
              Manage Subscription
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>

      <View className="px-4 mb-6">
        <View className="flex-row items-center justify-between mb-3">
          <View className="flex-row items-center gap-2">
            <Text className="text-lg font-bold">🏅 My Badges</Text>
          </View>
          <Text className="text-sm text-gray-500">4/6 unlocked</Text>
        </View>
        <View className="bg-white rounded-2xl p-4 border border-gray-100">
          <View className="flex-row flex-wrap gap-4">
            {badges.map((badge) => (
              <View
                key={badge.name}
                style={{
                  width: '28%',
                  opacity: badge.unlocked ? 1 : 0.4,
                  backgroundColor: badge.unlocked ? '#FFF7ED' : '#F9FAFB',
                  borderWidth: badge.unlocked ? 1 : 0,
                  borderColor: '#FDBA74',
                }}
                className="items-center gap-2 p-3 rounded-xl"
              >
                <Text className="text-3xl">{badge.emoji}</Text>
                <Text className="text-xs text-center">{badge.name}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View className="px-4 mb-6">
        <View className="flex-row items-center gap-2 mb-3">
          <BookOpen size={20} color={Brand.blue} />
          <Text className="text-lg font-bold">Reading Statistics</Text>
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
          <Text className="text-lg font-bold">Games Statistics</Text>
        </View>
        <View className="bg-white rounded-2xl p-4 border border-gray-100 flex-row flex-wrap gap-4">
          {[
            { bg: '#FCE7F3', value: gamesStats.gamesPlayed, label: 'Games Played' },
            { bg: '#FFF7ED', value: gamesStats.totalScore, label: 'Total Score' },
            { bg: '#EFF6FF', value: `Level ${gamesStats.level}`, label: 'Current Level' },
            { bg: '#ECFDF5', value: gamesStats.achievements, label: 'Achievements' },
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
          <Heart size={20} color={Brand.rose} />
          <Text className="text-lg font-bold">Favorite Stories</Text>
        </View>
        <View className="gap-3">
          {favoriteStories.map((story) => (
            <TouchableOpacity
              key={story.id}
              onPress={() => router.push(storyHref(story.id))}
              className="bg-white rounded-2xl p-3 border border-gray-100 flex-row items-center gap-3"
            >
              <LinearGradient
                colors={[Brand.rose, Brand.orange]}
                style={{ width: 48, height: 64, borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}
              >
                <Text className="text-2xl">{story.cover}</Text>
              </LinearGradient>
              <View className="flex-1">
                <Text className="text-sm mb-1 font-semibold">{story.title}</Text>
                <Text className="text-xs text-gray-600">by {story.author}</Text>
              </View>
              <Heart size={20} color={Brand.rose} fill={Brand.rose} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View className="px-4 mb-6">
        <Text className="text-lg mb-3 font-bold">Settings</Text>
        <View className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <TouchableOpacity
                key={item.label}
                onPress={() => handleMenuPress(item)}
                className={`flex-row items-center justify-between p-4 ${index !== menuItems.length - 1 ? 'border-b border-gray-100' : ''}`}
              >
                <View className="flex-row items-center gap-3">
                  <Icon size={20} color={item.color} />
                  <Text className="text-sm">{item.label}</Text>
                </View>
                <View className="flex-row items-center gap-2">
                  {item.badge && (
                    <View style={{ backgroundColor: Brand.rose }} className="rounded-full px-2 py-0.5">
                      <Text className="text-white text-xs">{item.badge}</Text>
                    </View>
                  )}
                  <ChevronRight size={20} color="#9CA3AF" />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View className="px-4 mb-6">
        <View style={{ backgroundColor: '#EFF6FF', borderColor: '#60A5FA' }} className="rounded-2xl p-5 border flex-row gap-3">
          <Shield size={24} color={Brand.blue} />
          <View className="flex-1">
            <Text className="text-sm mb-1 font-bold">Parent Dashboard</Text>
            <Text className="text-xs text-gray-600 mb-3">
              {parentModeEnabled
                ? "You're currently viewing as a parent."
                : 'Parents can monitor reading progress, manage subscriptions, and control privacy settings.'}
            </Text>
            <TouchableOpacity
              onPress={handleSwitchToParentView}
              style={{ backgroundColor: Brand.blue }}
              className="px-4 py-2 rounded-xl self-start"
            >
              <Text className="text-white text-sm font-semibold">
                {parentModeEnabled ? 'Open Parent Dashboard' : 'Switch to Parent View'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View className="px-4 mb-6">
        <TouchableOpacity
          onPress={handleLogOut}
          style={{ borderColor: '#FECACA' }}
          className="flex-row items-center justify-center gap-2 bg-red-50 rounded-2xl py-4 border"
        >
          <LogOut size={20} color="#DC2626" />
          <Text style={{ color: '#DC2626' }} className="font-semibold">
            Log Out
          </Text>
        </TouchableOpacity>
      </View>

      <Text className="text-center text-xs text-gray-400 mb-4">TrustFolioKids v1.0.0</Text>
    </ScrollView>
  );
}
