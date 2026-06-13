'use client';

import { useState } from 'react';
import { ConfirmModal } from '@/components/modals/confirm-modal';
import { AppPageContainer } from '@/components/layout/AppPageContainer';
import { MOCK_STAFF } from '@/mocks/staff';
import { getRemoveStaffMessage } from '@/features/participants/presence/utils/presenceMessages';
import { filterBySearch } from '../utils/filterBySearch';
import { ManagementListCard } from './ManagementListCard';
import { StaffListRow } from './StaffListRow';
import type { ManagedUser } from '@/types/management';

export function ManageUsersView() {
  const [users, setUsers] = useState<ManagedUser[]>(MOCK_STAFF);
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState<ManagedUser | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const filteredUsers = filterBySearch(users, search);

  function openDeleteModal(userId: string) {
    const user = users.find((item) => item.id === userId);
    if (!user) return;
    setSelectedUser(user);
    setDeleteModalOpen(true);
  }

  function closeDeleteModal() {
    setDeleteModalOpen(false);
    setSelectedUser(null);
  }

  async function handleDeleteUser() {
    if (!selectedUser) return;
    setUsers((current) => current.filter((item) => item.id !== selectedUser.id));
    closeDeleteModal();
  }

  function handleEditUser(userId: string) {
    const user = users.find((item) => item.id === userId);
    if (!user) return;
    console.log(`Editar usuário: ${user.name}`);
  }

  const deleteMessages = selectedUser
    ? getRemoveStaffMessage(selectedUser.name, 'o usuário')
    : { message: '', emphasisEndText: '' };

  return (
    <AppPageContainer>
      <ManagementListCard
        title="Gerenciar Usuários"
        search={search}
        onSearchChange={setSearch}
        searchAriaLabel="Buscar usuário"
        isEmpty={filteredUsers.length === 0}
        emptyMessage="Nenhum usuário encontrado"
      >
        {filteredUsers.map((user) => (
          <StaffListRow
            key={user.id}
            name={user.name}
            role={user.role}
            onEdit={() => handleEditUser(user.id)}
            onDelete={() => openDeleteModal(user.id)}
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
        onConfirm={handleDeleteUser}
      />
    </AppPageContainer>
  );
}
