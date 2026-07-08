import { AxiosError } from 'axios';
import { api } from './api';

type ApiErrorResponse = {
  error?: string;
  message?: string;
};

export type ActivityDetails = {
  id: number;
  nome: string;
  descricao: string;
  localizacao: string;
  dataInicio: string;
  dataFim: string;
  categoria: string;
  cargaHoraria: number;
  status: string;
  foto?: string | null;
  eventoId: number;
  isRegistered: boolean;
};

type ActivityDetailsApiResponse = {
  statusCode: number;
  data: {
    success: boolean;
    data: ActivityDetails;
  };
};

class ActivityService {
  async findOne(activityId: string | number): Promise<ActivityDetails> {
    const normalizedActivityId = Number(activityId);

    if (Number.isNaN(normalizedActivityId)) {
      throw new Error(`ID de atividade inválido: ${activityId}`);
    }

    try {
      const { data } = await api.get<ActivityDetailsApiResponse>(
        `/activity/${normalizedActivityId}`,
      );

      return data.data.data;
    } catch (error: unknown) {
      const errorData = (error as AxiosError<ApiErrorResponse>).response?.data;

      throw new Error(
        errorData?.error ||
          errorData?.message ||
          'Erro ao buscar detalhes da atividade',
      );
    }
  }
}

export const activityService = new ActivityService();