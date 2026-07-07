export interface Event {
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
  totalInscritos?: number;
}

export interface EventCardProps {
  event: Event;
  onClick?: (event: Event) => void;
}