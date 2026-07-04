import { AppPageContainer } from '@/components/layout/AppPageContainer';
import { CertificatesGeneratedView } from '@/features/certificate';

export default function CertificadosGeradosPage({ params }: { params: { eventoID: number } }) {
  return (
    <AppPageContainer>
      <CertificatesGeneratedView eventoId={params.eventoID} />
    </AppPageContainer>
  );
}
