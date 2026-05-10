export type ActivityModalVariant = 'signup' | 'manage';
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
  isLoading?: boolean;
}

export interface ActivityImageProps {
  title: string;
  image?: string;
}

export interface ActivityDetailsProps {
  startDate: DateLike;
  endDate?: DateLike;
  location: string;
  hours: number;
  participantsCount: number;
  status: string;
}

export interface ActivityDescriptionProps {
  description: string;
}

export interface ActivityActionsProps {
  variant: ActivityModalVariant;
  onSignup?: AsyncVoidHandler;
  onCancelParticipation?: AsyncVoidHandler;
  onMarkPresence?: AsyncVoidHandler;
}
