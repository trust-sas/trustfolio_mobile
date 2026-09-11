import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { ACTIVE_ROLE_KEY, Role } from '@/constants/roles';
import {
  Child,
  familyName as defaultFamilyName,
  FamilyStory,
  FamilySubscription,
  familySubscription as defaultFamilySubscription,
  WalletTransaction,
} from '@/data/family';
import { familyRepository } from '@/data/familyRepository';
import { Anthology, TeacherStory } from '@/data/teacher';
import { teacherRepository } from '@/data/teacherRepository';
import { FocalTask, School } from '@/data/pointFocal';
import { pointFocalRepository } from '@/data/pointFocalRepository';
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
  activeRole: Role;
  setActiveRole: (role: Role) => Promise<void>;

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

  familyName: string;
  familySubscription: FamilySubscription;

  familyChildren: Child[];
  addChild: (child: Omit<Child, 'id' | 'storiesCount' | 'royaltiesFcfa'>) => Promise<void>;

  familyStories: FamilyStory[];
  addFamilyStory: (story: Omit<FamilyStory, 'id'>) => Promise<void>;

  walletTransactions: WalletTransaction[];
  withdrawFcfa: (childId: string, amountFcfa: number, channel: 'orange' | 'mtn') => Promise<void>;

  teacherStories: TeacherStory[];
  addTeacherStory: (story: Omit<TeacherStory, 'id'>) => Promise<void>;

  anthologies: Anthology[];
  createAnthology: (title: string, storyIds: string[], classIds: string[]) => Promise<void>;

  schools: School[];
  saveSchoolReport: (schoolId: string, notes: string) => Promise<void>;

  focalTasks: FocalTask[];
  toggleFocalTask: (taskId: string) => Promise<void>;
  addFocalTask: (task: Omit<FocalTask, 'id' | 'done'>) => Promise<void>;

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
  const [activeRole, setActiveRoleState] = useState<Role>('enfant');
  const [likedStories, setLikedStories] = useState<Set<string>>(new Set());
  const [favoritedStories, setFavoritedStories] = useState<Set<string>>(new Set());

  const [profile, setProfile] = useState<UserProfileData>(defaultProfile);
  const [notificationPreferences, setNotificationPreferences] = useState<NotificationPreferences>(
    defaultNotificationPreferences
  );
  const [privacyPreferences, setPrivacyPreferences] = useState<PrivacyPreferences>(defaultPrivacyPreferences);
  const [parentModeEnabled, setParentModeEnabledState] = useState(false);
  const [familyName, setFamilyName] = useState<string>(defaultFamilyName);
  const [familySubscription, setFamilySubscription] = useState<FamilySubscription>(defaultFamilySubscription);
  const [familyChildren, setFamilyChildren] = useState<Child[]>([]);
  const [familyStories, setFamilyStories] = useState<FamilyStory[]>([]);
  const [walletTransactions, setWalletTransactions] = useState<WalletTransaction[]>([]);
  const [teacherStories, setTeacherStories] = useState<TeacherStory[]>([]);
  const [anthologies, setAnthologies] = useState<Anthology[]>([]);
  const [schools, setSchools] = useState<School[]>([]);
  const [focalTasks, setFocalTasks] = useState<FocalTask[]>([]);

  useEffect(() => {
    loadIdSet(LIKED_KEY).then(setLikedStories);
    loadIdSet(FAVORITED_KEY).then(setFavoritedStories);
    userRepository.getProfile().then(setProfile);
    userRepository.getNotificationPreferences().then(setNotificationPreferences);
    userRepository.getPrivacyPreferences().then(setPrivacyPreferences);
    userRepository.getParentModeEnabled().then(setParentModeEnabledState);
    AsyncStorage.getItem(ACTIVE_ROLE_KEY).then((stored) => {
      if (stored) setActiveRoleState(stored as Role);
    });
    familyRepository.getFamilyName().then(setFamilyName);
    familyRepository.getFamilySubscription().then(setFamilySubscription);
    familyRepository.getChildren().then(setFamilyChildren);
    familyRepository.getFamilyStories().then(setFamilyStories);
    familyRepository.getWalletTransactions().then(setWalletTransactions);
    teacherRepository.getTeacherStories().then(setTeacherStories);
    teacherRepository.getAnthologies().then(setAnthologies);
    pointFocalRepository.getSchools().then(setSchools);
    pointFocalRepository.getFocalTasks().then(setFocalTasks);
  }, []);

  const setActiveRole = async (role: Role) => {
    setActiveRoleState(role);
    await AsyncStorage.setItem(ACTIVE_ROLE_KEY, role);
  };

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

  const addChild = async (input: Omit<Child, 'id' | 'storiesCount' | 'royaltiesFcfa'>) => {
    const newChild: Child = { ...input, id: `child-${Date.now()}`, storiesCount: 0, royaltiesFcfa: 0 };
    const next = [...familyChildren, newChild];
    setFamilyChildren(next);
    await familyRepository.saveChildren(next);
  };

  const addFamilyStory = async (input: Omit<FamilyStory, 'id'>) => {
    const newStory: FamilyStory = { ...input, id: `fs-${Date.now()}` };
    const nextStories = [newStory, ...familyStories];
    setFamilyStories(nextStories);
    await familyRepository.saveFamilyStories(nextStories);

    if (newStory.status === 'publie') {
      const nextChildren = familyChildren.map((c) =>
        c.id === newStory.childId ? { ...c, storiesCount: c.storiesCount + 1, royaltiesFcfa: c.royaltiesFcfa + 300 } : c
      );
      setFamilyChildren(nextChildren);
      await familyRepository.saveChildren(nextChildren);

      const newTransaction: WalletTransaction = {
        id: `tx-${Date.now()}`,
        type: 'royalty',
        label: newStory.title,
        childId: newStory.childId,
        date: newStory.date,
        amountFcfa: 300,
        paid: true,
      };
      const nextTransactions = [newTransaction, ...walletTransactions];
      setWalletTransactions(nextTransactions);
      await familyRepository.saveWalletTransactions(nextTransactions);
    }
  };

  const withdrawFcfa = async (childId: string, amountFcfa: number, channel: 'orange' | 'mtn') => {
    const child = familyChildren.find((c) => c.id === childId);
    if (!child || amountFcfa <= 0 || amountFcfa > child.royaltiesFcfa) return;

    const nextChildren = familyChildren.map((c) =>
      c.id === childId ? { ...c, royaltiesFcfa: c.royaltiesFcfa - amountFcfa } : c
    );
    setFamilyChildren(nextChildren);
    await familyRepository.saveChildren(nextChildren);

    const newTransaction: WalletTransaction = {
      id: `tx-${Date.now()}`,
      type: 'retrait',
      label: channel === 'orange' ? 'Retrait — Orange Money' : 'Retrait — MTN Mobile Money',
      channel,
      childId,
      date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }),
      amountFcfa,
      paid: true,
    };
    const nextTransactions = [newTransaction, ...walletTransactions];
    setWalletTransactions(nextTransactions);
    await familyRepository.saveWalletTransactions(nextTransactions);
  };

  const addTeacherStory = async (input: Omit<TeacherStory, 'id'>) => {
    const newStory: TeacherStory = { ...input, id: `ts-${Date.now()}` };
    const next = [newStory, ...teacherStories];
    setTeacherStories(next);
    await teacherRepository.saveTeacherStories(next);
  };

  const createAnthology = async (title: string, storyIds: string[], classIds: string[]) => {
    const newAnthology: Anthology = { id: `an-${Date.now()}`, title, storyIds, classIds, status: 'brouillon' };
    const next = [newAnthology, ...anthologies];
    setAnthologies(next);
    await teacherRepository.saveAnthologies(next);
  };

  const saveSchoolReport = async (schoolId: string, notes: string) => {
    const next = schools.map((s) => (s.id === schoolId ? { ...s, reportNotes: notes } : s));
    setSchools(next);
    await pointFocalRepository.saveSchools(next);
  };

  const toggleFocalTask = async (taskId: string) => {
    const next = focalTasks.map((t) => (t.id === taskId ? { ...t, done: !t.done } : t));
    setFocalTasks(next);
    await pointFocalRepository.saveFocalTasks(next);
  };

  const addFocalTask = async (input: Omit<FocalTask, 'id' | 'done'>) => {
    const newTask: FocalTask = { ...input, id: `ft-${Date.now()}`, done: false };
    const next = [newTask, ...focalTasks];
    setFocalTasks(next);
    await pointFocalRepository.saveFocalTasks(next);
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
        activeRole,
        setActiveRole,
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
        familyName,
        familySubscription,
        familyChildren,
        addChild,
        familyStories,
        addFamilyStory,
        walletTransactions,
        withdrawFcfa,
        teacherStories,
        addTeacherStory,
        anthologies,
        createAnthology,
        schools,
        saveSchoolReport,
        focalTasks,
        toggleFocalTask,
        addFocalTask,
        submitSupportRequest,
        logOut,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
