export type CertificateManagementRole =
  | 'Ouvinte'
  | 'Monitor'
  | 'Organizador'
  | 'Palestrante'
  | 'Ministrante'
  | 'Moderador';
export type CertificateManagementStatus = 'Pendente' | 'Assinado' | 'Encaminhado';

export interface CertificateManagementItem {
  id: string;
  title: string;
  participantName: string;
  participantEmail: string;
  role: CertificateManagementRole;
  status: CertificateManagementStatus;
  hours?: number;
  issueDate: string;
  imageUrl?: string;
}

export interface CertificatePageResponse {
  items: CertificateManagementItem[];
  hasMore: boolean;
}

export interface CertificateRoleStat {
  role:  CertificateManagementRole;
  count: number;
}