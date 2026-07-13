'use client';

import { useRouter } from 'next/navigation';
import { Box, IconButton, Typography } from '@mui/material';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
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
  const handleDownload = (certificate: CertificateManagementItem) => {
    if (!certificate.imageUrl) return;
    window.open(certificate.imageUrl, '_blank', 'noopener,noreferrer');
  };
  const handleSignBatch = () => console.log('TODO: assinar em lote');
  const handleSendBatch = () => console.log('TODO: encaminhar certificados');
  const handleLoadMore = () => loadMore();
  const handleBack = () => router.back();

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
      {/* Header padronizado */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <IconButton
          onClick={handleBack}
          aria-label="Voltar"
          size="small"
          sx={{ color: 'text.secondary', '&:hover': { bgcolor: 'action.hover' } }}
        >
          <ArrowBackRoundedIcon />
        </IconButton>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, minWidth: 0 }}>
          <Box sx={{ width: 4, height: 22, borderRadius: 4, bgcolor: '#2EC4A0', flexShrink: 0 }} />
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, color: 'text.primary', lineHeight: 1.2 }}>
              Certificados{' '}
              <Box component="span" sx={{ color: '#2EC4A0' }}>Gerados</Box>
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '1.5fr 1fr' },
          gap: 2,
          alignItems: 'stretch',
        }}
      >
        <CertificateStatsRow stats={roleStats} />
        <CertificateSummaryCard totalIssued={totalIssued} statusTotals={statusTotals} />
      </Box>

      <CertificateBatchActions onSignBatch={handleSignBatch} onSendBatch={handleSendBatch} />

      {/* Painel de filtros e busca */}
      <ContentCard sx={{ gap: 1.5 }}>
        <CertificateFilterTabs activeTab={roleTab} onChange={setRoleTab} />
        <Searchbar
          value={search}
          onChange={setSearch}
          placeholder="Buscar participante"
          sx={{ mt: 0 }}
        />
        <CertificateFilters
          activityDraft={activityDraft}
          statusDraft={statusDraft}
          activityOptions={activityOptions}
          statusOptions={statusOptions}
          onActivityChange={setActivityDraft}
          onStatusChange={setStatusDraft}
          onApply={applyFilters}
        />
      </ContentCard>

      <CertificateListHeader
        count={filteredCertificates.length}
        sortOrder={sortOrder}
        onToggleSort={toggleSortOrder}
      />

      {filteredCertificates.length === 0 ? (
        <ContentCard sx={{ py: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 6, gap: 1.5 }}>
            <Box
              sx={{
                width: 72, height: 72, borderRadius: '20px', bgcolor: '#F1F5F9',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <ArticleOutlinedIcon sx={{ fontSize: 34, color: '#94A3B8' }} />
            </Box>
            <Typography sx={{ fontWeight: 700, fontSize: 15, color: '#0F1D35' }}>
              Nenhum certificado gerado ainda
            </Typography>
            <Typography sx={{ fontSize: 13, color: '#64748B', textAlign: 'center', maxWidth: 280 }}>
              Os certificados aparecerão aqui após serem gerados para os participantes do evento.
            </Typography>
          </Box>
        </ContentCard>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
          {filteredCertificates.map((certificate) => (
            <CertificateManagementCard
              key={certificate.id}
              certificate={certificate}
              onView={handleView}
              onDownload={handleDownload}
            />
          ))}
        </Box>
      )}

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
