import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Thin JSON read/write helpers shared by every *Repository module. Centralizing
 * them here keeps each repository's AsyncStorage implementation identical, so
 * swapping one repository for an API-backed implementation later never touches
 * this file or any other repository.
 */
export async function readJson<T>(key: string, fallback: T): Promise<T> {
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

export async function writeJson(key: string, value: unknown): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch {
    // best-effort persistence, mirrors the rest of the app's AsyncStorage usage
  }
}
