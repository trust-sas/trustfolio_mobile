import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import {
  defaultNotificationPreferences,
  defaultPrivacyPreferences,
  defaultProfile,
  NotificationPreferences,
  PrivacyPreferences,
  SupportRequest,
  userRepository,
  UserProfileData,
} from '@/data/userRepository';

const LIKED_KEY = 'tfk:likedStories';
const FAVORITED_KEY = 'tfk:favoritedStories';

interface AppContextType {
  likedStories: Set<string>;
  toggleLike: (storyId: string) => void;
  favoritedStories: Set<string>;
  toggleFavorite: (storyId: string) => void;

  profile: UserProfileData;
  updateProfile: (profile: UserProfileData) => Promise<void>;

  notificationPreferences: NotificationPreferences;
  setNotificationPreference: (key: keyof NotificationPreferences, value: boolean) => void;

  privacyPreferences: PrivacyPreferences;
  updatePrivacyPreferences: (prefs: Partial<PrivacyPreferences>) => void;

  parentModeEnabled: boolean;
  setParentModeEnabled: (enabled: boolean) => void;

  submitSupportRequest: (subject: string, message: string) => Promise<void>;
  logOut: () => Promise<void>;
}

const AppContext = createContext<AppContextType | null>(null);

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}

async function loadIdSet(key: string): Promise<Set<string>> {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [likedStories, setLikedStories] = useState<Set<string>>(new Set());
  const [favoritedStories, setFavoritedStories] = useState<Set<string>>(new Set());

  const [profile, setProfile] = useState<UserProfileData>(defaultProfile);
  const [notificationPreferences, setNotificationPreferences] = useState<NotificationPreferences>(
    defaultNotificationPreferences
  );
  const [privacyPreferences, setPrivacyPreferences] = useState<PrivacyPreferences>(defaultPrivacyPreferences);
  const [parentModeEnabled, setParentModeEnabledState] = useState(false);

  useEffect(() => {
    loadIdSet(LIKED_KEY).then(setLikedStories);
    loadIdSet(FAVORITED_KEY).then(setFavoritedStories);
    userRepository.getProfile().then(setProfile);
    userRepository.getNotificationPreferences().then(setNotificationPreferences);
    userRepository.getPrivacyPreferences().then(setPrivacyPreferences);
    userRepository.getParentModeEnabled().then(setParentModeEnabledState);
  }, []);

  const toggleLike = (storyId: string) => {
    const next = new Set(likedStories);
    if (next.has(storyId)) next.delete(storyId);
    else next.add(storyId);
    setLikedStories(next);
    AsyncStorage.setItem(LIKED_KEY, JSON.stringify([...next])).catch(() => {});
  };

  const toggleFavorite = (storyId: string) => {
    const next = new Set(favoritedStories);
    if (next.has(storyId)) next.delete(storyId);
    else next.add(storyId);
    setFavoritedStories(next);
    AsyncStorage.setItem(FAVORITED_KEY, JSON.stringify([...next])).catch(() => {});
  };

  const updateProfile = async (next: UserProfileData) => {
    setProfile(next);
    await userRepository.saveProfile(next);
  };

  const setNotificationPreference = (key: keyof NotificationPreferences, value: boolean) => {
    const next = { ...notificationPreferences, [key]: value };
    setNotificationPreferences(next);
    userRepository.saveNotificationPreferences(next).catch(() => {});
  };

  const updatePrivacyPreferences = (partial: Partial<PrivacyPreferences>) => {
    const next = { ...privacyPreferences, ...partial };
    setPrivacyPreferences(next);
    userRepository.savePrivacyPreferences(next).catch(() => {});
  };

  const setParentModeEnabled = (enabled: boolean) => {
    setParentModeEnabledState(enabled);
    userRepository.setParentModeEnabled(enabled).catch(() => {});
  };

  const submitSupportRequest = async (subject: string, message: string) => {
    const request: SupportRequest = { subject, message, submittedAt: new Date().toISOString() };
    await userRepository.submitSupportRequest(request);
  };

  const logOut = async () => {
    await userRepository.clearSession();
    setProfile(defaultProfile);
    setNotificationPreferences(defaultNotificationPreferences);
    setPrivacyPreferences(defaultPrivacyPreferences);
    setParentModeEnabledState(false);
  };

  return (
    <AppContext.Provider
      value={{
        likedStories,
        toggleLike,
        favoritedStories,
        toggleFavorite,
        profile,
        updateProfile,
        notificationPreferences,
        setNotificationPreference,
        privacyPreferences,
        updatePrivacyPreferences,
        parentModeEnabled,
        setParentModeEnabled,
        submitSupportRequest,
        logOut,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
