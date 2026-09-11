import { apiClient, isApiConfigured } from '@/data/apiClient';
import { readJson, writeJson } from '@/data/storage';
import {
  Child,
  children as defaultChildren,
  familyName as defaultFamilyName,
  FamilyStory,
  familyStories as defaultFamilyStories,
  FamilySubscription,
  familySubscription as defaultFamilySubscription,
  WalletTransaction,
  walletTransactions as defaultWalletTransactions,
} from '@/data/family';

const CHILDREN_KEY = 'tfk:familyChildren';
const STORIES_KEY = 'tfk:familyStories';
const WALLET_TRANSACTIONS_KEY = 'tfk:walletTransactions';

/**
 * Abstraction over where Parent-space data (family identity, children, family
 * stories, wallet ledger) lives. AsyncStorageFamilyRepository below is the only
 * implementation today; a future API-backed implementation can satisfy this
 * same interface without changing AppContext or any Parent screen.
 */
export interface FamilyRepository {
  getFamilyName(): Promise<string>;
  getFamilySubscription(): Promise<FamilySubscription>;
  getChildren(): Promise<Child[]>;
  saveChildren(children: Child[]): Promise<void>;
  getFamilyStories(): Promise<FamilyStory[]>;
  saveFamilyStories(stories: FamilyStory[]): Promise<void>;
  getWalletTransactions(): Promise<WalletTransaction[]>;
  saveWalletTransactions(transactions: WalletTransaction[]): Promise<void>;
}

class AsyncStorageFamilyRepository implements FamilyRepository {
  async getFamilyName() {
    return defaultFamilyName;
  }

  async getFamilySubscription() {
    return defaultFamilySubscription;
  }

  getChildren() {
    return readJson(CHILDREN_KEY, defaultChildren);
  }

  saveChildren(children: Child[]) {
    return writeJson(CHILDREN_KEY, children);
  }

  getFamilyStories() {
    return readJson(STORIES_KEY, defaultFamilyStories);
  }

  saveFamilyStories(stories: FamilyStory[]) {
    return writeJson(STORIES_KEY, stories);
  }

  getWalletTransactions() {
    return readJson(WALLET_TRANSACTIONS_KEY, defaultWalletTransactions);
  }

  saveWalletTransactions(transactions: WalletTransaction[]) {
    return writeJson(WALLET_TRANSACTIONS_KEY, transactions);
  }
}

/**
 * REST contract this implementation expects from the backend (see
 * .env.example / EXPO_PUBLIC_API_BASE_URL):
 *   GET  /family/name                 -> string
 *   GET  /family/subscription         -> FamilySubscription
 *   GET  /family/children             -> Child[]
 *   PUT  /family/children             <- Child[]  (replaces the whole list)
 *   GET  /family/stories              -> FamilyStory[]
 *   PUT  /family/stories              <- FamilyStory[]
 *   GET  /family/wallet-transactions  -> WalletTransaction[]
 *   PUT  /family/wallet-transactions  <- WalletTransaction[]
 */
class ApiFamilyRepository implements FamilyRepository {
  getFamilyName() {
    return apiClient.get<string>('/family/name');
  }

  getFamilySubscription() {
    return apiClient.get<FamilySubscription>('/family/subscription');
  }

  getChildren() {
    return apiClient.get<Child[]>('/family/children');
  }

  saveChildren(children: Child[]) {
    return apiClient.put<void>('/family/children', children);
  }

  getFamilyStories() {
    return apiClient.get<FamilyStory[]>('/family/stories');
  }

  saveFamilyStories(stories: FamilyStory[]) {
    return apiClient.put<void>('/family/stories', stories);
  }

  getWalletTransactions() {
    return apiClient.get<WalletTransaction[]>('/family/wallet-transactions');
  }

  saveWalletTransactions(transactions: WalletTransaction[]) {
    return apiClient.put<void>('/family/wallet-transactions', transactions);
  }
}

export const familyRepository: FamilyRepository = isApiConfigured
  ? new ApiFamilyRepository()
  : new AsyncStorageFamilyRepository();
