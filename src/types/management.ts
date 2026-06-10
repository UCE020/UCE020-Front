export type StaffRole = 'Participante' | 'Monitor' | 'Organizador';

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
