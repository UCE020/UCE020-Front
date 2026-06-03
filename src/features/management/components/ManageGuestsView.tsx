'use client';

import { useState } from 'react';
import { ConfirmModal } from '@/components/modals/confirm-modal';
import { AppPageContainer } from '@/components/layout/AppPageContainer';
import { MOCK_GUESTS } from '@/mocks/guests';
import { getRemoveStaffMessage } from '@/features/participants/utils/presenceMessages';
import { filterBySearch } from '../utils/filterBySearch';
import { ManagementListCard } from './ManagementListCard';
import { StaffListRow } from './StaffListRow';
import type { ManagedGuest } from '@/types/management';

export function ManageGuestsView() {
  const [guests, setGuests] = useState<ManagedGuest[]>(MOCK_GUESTS);
  const [search, setSearch] = useState('');
  const [selectedGuest, setSelectedGuest] = useState<ManagedGuest | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const filteredGuests = filterBySearch(guests, search);

  function openDeleteModal(guestId: string) {
    const guest = guests.find((item) => item.id === guestId);
    if (!guest) return;
    setSelectedGuest(guest);
    setDeleteModalOpen(true);
  }

  function closeDeleteModal() {
    setDeleteModalOpen(false);
    setSelectedGuest(null);
  }

  async function handleDeleteGuest() {
    if (!selectedGuest) return;
    setGuests((current) => current.filter((item) => item.id !== selectedGuest.id));
    closeDeleteModal();
  }

  function handleEditGuest(guestId: string) {
    const guest = guests.find((item) => item.id === guestId);
    if (!guest) return;
    console.log(`Editar convidado: ${guest.name}`);
  }

  const deleteMessages = selectedGuest
    ? getRemoveStaffMessage(selectedGuest.name, 'o convidado')
    : { message: '', emphasisEndText: '' };

  return (
    <AppPageContainer>
      <ManagementListCard
        title="Gerenciar Convidados"
        search={search}
        onSearchChange={setSearch}
        searchAriaLabel="Buscar convidado"
        isEmpty={filteredGuests.length === 0}
        emptyMessage="Nenhum convidado encontrado"
      >
        {filteredGuests.map((guest) => (
          <StaffListRow
            key={guest.id}
            name={guest.name}
            role={guest.role}
            onEdit={() => handleEditGuest(guest.id)}
            onDelete={() => openDeleteModal(guest.id)}
          />
        ))}
      </ManagementListCard>

      <ConfirmModal
        open={deleteModalOpen}
        onClose={closeDeleteModal}
        message={deleteMessages.message}
        emphasisEndText={deleteMessages.emphasisEndText}
        confirmText="Confirmar"
        cancelText="Cancelar"
        onConfirm={handleDeleteGuest}
      />
    </AppPageContainer>
  );
}
