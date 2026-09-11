import { useLocalSearchParams } from 'expo-router';

import { Settings, SettingsSection } from '@/components/screens/Settings';

const deepLinkableSections: SettingsSection[] = ['account', 'notifications', 'privacy', 'help'];

export default function SettingsRoute() {
  const { section } = useLocalSearchParams<{ section?: string }>();
  const initialSection = deepLinkableSections.includes(section as SettingsSection)
    ? (section as SettingsSection)
    : undefined;

  return <Settings initialSection={initialSection} />;
}
