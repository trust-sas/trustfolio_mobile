export const pointFocalName = 'Traoré';
export const focalReferralFcfa = 200;

export type PipelineStage = 'identifie' | 'contact' | 'rendez_vous' | 'poc' | 'discussion' | 'partenaire' | 'deploye';

export const pipelineStages: { id: PipelineStage; label: string }[] = [
  { id: 'identifie', label: 'Identifié' },
  { id: 'contact', label: 'Contact' },
  { id: 'rendez_vous', label: 'Rendez-vous' },
  { id: 'poc', label: 'PoC' },
  { id: 'discussion', label: 'Discussion' },
  { id: 'partenaire', label: 'Partenaire' },
  { id: 'deploye', label: 'Déployé' },
];

export interface School {
  id: string;
  name: string;
  city: string;
  stage: PipelineStage;
  contactName: string;
  contactPhone: string;
  lastContactDate: string;
  nextActionLabel: string;
  nextActionDate: string;
  subscriptions: number;
  reportNotes: string;
}

export const schools: School[] = [
  {
    id: 'sc-1',
    name: 'École Primaire de Cocody',
    city: 'Abidjan',
    stage: 'partenaire',
    contactName: 'Mme Aya Koffi',
    contactPhone: '+225 07 12 34 56',
    lastContactDate: '2 sept.',
    nextActionLabel: 'Relancer pour signature de convention',
    nextActionDate: '15 sept.',
    subscriptions: 42,
    reportNotes: '',
  },
  {
    id: 'sc-2',
    name: 'Groupe Scolaire Les Cocotiers',
    city: 'Abidjan',
    stage: 'poc',
    contactName: 'M. Jean Bakayoko',
    contactPhone: '+225 05 98 76 54',
    lastContactDate: '28 août',
    nextActionLabel: 'Organiser une démonstration',
    nextActionDate: '10 sept.',
    subscriptions: 0,
    reportNotes: '',
  },
  {
    id: 'sc-3',
    name: 'École Sainte-Marie',
    city: 'Bouaké',
    stage: 'contact',
    contactName: 'Sœur Odile',
    contactPhone: '+225 01 22 33 44',
    lastContactDate: '20 août',
    nextActionLabel: 'Premier appel de qualification',
    nextActionDate: '12 sept.',
    subscriptions: 0,
    reportNotes: '',
  },
  {
    id: 'sc-4',
    name: 'École Primaire de Yopougon',
    city: 'Abidjan',
    stage: 'identifie',
    contactName: '—',
    contactPhone: '—',
    lastContactDate: '—',
    nextActionLabel: 'Identifier un contact',
    nextActionDate: '20 sept.',
    subscriptions: 0,
    reportNotes: '',
  },
  {
    id: 'sc-5',
    name: 'Complexe Scolaire Excellence',
    city: 'Yamoussoukro',
    stage: 'deploye',
    contactName: 'M. Kouadio',
    contactPhone: '+225 07 55 44 33',
    lastContactDate: '25 août',
    nextActionLabel: 'Suivi mensuel des abonnements',
    nextActionDate: '18 sept.',
    subscriptions: 68,
    reportNotes: '',
  },
];

export interface FocalTask {
  id: string;
  text: string;
  schoolId: string;
  date: string;
  done: boolean;
}

export const focalTasks: FocalTask[] = [
  { id: 'ft-1', text: 'Relancer pour signature de convention', schoolId: 'sc-1', date: '15 sept.', done: false },
  { id: 'ft-2', text: 'Organiser une démonstration', schoolId: 'sc-2', date: '10 sept.', done: false },
  { id: 'ft-3', text: 'Premier appel de qualification', schoolId: 'sc-3', date: '12 sept.', done: false },
  { id: 'ft-4', text: 'Envoyer la plaquette de présentation', schoolId: 'sc-4', date: '28 août', done: true },
];

export function schoolById(id: string): School | undefined {
  return schools.find((s) => s.id === id);
}

export function stageLabel(stage: PipelineStage): string {
  return pipelineStages.find((s) => s.id === stage)?.label ?? stage;
}
