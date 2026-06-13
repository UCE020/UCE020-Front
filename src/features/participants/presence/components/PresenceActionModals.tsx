import { ConfirmModal } from '@/components/modals/confirm-modal';
import {
  getConfirmPresenceMessage,
  getRemovePresenceMessage,
} from '@/features/participants/presence/utils/presenceMessages';

interface PresenceActionModalsProps {
  participantName: string | null;
  activityTitle: string;
  confirmOpen: boolean;
  removeOpen: boolean;
  onCloseConfirm: () => void;
  onCloseRemove: () => void;
  onConfirmPresence: () => void | Promise<void>;
  onRemovePresence: () => void | Promise<void>;
  isConfirming?: boolean;
}

export function PresenceActionModals({
  participantName,
  activityTitle,
  confirmOpen,
  removeOpen,
  onCloseConfirm,
  onCloseRemove,
  onConfirmPresence,
  onRemovePresence,
  isConfirming,
}: PresenceActionModalsProps) {
  if (!participantName) return null;

  const confirmMessages = getConfirmPresenceMessage(participantName, activityTitle);
  const removeMessages = getRemovePresenceMessage(participantName, activityTitle);

  return (
    <>
      <ConfirmModal
        open={confirmOpen}
        onClose={onCloseConfirm}
        message={confirmMessages.message}
        emphasisEndText={confirmMessages.emphasisEndText}
        confirmText="Confirmar"
        cancelText="Cancelar"
        onConfirm={onConfirmPresence}
        isLoading={isConfirming}
      />

      <ConfirmModal
        open={removeOpen}
        onClose={onCloseRemove}
        message={removeMessages.message}
        emphasisEndText={removeMessages.emphasisEndText}
        confirmText="Confirmar"
        cancelText="Cancelar"
        onConfirm={onRemovePresence}
      />
    </>
  );
}
