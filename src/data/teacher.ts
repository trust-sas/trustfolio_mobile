export const teacherName = 'M. Koffi';

export interface Student {
  id: string;
  firstName: string;
  storiesCount: number;
}

export const students: Student[] = [
  { id: 'st-amina', firstName: 'Amina', storiesCount: 2 },
  { id: 'st-kofi', firstName: 'Kofi', storiesCount: 1 },
  { id: 'st-fatou', firstName: 'Fatou', storiesCount: 1 },
  { id: 'st-ibrahim', firstName: 'Ibrahim', storiesCount: 0 },
];

export interface TeacherClass {
  id: string;
  name: string;
  school: string;
  studentIds: string[];
}

export const teacherClasses: TeacherClass[] = [
  { id: 'cl-cm1a', name: 'CM1 A', school: 'École Primaire de Cocody', studentIds: ['st-amina', 'st-kofi'] },
  { id: 'cl-ce2b', name: 'CE2 B', school: 'École Primaire de Cocody', studentIds: ['st-fatou', 'st-ibrahim'] },
];

export type TeacherStoryStatus = 'publie' | 'en_traitement' | 'a_verifier';

export interface TeacherStory {
  id: string;
  title: string;
  studentId: string;
  classId: string;
  date: string;
  category: string;
  status: TeacherStoryStatus;
}

export const teacherStories: TeacherStory[] = [
  {
    id: 'ts-1',
    title: 'Le Lion Courageux',
    studentId: 'st-amina',
    classId: 'cl-cm1a',
    date: '12 juil.',
    category: 'Courage',
    status: 'publie',
  },
  {
    id: 'ts-2',
    title: "L'Étoile du Village",
    studentId: 'st-kofi',
    classId: 'cl-cm1a',
    date: '10 août',
    category: 'Leadership',
    status: 'a_verifier',
  },
  {
    id: 'ts-3',
    title: 'Le Marché de Grand-mère',
    studentId: 'st-fatou',
    classId: 'cl-ce2b',
    date: '20 août',
    category: 'Famille',
    status: 'publie',
  },
  {
    id: 'ts-4',
    title: 'La Pluie Bienfaitrice',
    studentId: 'st-ibrahim',
    classId: 'cl-ce2b',
    date: '1 sept.',
    category: 'Culture',
    status: 'en_traitement',
  },
];

export type AnthologyStatus = 'publie' | 'brouillon';

export interface Anthology {
  id: string;
  title: string;
  classIds: string[];
  storyIds: string[];
  status: AnthologyStatus;
}

export const anthologies: Anthology[] = [
  { id: 'an-1', title: 'Recueil CM1 A — Trimestre 1', classIds: ['cl-cm1a'], storyIds: ['ts-1'], status: 'publie' },
];

export const teacherReferralFcfa = 500;
export const referredSubscribedParents = 3;

export function studentById(id: string): Student | undefined {
  return students.find((s) => s.id === id);
}

export function classById(id: string): TeacherClass | undefined {
  return teacherClasses.find((c) => c.id === id);
}
