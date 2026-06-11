export interface IEvent {
  id: number;
  nome: string;
  codigo: string;
  descricao: string;
  localizacao: string;
  responsavel: string;
  cargaHoraria: number;
  dataInicio: string;
  dataFim: string;
  status: string;
  foto: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface EventCardProps {
  event: IEvent;
  onClick?: (event: IEvent) => void;
}