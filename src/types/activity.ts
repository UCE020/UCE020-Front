export type ActivityModalVariant = 'signup' | 'manage' | 'monitor' | 'organizer';
export type DateLike = string | Date;
export type AsyncVoidHandler = () => void | Promise<void>;

export interface ActivityModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  image?: string;
  startDate: DateLike;
  endDate?: DateLike;
  location: string;
  hours: number;
  participantsCount: number;
  status: string;
  description: string;
  variant: ActivityModalVariant;
  onSignup?: AsyncVoidHandler;
  onCancelParticipation?: AsyncVoidHandler;
  onMarkPresence?: AsyncVoidHandler;
  onValidatePresences?: AsyncVoidHandler;
  onListParticipants?: AsyncVoidHandler;
  isLoading?: boolean;
}

export interface ActivityDetailProps {
  title: string;
  location: string;
  date: DateLike;
}

export interface Activity {
  id: string;
  title: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
}
