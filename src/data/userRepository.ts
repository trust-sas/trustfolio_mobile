import AsyncStorage from '@react-native-async-storage/async-storage';

export const ONBOARDED_KEY = 'tfk:hasOnboarded';

const PROFILE_KEY = 'tfk:profile';
const NOTIFICATIONS_KEY = 'tfk:notificationPreferences';
const PRIVACY_KEY = 'tfk:privacyPreferences';
const PARENT_MODE_KEY = 'tfk:parentModeEnabled';
const SUPPORT_REQUESTS_KEY = 'tfk:supportRequests';

export interface UserProfileData {
  fullName: string;
  school: string;
  grade: string;
}

export interface NotificationPreferences {
  newStories: boolean;
  gameUpdates: boolean;
  challenges: boolean;
  achievements: boolean;
}

export type ProfileVisibility = 'Everyone' | 'Friends Only' | 'Only Me';
export type StorySharing = 'Everyone' | 'My School' | 'Nobody';

export interface PrivacyPreferences {
  profileVisibility: ProfileVisibility;
  storySharing: StorySharing;
  dataCollection: boolean;
}

export interface SupportRequest {
  subject: string;
  message: string;
  submittedAt: string;
}

export const defaultProfile: UserProfileData = {
  fullName: 'Amina K.',
  school: 'Lagos Primary School',
  grade: 'Grade 5',
};

export const defaultNotificationPreferences: NotificationPreferences = {
  newStories: true,
  gameUpdates: true,
  challenges: true,
  achievements: true,
};

export const defaultPrivacyPreferences: PrivacyPreferences = {
  profileVisibility: 'Friends Only',
  storySharing: 'My School',
  dataCollection: true,
};

/**
 * Abstraction over where user/account data lives. AsyncStorageUserRepository
 * below is the only implementation today; a future API-backed implementation
 * can satisfy this same interface without changing any screen or context.
 */
export interface UserRepository {
  getProfile(): Promise<UserProfileData>;
  saveProfile(profile: UserProfileData): Promise<void>;
  getNotificationPreferences(): Promise<NotificationPreferences>;
  saveNotificationPreferences(prefs: NotificationPreferences): Promise<void>;
  getPrivacyPreferences(): Promise<PrivacyPreferences>;
  savePrivacyPreferences(prefs: PrivacyPreferences): Promise<void>;
  getParentModeEnabled(): Promise<boolean>;
  setParentModeEnabled(enabled: boolean): Promise<void>;
  submitSupportRequest(request: SupportRequest): Promise<void>;
  clearSession(): Promise<void>;
}

async function readJson<T>(key: string, fallback: T): Promise<T> {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    if (typeof fallback === 'object' && fallback !== null && !Array.isArray(fallback)) {
      return { ...fallback, ...parsed };
    }
    return parsed as T;
  } catch {
    return fallback;
  }
}

async function writeJson(key: string, value: unknown): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch {
    // best-effort persistence, mirrors the rest of the app's AsyncStorage usage
  }
}

class AsyncStorageUserRepository implements UserRepository {
  getProfile() {
    return readJson(PROFILE_KEY, defaultProfile);
  }

  saveProfile(profile: UserProfileData) {
    return writeJson(PROFILE_KEY, profile);
  }

  getNotificationPreferences() {
    return readJson(NOTIFICATIONS_KEY, defaultNotificationPreferences);
  }

  saveNotificationPreferences(prefs: NotificationPreferences) {
    return writeJson(NOTIFICATIONS_KEY, prefs);
  }

  getPrivacyPreferences() {
    return readJson(PRIVACY_KEY, defaultPrivacyPreferences);
  }

  savePrivacyPreferences(prefs: PrivacyPreferences) {
    return writeJson(PRIVACY_KEY, prefs);
  }

  getParentModeEnabled() {
    return readJson(PARENT_MODE_KEY, false);
  }

  setParentModeEnabled(enabled: boolean) {
    return writeJson(PARENT_MODE_KEY, enabled);
  }

  async submitSupportRequest(request: SupportRequest) {
    const existing = await readJson<SupportRequest[]>(SUPPORT_REQUESTS_KEY, []);
    await writeJson(SUPPORT_REQUESTS_KEY, [...existing, request]);
  }

  async clearSession() {
    try {
      await AsyncStorage.removeItem(ONBOARDED_KEY);
    } catch {
      // ignore
    }
  }
}

export const userRepository: UserRepository = new AsyncStorageUserRepository();
