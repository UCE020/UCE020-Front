export interface Event {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  time: string;
  imageUrl: string;
}

export interface EventCardProps {
  event: Event;
  onClick?: (event: Event) => void;
}