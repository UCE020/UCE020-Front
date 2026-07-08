import EventForm from '@/features/event/components/EventForm';

interface EditEventPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditEventPage({ params }: EditEventPageProps) {
  const { id } = await params;
  const eventId = Number(id);

  return <EventForm mode="edit" eventId={eventId} />;
}