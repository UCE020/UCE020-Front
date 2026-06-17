const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api';

const ACTIVITY_ID_MAP: Record<string, number> = {
  a1: 1,
  a2: 2,
  a3: 3,
};

type RegistrationResponse = {
  success: boolean;
  data: {
    activityId: number;
    userId: number;
    participationId: number;
  };
};

type ApiErrorResponse = {
  error?: string;
};

class RegistrationService {
  private normalizeActivityId(activityId: string | number): number {
    if (typeof activityId === 'number') {
      return activityId;
    }

    const mappedId = ACTIVITY_ID_MAP[activityId];
    if (mappedId) {
      return mappedId;
    }

    const normalized = Number(activityId);

    if (Number.isNaN(normalized)) {
      throw new Error(`Atividade mock sem mapeamento para o banco: ${activityId}`);
    }

    return normalized;
  }

  private normalizeParticipantId(participantId: string | number): number {
    const normalized = Number(participantId);

    if (Number.isNaN(normalized)) {
      throw new Error(
        `Usuário mock inválido para integração com o banco: ${participantId}`,
      );
    }

    return normalized;
  }

  async register(
    _eventId: string,
    activityId: string,
    participantId: string,
  ): Promise<RegistrationResponse> {
    const normalizedActivityId = this.normalizeActivityId(activityId);
    const normalizedParticipantId = this.normalizeParticipantId(participantId);

    const response = await fetch(
      `${API_BASE_URL}/v1/activity/${normalizedActivityId}/subscribe`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: normalizedParticipantId,
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      const errorData = data as ApiErrorResponse;
      throw new Error(errorData.error || 'Erro ao realizar inscrição');
    }

    return data as RegistrationResponse;
  }

  async unregister(
    _eventId: string,
    activityId: string,
    participantId: string,
  ): Promise<RegistrationResponse> {
    const normalizedActivityId = this.normalizeActivityId(activityId);
    const normalizedParticipantId = this.normalizeParticipantId(participantId);

    const response = await fetch(
      `${API_BASE_URL}/v1/activity/${normalizedActivityId}/unsubscribe/${normalizedParticipantId}`,
      {
        method: 'DELETE',
      },
    );

    const data = await response.json();

    if (!response.ok) {
      const errorData = data as ApiErrorResponse;
      throw new Error(errorData.error || 'Erro ao cancelar inscrição');
    }

    return data as RegistrationResponse;
  }

  canRegister(isRegistered: boolean): boolean {
    return !isRegistered;
  }

  canUnregister(isRegistered: boolean): boolean {
    return isRegistered;
  }
}

export const registrationService = new RegistrationService();