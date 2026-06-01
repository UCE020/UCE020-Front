import { MOCK_PARTICIPANTS } from '@/mocks/participants';
import type { Participant, PresenceStatus } from '@/types/participant';

const STORAGE_KEY = 'assinae-mock-participants';

export function loadParticipants(): Participant[] {
  if (typeof window === 'undefined') return MOCK_PARTICIPANTS;

  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (!stored) return MOCK_PARTICIPANTS;
    return JSON.parse(stored) as Participant[];
  } catch {
    return MOCK_PARTICIPANTS;
  }
}

export function saveParticipants(participants: Participant[]) {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(participants));
}

export function updateParticipantStatus(participantId: string, presenceStatus: PresenceStatus) {
  const participants = loadParticipants().map((participant) =>
    participant.id === participantId ? { ...participant, presenceStatus } : participant,
  );
  saveParticipants(participants);
  return participants;
}
