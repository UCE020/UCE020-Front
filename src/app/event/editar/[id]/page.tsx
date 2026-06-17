import EventForm from "@/features/evento/componentes/EventForm";

interface EditarEventoPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditarEventoPage({ params }: EditarEventoPageProps) {
  const { id } = await params;
  const eventId = Number(id);

  return <EventForm mode="edit" eventId={eventId} />;
}
