'use client';

import { useState } from 'react';
import { Box } from '@mui/material';
import { ConfirmModal } from '@/components/modals/confirm-modal';
import { AppPageContainer } from '@/components/layout/AppPageContainer';
import { MOCK_STAFF } from '@/mocks/staff';
import { getRemoveStaffMessage } from '@/features/participants/presence/utils/presenceMessages';
import { filterBySearch } from '../utils/filterBySearch';
import { ManagementListCard } from './ManagementListCard';
import { StaffListRow } from './StaffListRow';
import { EditUserRoleModal, USER_ROLES } from '../../../components/modals/manage-users-modal/EditUserRoleModal';
import type { ManagedUser, StaffRole } from '@/types/management';

export function ManageUsersView() {
  const [users, setUsers] = useState<ManagedUser[]>(MOCK_STAFF);
  const [search, setSearch] = useState('');

  // Estado do modal de exclusão
  const [selectedUser, setSelectedUser] = useState<ManagedUser | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Estado do modal de edição de papel
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<ManagedUser | null>(null);

  const filteredUsers = filterBySearch(users, search);

  // --- Exclusão ---
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

  // --- Edição de papel ---
  function openEditModal(userId: string) {
    const user = users.find((item) => item.id === userId);
    if (!user) return;
    setEditingUser(user);
    setEditModalOpen(true);
  }

  function closeEditModal() {
    setEditModalOpen(false);
    setEditingUser(null);
  }

  function handleSaveRole(newRole: StaffRole) {
    if (!editingUser) return;
    setUsers((current) =>
      current.map((item) =>
        item.id === editingUser.id ? { ...item, role: newRole } : item,
      ),
    );
    closeEditModal();
  }

  const deleteMessages = selectedUser
    ? getRemoveStaffMessage(selectedUser.name, 'o usuário')
    : { message: '', emphasisEndText: '' };

  return (
    <AppPageContainer>
      <ManagementListCard
        title="Gerenciar Membros do Evento"
        search={search}
        onSearchChange={setSearch}
        searchAriaLabel="Buscar usuário"
        isEmpty={filteredUsers.length === 0}
        emptyMessage="Nenhum usuário encontrado"
      >
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
              onEdit={() => openEditModal(user.id)}
              onDelete={() => openDeleteModal(user.id)}
            />
          ))}
        </ManagementListCard>
      </Box>

      {/* Modal de edição de tipo */}
      <EditUserRoleModal
        open={editModalOpen}
        userName={editingUser?.name ?? ''}
        currentRole={(editingUser?.role as StaffRole) ?? 'Organizador'}
        roles={USER_ROLES}
        onClose={closeEditModal}
        onConfirm={handleSaveRole}
      />

      {/* Modal de confirmação de exclusão */}
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