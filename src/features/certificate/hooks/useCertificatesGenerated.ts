'use client';

import { useEffect, useMemo, useState } from 'react';
import { certificateService } from '@/services/certificate.service';
import type { CertificateManagementItem, CertificateManagementRole } from '@/types/certificate-management';
import {
  ACTIVITY_FILTER_OPTIONS,
  STATUS_FILTER_OPTIONS,
  countCertificatesByStatus,
  filterCertificates,
  sortCertificatesByParticipantName,
  type CertificateRoleTab,
  type SortOrder,
} from '../utils/certificateFilters';

const ROLE_LABEL: Record<CertificateManagementRole, string> = {
  Ouvinte:     'Ouvintes',
  Monitor:     'Monitores',
  Organizador: 'Organizadores',
  Palestrante: 'Palestrantes',
};

export function useCertificatesGenerated(eventoId: number) {
  const [certificates, setCertificates] = useState<CertificateManagementItem[]>([]);
  const [isLoading, setIsLoading]       = useState(false);
  const [isError, setIsError]           = useState(false);
  const [page, setPage]   = useState(1);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const [roleTab, setRoleTab]                     = useState<CertificateRoleTab>('Todos');
  const [search, setSearch]                       = useState('');
  const [activityDraft, setActivityDraft]         = useState('Todas');
  const [statusDraft, setStatusDraft]             = useState('Todos');
  const [activityApplied, setActivityApplied]     = useState('Todas');
  const [statusApplied, setStatusApplied]         = useState('Todos');
  const [sortOrder, setSortOrder]                 = useState<SortOrder>('asc');

  useEffect(() => {
    if (!eventoId) return;

    // na primeira página limpa a lista, nas demais acumula
    if (page === 1) {
      setIsLoading(true);
      setIsError(false);
    }

    certificateService
      .getCertificatesByEvent(eventoId, page)
      .then(({ items, total }) => {
        setCertificates(prev => page === 1 ? items : [...prev, ...items]);
        setTotal(total);
        setHasMore(certificates.length + items.length < total); // ← calcula se tem mais
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [eventoId, page]);

  const loadMore = () => setPage(prev => prev + 1);

  const roleStats = useMemo(() => {
    const roles: CertificateManagementRole[] = ['Ouvinte', 'Monitor', 'Organizador', 'Palestrante'];
    return roles.map(role => ({
      role,
      label: ROLE_LABEL[role],
      value: certificates.filter(c => c.role === role).length,
    }));
  }, [certificates]);

  const filteredCertificates = useMemo(() => {
    const filtered = filterCertificates({
      certificates,
      roleTab,
      search,
      activityFilter: activityApplied,
      statusFilter:   statusApplied,
    });
    return sortCertificatesByParticipantName(filtered, sortOrder);
  }, [certificates, roleTab, search, activityApplied, statusApplied, sortOrder]);

  const statusTotals = useMemo(
    () => countCertificatesByStatus(certificates),
    [certificates],
  );

  const totalIssued = certificates.length;

  const applyFilters = () => {
    setActivityApplied(activityDraft);
    setStatusApplied(statusDraft);
  };

  const toggleSortOrder = () =>
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));

  return {
    filteredCertificates,
    roleStats,
    statusTotals,
    totalIssued,
    isLoading,
    isError,
    roleTab,
    setRoleTab,
    search,
    setSearch,
    activityDraft,
    setActivityDraft,
    statusDraft,
    setStatusDraft,
    applyFilters,
    activityOptions: ACTIVITY_FILTER_OPTIONS,
    statusOptions:   STATUS_FILTER_OPTIONS,
    sortOrder,
    toggleSortOrder,
    hasMore,
    loadMore,
  };
}