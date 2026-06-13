import type { AppUser } from '@/types/user';

export const MOCK_USERS_AVAILABLE: Record<string, AppUser> = {
  participant: {
    id: 'p1',
    name: 'Tiago Abreu Participante',
    role: 'participant',
  },
  monitor: {
    id: 'monitor-001',
    name: 'Joãozinho Monitor',
    role: 'monitor',
  },
  organizer: {
    id: 'organizer-001',
    name: 'Mariazinha Organizadora',
    role: 'organizer',
  },
};

export const MOCK_USER: AppUser = MOCK_USERS_AVAILABLE.participant;

export function setCurrentMockUser(userKey: keyof typeof MOCK_USERS_AVAILABLE) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('mock-current-user', userKey);
    window.location.reload();
  }
}

