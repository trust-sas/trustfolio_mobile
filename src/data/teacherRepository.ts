import { apiClient, isApiConfigured } from '@/data/apiClient';
import { readJson, writeJson } from '@/data/storage';
import { Anthology, anthologies as defaultAnthologies, TeacherStory, teacherStories as defaultTeacherStories } from '@/data/teacher';

const STORIES_KEY = 'tfk:teacherStories';
const ANTHOLOGIES_KEY = 'tfk:anthologies';

/**
 * Abstraction over where Enseignant-space data (class stories, anthologies)
 * lives. AsyncStorageTeacherRepository below is the only implementation today;
 * a future API-backed implementation can satisfy this same interface without
 * changing AppContext or any Enseignant screen.
 */
export interface TeacherRepository {
  getTeacherStories(): Promise<TeacherStory[]>;
  saveTeacherStories(stories: TeacherStory[]): Promise<void>;
  getAnthologies(): Promise<Anthology[]>;
  saveAnthologies(anthologies: Anthology[]): Promise<void>;
}

class AsyncStorageTeacherRepository implements TeacherRepository {
  getTeacherStories() {
    return readJson(STORIES_KEY, defaultTeacherStories);
  }

  saveTeacherStories(stories: TeacherStory[]) {
    return writeJson(STORIES_KEY, stories);
  }

  getAnthologies() {
    return readJson(ANTHOLOGIES_KEY, defaultAnthologies);
  }

  saveAnthologies(anthologies: Anthology[]) {
    return writeJson(ANTHOLOGIES_KEY, anthologies);
  }
}

/**
 * REST contract this implementation expects from the backend (see
 * .env.example / EXPO_PUBLIC_API_BASE_URL):
 *   GET  /teacher/stories      -> TeacherStory[]
 *   PUT  /teacher/stories      <- TeacherStory[]  (replaces the whole list)
 *   GET  /teacher/anthologies  -> Anthology[]
 *   PUT  /teacher/anthologies  <- Anthology[]
 */
class ApiTeacherRepository implements TeacherRepository {
  getTeacherStories() {
    return apiClient.get<TeacherStory[]>('/teacher/stories');
  }

  saveTeacherStories(stories: TeacherStory[]) {
    return apiClient.put<void>('/teacher/stories', stories);
  }

  getAnthologies() {
    return apiClient.get<Anthology[]>('/teacher/anthologies');
  }

  saveAnthologies(anthologies: Anthology[]) {
    return apiClient.put<void>('/teacher/anthologies', anthologies);
  }
}

export const teacherRepository: TeacherRepository = isApiConfigured
  ? new ApiTeacherRepository()
  : new AsyncStorageTeacherRepository();
