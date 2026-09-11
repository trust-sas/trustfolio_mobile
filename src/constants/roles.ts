export type Role = 'enfant' | 'parent' | 'enseignant' | 'point_focal';

export interface RoleInfo {
  id: Role;
  label: string;
  emoji: string;
  homeHref: string;
}

export const roles: RoleInfo[] = [
  { id: 'enfant', label: 'Enfant', emoji: '🧒', homeHref: '/(tabs)/home' },
  { id: 'parent', label: 'Parent', emoji: '👨‍👩‍👧', homeHref: '/(parent)' },
  { id: 'enseignant', label: 'Enseignant', emoji: '🧑‍🏫', homeHref: '/(enseignant)' },
  { id: 'point_focal', label: 'Point Focal', emoji: '🌐', homeHref: '/(point-focal)' },
];

export const ACTIVE_ROLE_KEY = 'tfk:activeRole';

export function roleHomeHref(role: Role): string {
  return roles.find((r) => r.id === role)?.homeHref ?? '/(tabs)/home';
}
