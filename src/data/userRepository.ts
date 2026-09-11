import AsyncStorage from '@react-native-async-storage/async-storage';

import { apiClient, isApiConfigured } from '@/data/apiClient';
import { readJson, writeJson } from '@/data/storage';

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
  school: 'École Primaire de Cocody',
  grade: 'CM1',
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

/**
 * REST contract this implementation expects from the backend (see
 * .env.example / EXPO_PUBLIC_API_BASE_URL):
 *   GET  /user/profile                     -> UserProfileData
 *   PUT  /user/profile                     <- UserProfileData
 *   GET  /user/notification-preferences    -> NotificationPreferences
 *   PUT  /user/notification-preferences    <- NotificationPreferences
 *   GET  /user/privacy-preferences         -> PrivacyPreferences
 *   PUT  /user/privacy-preferences         <- PrivacyPreferences
 *   GET  /user/parent-mode                 -> boolean
 *   PUT  /user/parent-mode                 <- boolean
 *   POST /user/support-requests            <- SupportRequest
 *   POST /user/logout                      (best-effort; the "has onboarded"
 *                                            flag itself always stays local —
 *                                            it describes this device, not
 *                                            backend-owned account data)
 */
class ApiUserRepository implements UserRepository {
  getProfile() {
    return apiClient.get<UserProfileData>('/user/profile');
  }

  saveProfile(profile: UserProfileData) {
    return apiClient.put<void>('/user/profile', profile);
  }

  getNotificationPreferences() {
    return apiClient.get<NotificationPreferences>('/user/notification-preferences');
  }

  saveNotificationPreferences(prefs: NotificationPreferences) {
    return apiClient.put<void>('/user/notification-preferences', prefs);
  }

  getPrivacyPreferences() {
    return apiClient.get<PrivacyPreferences>('/user/privacy-preferences');
  }

  savePrivacyPreferences(prefs: PrivacyPreferences) {
    return apiClient.put<void>('/user/privacy-preferences', prefs);
  }

  getParentModeEnabled() {
    return apiClient.get<boolean>('/user/parent-mode');
  }

  setParentModeEnabled(enabled: boolean) {
    return apiClient.put<void>('/user/parent-mode', enabled);
  }

  submitSupportRequest(request: SupportRequest) {
    return apiClient.post<void>('/user/support-requests', request);
  }

  async clearSession() {
    try {
      await apiClient.post<void>('/user/logout');
    } catch {
      // best-effort — still clear the local onboarding flag below
    }
    try {
      await AsyncStorage.removeItem(ONBOARDED_KEY);
    } catch {
      // ignore
    }
  }
}

export const userRepository: UserRepository = isApiConfigured
  ? new ApiUserRepository()
  : new AsyncStorageUserRepository();
