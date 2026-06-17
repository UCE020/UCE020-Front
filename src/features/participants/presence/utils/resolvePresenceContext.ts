import { MOCK_EVENTS } from '@/mocks/event';
import type { PresenceValidationContext } from '@/types/presence';

export function resolveEventName(eventId: string): string {
  const event = MOCK_EVENTS[eventId as keyof typeof MOCK_EVENTS];
  return event?.name ?? eventId;
}

// null se n tiver eventId/activityId ou invalidos
export function requirePresenceContext(
  eventId: string | null,
  activityId: string | null,
): PresenceValidationContext | null {
  if (!eventId || !activityId) return null;

  const event = MOCK_EVENTS[eventId as keyof typeof MOCK_EVENTS];
  if (!event) return null;

  const activity = event.activities.find((item) => item.id === activityId);
  if (!activity) return null;

  return {
    eventId,
    activityId,
    activityTitle: activity.title,
    eventName: event.name,
  };
}
