import { api } from './api';
import { Event } from '../types/event';

interface EventResponse {
  statusCode: number;
  message: string;
  data: Event;
}

class EventService {
  async findByCodigo(codigo: string): Promise<Event> {
    const { data } = await api.get<EventResponse>(`/event/codigo/${codigo}`);
    return data.data;
  }
}

export const eventService = new EventService();
