'use client';

import { useState, useEffect } from 'react';
import type { StaffRole } from '@/types/management';

// Mapeamento: valor interno → label exibido em PT
export const ROLE_LABELS: Record<StaffRole, string> = {
  'Organizador': 'Organizador',
  'Monitor': 'Monitor',
  'Participante': 'Participante',
};

export const STAFF_ROLES: StaffRole[] = ['Organizador', 'Monitor', 'Participante'];

interface EditUserRoleModalProps {
  open: boolean;
  userName: string;
  currentRole: StaffRole;
  onClose: () => void;
  onConfirm: (newRole: StaffRole) => void;
}

export function EditUserRoleModal({
  open,
  userName,
  currentRole,
  onClose,
  onConfirm,
}: EditUserRoleModalProps) {
  const [selectedRole, setSelectedRole] = useState<StaffRole>(currentRole);

  useEffect(() => {
    if (open) setSelectedRole(currentRole);
  }, [open, currentRole]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-labelledby="edit-role-title"
    >
      <div
        className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          id="edit-role-title"
          className="mb-1 text-base font-semibold text-gray-900"
        >
          Editar tipo de usuário
        </h2>
        <p className="mb-5 text-sm text-gray-500">
          Selecione o novo tipo para{' '}
          <span className="font-medium text-gray-700">{userName}</span>.
        </p>

        <fieldset className="mb-6 space-y-2">
          <legend className="sr-only">Tipo de usuário</legend>
          {STAFF_ROLES.map((role) => (
            <label
              key={role}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-colors ${
                selectedRole === role
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <input
                type="radio"
                name="user-role"
                value={role}
                checked={selectedRole === role}
                onChange={() => setSelectedRole(role)}
                className="accent-indigo-600"
              />
              <span className="text-sm font-medium">{ROLE_LABELS[role]}</span>
            </label>
          ))}
        </fieldset>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-gray-200 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => onConfirm(selectedRole)}
            disabled={selectedRole === currentRole}
            className="flex-1 rounded-xl bg-indigo-600 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}