'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { eventService, UpdateEventPayload } from '@/services/eventService';
import { Event } from '@/types/event';

export function useEditEvent(eventId: number | null) {
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);
  const [loadingEvent, setLoadingEvent] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (eventId === null) return;
    let cancelled = false;

    async function loadEvent() {
      if (!cancelled) {
        setLoadError(null);
        setLoadingEvent(true);
      }

      try {
        const data = await eventService.findOne(eventId);

        if (!cancelled) setEvent(data);
      } catch {
        if (!cancelled) {
          setLoadError('Não foi possível carregar os dados do evento.');
        }
      } finally {
        if (!cancelled) {
          setLoadingEvent(false);
        }
      }
    }

    void loadEvent();

    return () => {
      cancelled = true;
    };
  }, [eventId]);

  async function handleUpdate(payload: UpdateEventPayload) {
    if (eventId === null) return;
    setLoading(true);
    setError(null);
    try {
      await eventService.update(eventId, payload);
      router.push(`/event/${eventId}`);
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string | string[] } } };
      const raw = axiosErr.response?.data?.message;
      const message = Array.isArray(raw)
        ? raw.join(', ')
        : raw ?? (err instanceof Error ? err.message : 'Erro ao atualizar evento. Tente novamente.');
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return { event, loadingEvent, loadError, handleUpdate, loading, error };
}
