import { api } from './api';
import { Event } from '../types/event';

export interface CreateEventPayload {
  nome: string;
  codigo?: string;
  descricao: string;
  localizacao: string;
  responsavel: string;
  cargaHoraria: number;
  dataInicio: string;
  dataFim: string;
  status: 'pendente' | 'iniciada' | 'andamento' | 'finalizada';
  foto?: string;
}

export type UpdateEventPayload = Partial<CreateEventPayload>;
export type TipoParticipante = 'participante' | 'monitor' | 'organizador';

interface EventResponse {
  message: string;
  data: Event;
}

interface EventsResponse {
  message: string;
  data: Event[];
}

class EventService {
  async create(payload: CreateEventPayload): Promise<Event> {
    const { data } = await api.post<EventResponse>('/event', payload);
    return data.data;
  }

  async findAll(): Promise<Event[]> {
    const { data } = await api.get<EventsResponse>('/event');
    return data.data;
  }

  async findOne(id: number): Promise<Event> {
    const { data } = await api.get<EventResponse>(`/event/${id}`);
    return data.data;
  }

  async update(id: number, payload: UpdateEventPayload): Promise<Event> {
    const { data } = await api.patch<EventResponse>(`/event/${id}`, payload);
    return data.data;
  }

  async remove(id: number): Promise<Event> {
    const { data } = await api.delete<EventResponse>(`/event/${id}`);
    return data.data;
  }

  async finalize(id: number): Promise<Event> {
    const { data } = await api.patch<EventResponse>(`/event/${id}/finalizar`);
    return data.data;
  }

  async findByCodigo(codigo: string): Promise<Event> {
    const { data } = await api.get<EventResponse>(`/event/codigo/${codigo}`);
    return data.data;
  }

  //Traz todos os eventos pelo tipo de participante dele (participante, monitor ou organizador)
  //Ex: tipo = 'participante' => traz todos os eventos que o usuário participa
  async findParticipatingEvents(tipo?: TipoParticipante): Promise<Event[]> {
    const { data } = await api.get<EventsResponse>('/event/participating', {
      params: tipo ? { tipo } : undefined,
    });
    return data.data;
  }


}

export const eventService = new EventService();

