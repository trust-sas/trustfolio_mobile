export const familyName = 'Famille Koné';

export interface Child {
  id: string;
  firstName: string;
  avatarEmoji: string;
  age: number;
  grade: string;
  school: string;
  storiesCount: number;
  royaltiesFcfa: number;
}

export const children: Child[] = [
  {
    id: 'amina',
    firstName: 'Amina',
    avatarEmoji: '👧',
    age: 9,
    grade: 'CM1',
    school: 'École Primaire de Cocody',
    storiesCount: 2,
    royaltiesFcfa: 600,
  },
  {
    id: 'kofi',
    firstName: 'Kofi',
    avatarEmoji: '👦',
    age: 7,
    grade: 'CE2',
    school: 'École Primaire de Cocody',
    storiesCount: 1,
    royaltiesFcfa: 300,
  },
];

export type FamilyStoryStatus = 'publie' | 'en_traitement' | 'a_verifier';

export interface FamilyStory {
  id: string;
  title: string;
  childId: string;
  date: string;
  category: string;
  status: FamilyStoryStatus;
}

export const familyStories: FamilyStory[] = [
  { id: 'fs-1', title: 'Le Lion Courageux', childId: 'amina', date: '12 juil.', category: 'Courage', status: 'publie' },
  { id: 'fs-2', title: 'La Forêt Magique', childId: 'amina', date: '2 août', category: 'Environnement', status: 'en_traitement' },
  { id: 'fs-3', title: "L'Étoile du Village", childId: 'kofi', date: '10 août', category: 'Leadership', status: 'a_verifier' },
];

export interface FamilySubscription {
  plan: string;
  priceFcfa: number;
  renewalDate: string;
}

export const familySubscription: FamilySubscription = {
  plan: 'Premium Famille',
  priceFcfa: 25000,
  renewalDate: '15 sept.',
};

export type WalletTransactionType = 'royalty' | 'retrait';

export interface WalletTransaction {
  id: string;
  type: WalletTransactionType;
  label: string;
  channel?: 'orange' | 'mtn';
  childId: string;
  date: string;
  amountFcfa: number;
  paid: boolean;
}

export const walletTransactions: WalletTransaction[] = [
  { id: 'tx-1', type: 'royalty', label: 'Le Lion Courageux', childId: 'amina', date: '15 août', amountFcfa: 300, paid: true },
  { id: 'tx-2', type: 'royalty', label: 'La Forêt Magique', childId: 'amina', date: '2 août', amountFcfa: 300, paid: true },
  { id: 'tx-3', type: 'royalty', label: "L'Étoile du Village", childId: 'kofi', date: '28 juil.', amountFcfa: 300, paid: true },
];

export function childById(childId: string): Child | undefined {
  return children.find((c) => c.id === childId);
}
