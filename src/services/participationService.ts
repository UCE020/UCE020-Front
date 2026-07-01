import { api } from './api';

interface ParticipationResponse {
  message: string;
}

class ParticipationService {
  async subscribe(eventoId: number): Promise<ParticipationResponse> {
    const { data } = await api.post<ParticipationResponse>(
      `/event/${eventoId}/subscription`,
    );
    return data;
  }

  async unsubscribe(eventoId: number): Promise<ParticipationResponse> {
    const { data } = await api.delete<ParticipationResponse>(
      `/event/${eventoId}/subscription`,
    );
    return data;
  }
}

export const participationService = new ParticipationService();