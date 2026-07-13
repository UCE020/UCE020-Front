// services/certificate.service.ts
import { AxiosError } from 'axios';
import { api } from './api';
import type {
  CertificateManagementItem,
  CertificatePageResponse,
  CertificateRoleStat,
} from '@/types/certificate-management';

interface CertificateListResponse {
  message?: string;
  data: CertificateManagementItem[];
}

interface CertificateResponse {
  message?: string;
  data: CertificateManagementItem;
}

interface CertificateStatsResponse {
  message?: string;
  data: CertificateRoleStat[];
}

// O backend ainda não tem um fluxo de assinatura — todo certificado real vem
// como "Pendente de assinatura" até esse fluxo existir de fato.
const DEFAULT_STATUS = 'Pendente' as const;

class CertificateService {
  async getCertificatesByEvent(
    eventoId: number,
    page = 1,
    limit = 20,
  ): Promise<CertificatePageResponse> {
    try {
      const { data } = await api.get<CertificateListResponse>(
        `/event/${eventoId}/certificate`,
        { params: { page, limit } },
      );
      const items = data.data.map((item) => ({ ...item, status: DEFAULT_STATUS }));
      return { items, hasMore: items.length === limit };
    } catch (error) {
      // O backend responde 404 quando o evento ainda não tem nenhum certificado —
      // isso é um resultado vazio válido, não uma falha de carregamento.
      if (error instanceof AxiosError && error.response?.status === 404) {
        return { items: [], hasMore: false };
      }
      throw error;
    }
  }

  async getCertificateById(id: string): Promise<CertificateManagementItem> {
    const { data } = await api.get<CertificateResponse>(`/certificate/${id}`);
    return { ...data.data, status: DEFAULT_STATUS };
  }

  async getCertificateStatsByEvent(eventoId: number): Promise<CertificateRoleStat[]> {
    const { data } = await api.get<CertificateStatsResponse>(
      `/event/${eventoId}/certificate/stats`,
    );
    return data.data;
  }

  // Emite os certificados de participante/monitor/organizador do evento (evento precisa
  // estar finalizado). Pula quem já tem certificado — seguro chamar mais de uma vez.
  async generateParticipantCertificates(eventoId: number): Promise<void> {
    await api.post(`/event/${eventoId}/certificate/participants`);
  }

  // Emite os certificados dos convidados (palestrante/ministrante/moderador) de uma
  // atividade (atividade precisa estar finalizada). Também seguro chamar mais de uma vez.
  async generateGuestCertificates(atividadeId: number | string): Promise<void> {
    await api.post(`/activity/${atividadeId}/certificate/guests`);
  }
}

export const certificateService = new CertificateService();
