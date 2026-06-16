'use client';

import { useState } from 'react';
import { Box } from '@mui/material';
import { ConfirmModal } from '@/components/modals/confirm-modal';
import { AppPageContainer } from '@/components/layout/AppPageContainer';
import { MOCK_STAFF } from '@/mocks/staff';
import { getRemoveStaffMessage } from '@/features/participants/utils/presenceMessages';
import { filterBySearch } from '../utils/filterBySearch';
import { ManagementListCard } from './ManagementListCard';
import { StaffListRow } from './StaffListRow';
import { EditUserRoleModal, USER_ROLES } from './EditUserRoleModal';
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
    // AppPageContainer fornece: minHeight 100dvh, bgcolor, width 100%, minWidth 320
    // e um inner Box com maxWidth 620, mx auto, p 2.
    // Sobrescrevemos o bgcolor para o fundo acinzentado no sm+ via sx.
    <AppPageContainer
      sx={{
        bgcolor: { xs: 'background.default', sm: '#e8eaf0' },
        display: { sm: 'flex' },
        flexDirection: { sm: 'column' },
        alignItems: { sm: 'center' },
        justifyContent: { sm: 'center' },
        py: { sm: 4 },
      }}
    >
      {/*
        No mobile: card sem margens, sem sombra, ocupa tela cheia.
        No sm+: card com borderRadius, sombra e largura máxima controlada
        pelo inner Box do AppPageContainer (maxWidth 620).
      */}
      <Box
        sx={{
          minHeight: { xs: '100dvh', sm: 'auto' },
          bgcolor: 'background.paper',
          borderRadius: { xs: 0, sm: 4 },
          mx: { xs: -2, sm: 0 }, // cancela o p:2 do inner Box no mobile
          px: { xs: 2, sm: 3 },
          py: { xs: 4, sm: 4 },
          boxShadow: { xs: 'none', sm: '0 4px 24px rgba(0,0,0,0.08)' },
        }}
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