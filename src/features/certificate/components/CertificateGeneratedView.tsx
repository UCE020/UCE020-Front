'use client';

import { useRouter } from 'next/navigation';
import { Box, Divider, Typography } from '@mui/material';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Searchbar } from '@/components/ui/Searchbar';
import { Button } from '@/components/ui/Button';
import { ContentCard } from '@/components/layout/ContentCard';
import { CertificateManagementCard } from '@/components/certificate/CertificateManagementCard';
import type { CertificateManagementItem } from '@/types/certificate-management';
import { useCertificatesGenerated } from '../hooks/useCertificatesGenerated';
import { CertificateStatsRow } from './CertificateStatsRow';
import { CertificateSummaryCard } from './CertificateSummaryCard';
import { CertificateBatchActions } from './CertificateBatchActions';
import { CertificateFilterTabs } from './CertificateFilterTabs';
import { CertificateFilters } from './CertificateFilters';
import { CertificateListHeader } from './CertificateListHeader';

interface CertificatesGeneratedViewProps {
  eventoId: number;
}

export function CertificatesGeneratedView({eventoId}: CertificatesGeneratedViewProps) {
  const router = useRouter();
  const {
    filteredCertificates,
    roleStats,
    statusTotals,
    totalIssued,
    roleTab,
    setRoleTab,
    search,
    setSearch,
    activityDraft,
    setActivityDraft,
    statusDraft,
    setStatusDraft,
    applyFilters,
    activityOptions,
    statusOptions,
    sortOrder,
    toggleSortOrder,
    isLoading,
    isError,
    loadMore,
    hasMore,
  } = useCertificatesGenerated(eventoId);

  const handleView = (certificate: CertificateManagementItem) =>
    router.push(`/certificate/${certificate.id}`);
  const handleEdit = (certificate: CertificateManagementItem) =>
    router.push(`/certificate/edit?id=${certificate.id}`);
  const handleDownload = (certificate: CertificateManagementItem) =>
    console.log('TODO: baixar certificado', certificate.id);
  const handleDelete = (certificate: CertificateManagementItem) =>
    console.log('TODO: excluir certificado', certificate.id);
  const handleSignBatch = () => console.log('TODO: assinar em lote');
  const handleSendBatch = () => console.log('TODO: encaminhar certificados');
  const handleLoadMore = () => loadMore();

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <Typography sx={{ color: '#64748B', fontSize: 14 }}>
          Carregando certificados...
        </Typography>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <Typography sx={{ color: '#EF4444', fontSize: 14 }}>
          Não foi possível carregar os certificados. Tente novamente.
        </Typography>
      </Box>
    );
  }

  return (
    <>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography
            sx={{ fontWeight: 700, fontSize: { xs: '1.3rem', sm: '1.5rem' }, color: '#0F1D35' }}
          >
            Certificados{' '}
            <Box component="span" sx={{ color: '#2EC4A0' }}>Gerados</Box>
          </Typography>
          <Typography sx={{ fontSize: 12, color: '#64748B', mt: 0.5, maxWidth: 280, lineHeight: 1.5 }}>
            Visualize e gerencie os certificados gerados para o seu evento.
          </Typography>
        </Box>
        <Box
          sx={{
            width: 90, height: 90, bgcolor: '#E8F5F2', borderRadius: '12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1.5px dashed #2EC4A0',
          }}
        >
          <ArticleOutlinedIcon sx={{ fontSize: 40, color: '#2EC4A0' }} />
        </Box>
      </Box>

      <CertificateStatsRow stats={roleStats} />
      <CertificateSummaryCard totalIssued={totalIssued} statusTotals={statusTotals} />

      <CertificateBatchActions onSignBatch={handleSignBatch} onSendBatch={handleSendBatch} />
      <CertificateFilterTabs activeTab={roleTab} onChange={setRoleTab} />
      <Searchbar value={search} onChange={setSearch} placeholder="Buscar participante" />
      <CertificateFilters
        activityDraft={activityDraft}
        statusDraft={statusDraft}
        activityOptions={activityOptions}
        statusOptions={statusOptions}
        onActivityChange={setActivityDraft}
        onStatusChange={setStatusDraft}
        onApply={applyFilters}
      />
      <CertificateListHeader
        count={filteredCertificates.length}
        sortOrder={sortOrder}
        onToggleSort={toggleSortOrder}
      />

      <ContentCard sx={{ px: 2, py: filteredCertificates.length === 0 ? 4 : 0 }}>
        {filteredCertificates.length === 0 ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 6, gap: 1.5 }}>
            <ArticleOutlinedIcon sx={{ fontSize: 48, color: '#CBD5E1' }} />
            <Typography sx={{ fontWeight: 600, fontSize: 15, color: '#0F1D35' }}>
              Nenhum certificado gerado ainda
            </Typography>
            <Typography sx={{ fontSize: 13, color: '#64748B', textAlign: 'center', maxWidth: 280 }}>
              Os certificados aparecerão aqui após serem gerados para os participantes do evento.
            </Typography>
          </Box>
        ) : (
          filteredCertificates.map((certificate, index) => (
            <Box key={certificate.id}>
              <CertificateManagementCard
                certificate={certificate}
                onView={handleView}
                onEdit={handleEdit}
                onDownload={handleDownload}
                onDelete={handleDelete}
              />
              {index < filteredCertificates.length - 1 && (
                <Divider sx={{ borderColor: '#F1F5F9' }} />
              )}
            </Box>
          ))
        )}
      </ContentCard>

      {hasMore && (
        <Button
          variant="outlined"
          fullWidth
          leftIcon={<RefreshIcon sx={{ fontSize: 18 }} />}
          onClick={loadMore}
          sx={{
            borderColor: '#E2E8F0', color: '#2EC4A0',
            '&:hover': { borderColor: '#2EC4A0', bgcolor: 'transparent' },
          }}
        >
          Carregar mais
        </Button>
      )}
    </>
  );
}
