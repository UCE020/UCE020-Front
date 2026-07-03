// services/certificate.service.ts
import { api } from './api';
import type { CertificateManagementItem } from '@/types/certificate-management';

class CertificateService {
  async getCertificatesByEvent(
    eventoId: number,
    page = 1,
    limit = 20,       
  ): Promise<CertificateManagementItem[]> {
    const { data } = await api.get<CertificateManagementItem[]>(
      `/event/${eventoId}/certificate`,
      { params: { page, limit } },
    );
    return data;
  }
}

export const certificateService = new CertificateService();