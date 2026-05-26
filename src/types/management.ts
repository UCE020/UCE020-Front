export type StaffRole = 'Organizador' | 'Monitor' | 'Palestrante';

export interface ManagedUser {
  id: string;
  name: string;
  role: StaffRole;
}

export interface ManagedGuest {
  id: string;
  name: string;
  role: string;
}
