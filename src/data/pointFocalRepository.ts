import { apiClient, isApiConfigured } from '@/data/apiClient';
import { readJson, writeJson } from '@/data/storage';
import { FocalTask, focalTasks as defaultFocalTasks, School, schools as defaultSchools } from '@/data/pointFocal';

const SCHOOLS_KEY = 'tfk:schools';
const TASKS_KEY = 'tfk:focalTasks';

/**
 * Abstraction over where Point Focal-space data (schools pipeline, tasks)
 * lives. AsyncStoragePointFocalRepository below is the only implementation
 * today; a future API-backed implementation can satisfy this same interface
 * without changing AppContext or any Point Focal screen.
 */
export interface PointFocalRepository {
  getSchools(): Promise<School[]>;
  saveSchools(schools: School[]): Promise<void>;
  getFocalTasks(): Promise<FocalTask[]>;
  saveFocalTasks(tasks: FocalTask[]): Promise<void>;
}

class AsyncStoragePointFocalRepository implements PointFocalRepository {
  getSchools() {
    return readJson(SCHOOLS_KEY, defaultSchools);
  }

  saveSchools(schools: School[]) {
    return writeJson(SCHOOLS_KEY, schools);
  }

  getFocalTasks() {
    return readJson(TASKS_KEY, defaultFocalTasks);
  }

  saveFocalTasks(tasks: FocalTask[]) {
    return writeJson(TASKS_KEY, tasks);
  }
}

/**
 * REST contract this implementation expects from the backend (see
 * .env.example / EXPO_PUBLIC_API_BASE_URL):
 *   GET  /point-focal/schools  -> School[]
 *   PUT  /point-focal/schools  <- School[]  (replaces the whole list)
 *   GET  /point-focal/tasks    -> FocalTask[]
 *   PUT  /point-focal/tasks    <- FocalTask[]
 */
class ApiPointFocalRepository implements PointFocalRepository {
  getSchools() {
    return apiClient.get<School[]>('/point-focal/schools');
  }

  saveSchools(schools: School[]) {
    return apiClient.put<void>('/point-focal/schools', schools);
  }

  getFocalTasks() {
    return apiClient.get<FocalTask[]>('/point-focal/tasks');
  }

  saveFocalTasks(tasks: FocalTask[]) {
    return apiClient.put<void>('/point-focal/tasks', tasks);
  }
}

export const pointFocalRepository: PointFocalRepository = isApiConfigured
  ? new ApiPointFocalRepository()
  : new AsyncStoragePointFocalRepository();
