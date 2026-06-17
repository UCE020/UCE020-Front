'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { eventService, CreateEventPayload } from '@/services/eventService';

export function useCreateEvent() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCreate(payload: CreateEventPayload) {
    setLoading(true);
    setError(null);
    try {
      await eventService.create(payload);
      router.push('/home');
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Erro ao criar evento. Tente novamente.';
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return { handleCreate, loading, error };
}
