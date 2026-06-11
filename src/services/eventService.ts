import { api } from './api';
import { IEvent } from '../types/event';

interface EventResponse {
  statusCode: number;
  message: string;
  data: IEvent;
}

class EventService {
  async findByCodigo(codigo: string): Promise<IEvent> {
    const { data } = await api.get<EventResponse>(`/event/codigo/${codigo}`);
    return data.data;
  }
}

export const eventService = new EventService();
