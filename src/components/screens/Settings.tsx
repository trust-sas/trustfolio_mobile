import { Bell, ChevronDown, ChevronLeft, HelpCircle, Info, Shield, User, X } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { Brand } from '@/constants/theme';
import { useApp } from '@/context/AppContext';
import { NotificationPreferences, ProfileVisibility, StorySharing } from '@/data/userRepository';
import { showAlert } from '@/utils/alerts';
import { goBack } from '@/utils/navigation';

export type SettingsSection = 'main' | 'account' | 'notifications' | 'privacy' | 'help';

const sections: { id: SettingsSection; icon: typeof User; label: string; color: string }[] = [
  { id: 'account', icon: User, label: 'Account Settings', color: '#6B7280' },
  { id: 'notifications', icon: Bell, label: 'Notifications', color: Brand.blue },
  { id: 'privacy', icon: Shield, label: 'Privacy & Safety', color: Brand.cyan },
  { id: 'help', icon: HelpCircle, label: 'Help & Support', color: Brand.orange },
];

const grades = ['Grade 5', 'Grade 6', 'Grade 7'];

const notificationItems: { key: keyof NotificationPreferences; label: string; desc: string }[] = [
  { key: 'newStories', label: 'New Stories', desc: 'Get notified about new stories' },
  { key: 'gameUpdates', label: 'Game Updates', desc: 'Updates about your favorite games' },
  { key: 'challenges', label: 'Challenges', desc: 'Daily and weekly challenge reminders' },
  { key: 'achievements', label: 'Achievements', desc: 'When you earn new badges' },
];

const profileVisibilityOptions: ProfileVisibility[] = ['Everyone', 'Friends Only', 'Only Me'];
const storySharingOptions: StorySharing[] = ['Everyone', 'My School', 'Nobody'];

function nextOption<T>(options: T[], current: T): T {
  const index = options.indexOf(current);
  return options[(index + 1) % options.length];
}

const faqItems = [
  {
    question: 'How do I earn XP and badges?',
    answer: 'Read stories, finish games, and complete daily challenges to earn XP. Badges unlock automatically once you hit the milestone shown in your Profile.',
  },
  {
    question: 'Can my parent see my activity?',
    answer: 'Yes. A parent can switch to Parent View from the Profile tab to see reading progress and manage subscription and privacy settings.',
  },
  {
    question: 'How do I change my school or grade?',
    answer: 'Go to Settings > Account Settings, update your school or grade, then tap Save Changes.',
  },
  {
    question: 'Is my data shared with anyone?',
    answer: 'No ads or tracking. You control what is shared under Settings > Privacy & Safety.',
  },
];

type HelpForm = { open: boolean; subject: string; message: string };
const closedForm: HelpForm = { open: false, subject: '', message: '' };

export function Settings({ initialSection = 'main' }: { initialSection?: SettingsSection }) {
  const {
    profile,
    updateProfile,
    notificationPreferences,
    setNotificationPreference,
    privacyPreferences,
    updatePrivacyPreferences,
    submitSupportRequest,
  } = useApp();

  const [activeSection, setActiveSection] = useState<SettingsSection>(initialSection);
  const [renderedProfile, setRenderedProfile] = useState(profile);
  const [fullName, setFullName] = useState(profile.fullName);
  const [school, setSchool] = useState(profile.school);
  const [grade, setGrade] = useState(profile.grade);
  const [savedMessage, setSavedMessage] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [helpForm, setHelpForm] = useState<HelpForm>(closedForm);
  const [sending, setSending] = useState(false);

  // Profile loads asynchronously from storage after mount; adjust the local
  // editable fields during render (per React's "adjusting state" guidance)
  // rather than in an effect, once the loaded value differs from what we last saw.
  if (profile !== renderedProfile) {
    setRenderedProfile(profile);
    setFullName(profile.fullName);
    setSchool(profile.school);
    setGrade(profile.grade);
  }

  const currentTitle = activeSection === 'main' ? 'Settings' : sections.find((s) => s.id === activeSection)?.label;

  const handleSaveAccount = async () => {
    await updateProfile({ fullName, school, grade });
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 2000);
  };

  const openHelpForm = (subject: string) => setHelpForm({ open: true, subject, message: '' });

  const handleSendHelpForm = async () => {
    if (!helpForm.message.trim()) {
      showAlert('Add a message', 'Please describe your issue before sending.');
      return;
    }
    setSending(true);
    await submitSupportRequest(helpForm.subject, helpForm.message.trim());
    setSending(false);
    setHelpForm(closedForm);
    showAlert('Message sent', 'Thanks! Our team will get back to you soon.');
  };

  return (
    <View className="flex-1 bg-white">
      <View className="px-4 py-4 border-b border-gray-200 flex-row items-center justify-between">
        {activeSection !== 'main' ? (
          <TouchableOpacity onPress={() => setActiveSection('main')} className="p-2">
            <ChevronLeft size={24} color="#000000" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => goBack('/(tabs)/home')} className="p-2">
            <X size={24} color="#000000" />
          </TouchableOpacity>
        )}
        <Text className="text-lg font-bold">{currentTitle}</Text>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1">
        {activeSection === 'main' && (
          <View className="p-4">
            <View className="gap-2">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <TouchableOpacity
                    key={section.id}
                    onPress={() => setActiveSection(section.id)}
                    className="flex-row items-center justify-between p-4 bg-white rounded-xl border border-gray-200"
                  >
                    <View className="flex-row items-center gap-3">
                      <Icon size={20} color={section.color} />
                      <Text className="font-semibold">{section.label}</Text>
                    </View>
                    <ChevronLeft size={20} color="#9CA3AF" style={{ transform: [{ rotate: '180deg' }] }} />
                  </TouchableOpacity>
                );
              })}
            </View>

            <View className="mt-6 p-4 bg-gray-50 rounded-2xl flex-row gap-3">
              <Info size={20} color="#4B5563" />
              <View>
                <Text className="text-sm mb-1 font-semibold">App Version</Text>
                <Text className="text-xs text-gray-600">TrustFolioKids v1.0.0</Text>
              </View>
            </View>
          </View>
        )}

        {activeSection === 'account' && (
          <View className="p-4 gap-4">
            <View className="bg-white border border-gray-200 rounded-2xl p-4">
              <Text className="text-sm mb-2 font-semibold">Full Name</Text>
              <TextInput value={fullName} onChangeText={setFullName} className="w-full p-3 border border-gray-200 rounded-xl" />
            </View>

            <View className="bg-white border border-gray-200 rounded-2xl p-4">
              <Text className="text-sm mb-2 font-semibold">School</Text>
              <TextInput value={school} onChangeText={setSchool} className="w-full p-3 border border-gray-200 rounded-xl" />
            </View>

            <View className="bg-white border border-gray-200 rounded-2xl p-4">
              <Text className="text-sm mb-2 font-semibold">Grade</Text>
              <View className="flex-row gap-2">
                {grades.map((g) => (
                  <TouchableOpacity
                    key={g}
                    onPress={() => setGrade(g)}
                    style={{ backgroundColor: grade === g ? Brand.blue : '#F3F4F6' }}
                    className="px-3 py-2 rounded-lg"
                  >
                    <Text style={{ color: grade === g ? '#FFFFFF' : '#374151' }} className="text-sm font-semibold">
                      {g}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity onPress={handleSaveAccount} style={{ backgroundColor: Brand.blue }} className="rounded-xl py-4 items-center">
              <Text className="text-white font-semibold">{savedMessage ? 'Saved ✓' : 'Save Changes'}</Text>
            </TouchableOpacity>
          </View>
        )}

        {activeSection === 'notifications' && (
          <View className="p-4 gap-3">
            {notificationItems.map((item) => (
              <View key={item.key} className="bg-white border border-gray-200 rounded-2xl p-4 flex-row items-center justify-between">
                <View className="flex-1 pr-3">
                  <Text className="text-sm font-semibold">{item.label}</Text>
                  <Text className="text-xs text-gray-600">{item.desc}</Text>
                </View>
                <Switch
                  value={notificationPreferences[item.key]}
                  onValueChange={(value) => setNotificationPreference(item.key, value)}
                  trackColor={{ true: Brand.blue, false: '#D1D5DB' }}
                />
              </View>
            ))}
          </View>
        )}

        {activeSection === 'privacy' && (
          <View className="p-4 gap-4">
            <View style={{ backgroundColor: '#EFF6FF', borderColor: '#BFDBFE' }} className="border rounded-2xl p-4 flex-row gap-3">
              <Shield size={24} color={Brand.blue} />
              <View className="flex-1">
                <Text className="text-sm mb-2 font-bold">Your Privacy Matters</Text>
                <Text className="text-xs text-gray-700 mb-3">
                  TrustFolioKids is committed to protecting children&apos;s privacy and safety online.
                </Text>
                <View className="gap-1">
                  {['COPPA compliant', 'No ads or tracking', 'Parent-controlled settings', 'Moderated content'].map((line) => (
                    <Text key={line} className="text-xs text-gray-700">
                      ✓ {line}
                    </Text>
                  ))}
                </View>
              </View>
            </View>

            <View className="gap-3">
              <TouchableOpacity
                onPress={() =>
                  updatePrivacyPreferences({
                    profileVisibility: nextOption(profileVisibilityOptions, privacyPreferences.profileVisibility),
                  })
                }
                className="bg-white border border-gray-200 rounded-2xl p-4 flex-row items-center justify-between"
              >
                <View className="flex-1 pr-3">
                  <Text className="text-sm font-semibold">Profile Visibility</Text>
                  <Text className="text-xs text-gray-600">Who can see your profile</Text>
                </View>
                <View style={{ backgroundColor: Brand.blueLightFill }} className="rounded-full px-3 py-1">
                  <Text style={{ color: Brand.blue }} className="text-xs font-semibold">
                    {privacyPreferences.profileVisibility}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  updatePrivacyPreferences({ storySharing: nextOption(storySharingOptions, privacyPreferences.storySharing) })
                }
                className="bg-white border border-gray-200 rounded-2xl p-4 flex-row items-center justify-between"
              >
                <View className="flex-1 pr-3">
                  <Text className="text-sm font-semibold">Story Sharing</Text>
                  <Text className="text-xs text-gray-600">Who can read your stories</Text>
                </View>
                <View style={{ backgroundColor: Brand.blueLightFill }} className="rounded-full px-3 py-1">
                  <Text style={{ color: Brand.blue }} className="text-xs font-semibold">
                    {privacyPreferences.storySharing}
                  </Text>
                </View>
              </TouchableOpacity>

              <View className="bg-white border border-gray-200 rounded-2xl p-4 flex-row items-center justify-between">
                <View className="flex-1 pr-3">
                  <Text className="text-sm font-semibold">Data Collection</Text>
                  <Text className="text-xs text-gray-600">Manage your data preferences</Text>
                </View>
                <Switch
                  value={privacyPreferences.dataCollection}
                  onValueChange={(value) => updatePrivacyPreferences({ dataCollection: value })}
                  trackColor={{ true: Brand.blue, false: '#D1D5DB' }}
                />
              </View>
            </View>
          </View>
        )}

        {activeSection === 'help' && (
          <View className="p-4 gap-4">
            <View style={{ backgroundColor: '#FFF7ED', borderColor: '#FED7AA' }} className="border rounded-2xl p-4">
              <Text className="text-sm mb-2 font-bold">Need Help?</Text>
              <Text className="text-xs text-gray-700 mb-3">Our support team is here to help you with any questions or issues.</Text>
              <TouchableOpacity
                onPress={() => openHelpForm('Contact Support')}
                style={{ backgroundColor: Brand.orange }}
                className="rounded-xl px-4 py-2 self-start"
              >
                <Text className="text-white text-sm font-semibold">Contact Support</Text>
              </TouchableOpacity>
            </View>

            {helpForm.open && (
              <View className="bg-white border border-gray-200 rounded-2xl p-4 gap-3">
                <Text className="text-sm font-semibold">{helpForm.subject}</Text>
                <TextInput
                  value={helpForm.message}
                  onChangeText={(message) => setHelpForm((prev) => ({ ...prev, message }))}
                  placeholder="Describe your question or issue..."
                  multiline
                  numberOfLines={4}
                  className="w-full p-3 border border-gray-200 rounded-xl"
                  style={{ minHeight: 90, textAlignVertical: 'top' }}
                />
                <View className="flex-row gap-2">
                  <TouchableOpacity
                    onPress={() => setHelpForm(closedForm)}
                    className="flex-1 rounded-xl py-3 items-center bg-gray-100"
                  >
                    <Text className="text-sm font-semibold text-gray-700">Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleSendHelpForm}
                    disabled={sending}
                    style={{ backgroundColor: Brand.orange, opacity: sending ? 0.6 : 1 }}
                    className="flex-1 rounded-xl py-3 items-center"
                  >
                    <Text className="text-white text-sm font-semibold">{sending ? 'Sending…' : 'Send'}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            <View className="gap-2">
              <Text className="text-sm font-bold px-1">Frequently Asked Questions</Text>
              {faqItems.map((item, index) => {
                const expanded = expandedFaq === index;
                return (
                  <TouchableOpacity
                    key={item.question}
                    onPress={() => setExpandedFaq(expanded ? null : index)}
                    className="bg-white border border-gray-200 rounded-2xl p-4"
                  >
                    <View className="flex-row items-center justify-between">
                      <Text className="flex-1 pr-3 text-sm font-semibold">{item.question}</Text>
                      <ChevronDown
                        size={18}
                        color="#9CA3AF"
                        style={{ transform: [{ rotate: expanded ? '180deg' : '0deg' }] }}
                      />
                    </View>
                    {expanded && <Text className="text-xs text-gray-600 mt-2">{item.answer}</Text>}
                  </TouchableOpacity>
                );
              })}
            </View>

            <View className="gap-3">
              <TouchableOpacity
                onPress={() =>
                  showAlert('User Guide', 'A step-by-step guide is coming soon. In the meantime, check the FAQ above.')
                }
                className="bg-white border border-gray-200 rounded-2xl p-4 flex-row items-center justify-between"
              >
                <View className="flex-row items-center gap-3">
                  <Text className="text-2xl">📖</Text>
                  <Text className="font-semibold">User Guide</Text>
                </View>
                <ChevronLeft size={20} color="#9CA3AF" style={{ transform: [{ rotate: '180deg' }] }} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => showAlert('Video Tutorials', 'Video tutorials are coming soon.')}
                className="bg-white border border-gray-200 rounded-2xl p-4 flex-row items-center justify-between"
              >
                <View className="flex-row items-center gap-3">
                  <Text className="text-2xl">🎥</Text>
                  <Text className="font-semibold">Video Tutorials</Text>
                </View>
                <ChevronLeft size={20} color="#9CA3AF" style={{ transform: [{ rotate: '180deg' }] }} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => openHelpForm('Bug Report')}
                className="bg-white border border-gray-200 rounded-2xl p-4 flex-row items-center justify-between"
              >
                <View className="flex-row items-center gap-3">
                  <Text className="text-2xl">🐛</Text>
                  <Text className="font-semibold">Report a Problem</Text>
                </View>
                <ChevronLeft size={20} color="#9CA3AF" style={{ transform: [{ rotate: '180deg' }] }} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
