import { useState } from 'react';
import { MOCK_USERS_AVAILABLE } from './user';
import type { AppUser } from '@/types/user';

const DEFAULT_USER = MOCK_USERS_AVAILABLE.participant;

function getDefaultMockUser(): AppUser {
  if (typeof window === 'undefined') {
    return DEFAULT_USER;
  }

  try {
    const userKey = localStorage.getItem('mock-current-user');
    if (userKey && MOCK_USERS_AVAILABLE[userKey]) {
      return MOCK_USERS_AVAILABLE[userKey];
    }
  } catch {
  }

  return DEFAULT_USER;
}

export function useMockUser(): AppUser {
  const [user] = useState<AppUser>(getDefaultMockUser);
  return user;
}
