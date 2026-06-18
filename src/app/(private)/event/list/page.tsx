import { Box, Container } from '@mui/material';

import { EventList } from '@/components/event/EventList';
import type { Event } from '@/types/event';

const sampleEvents: Event[] = [
  {
    id: 1,
    nome: 'Fórum de Tecnologia Universitária',
    codigo: 'EVT01',
    descricao: 'Desc',
    localizacao: 'A definir',
    responsavel: 'Responsável',
    cargaHoraria: 10,
    dataInicio: '2026-07-15T18:00:00.000Z',
    dataFim: '2026-07-15T21:00:00.000Z',
    status: 'ativo',
    foto: '/images/certificadoVariacao2.png',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    nome: 'Palestra de Inovação',
    codigo: 'EVT02',
    descricao: 'Desc',
    localizacao: 'A definir',
    responsavel: 'Responsável',
    cargaHoraria: 10,
    dataInicio: '2026-07-20T19:00:00.000Z',
    dataFim: '2026-07-20T22:00:00.000Z',
    status: 'ativo',
    foto: '/images/certificadoVariacao2.png',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    nome: 'Hackathon de Desenvolvimento',
    codigo: 'EVT03',
    descricao: 'Desc',
    localizacao: 'A definir',
    responsavel: 'Responsável',
    cargaHoraria: 10,
    dataInicio: '2026-07-25T09:00:00.000Z',
    dataFim: '2026-07-26T18:00:00.000Z',
    status: 'ativo',
    foto: '/images/certificadoVariacao2.png',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 4,
    nome: 'Siecomp 2026',
    codigo: 'EVT04',
    descricao: 'Desc',
    localizacao: 'A definir',
    responsavel: 'Responsável',
    cargaHoraria: 10,
    dataInicio: '2026-07-25T09:00:00.000Z',
    dataFim: '2026-07-26T18:00:00.000Z',
    status: 'ativo',
    foto: '/images/certificadoVariacao2.png',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 5,
    nome: 'Eleições DA ECOMP 2026',
    codigo: 'EVT05',
    descricao: 'Desc',
    localizacao: 'A definir',
    responsavel: 'Responsável',
    cargaHoraria: 10,
    dataInicio: '2026-07-25T09:00:00.000Z',
    dataFim: '2026-07-26T18:00:00.000Z',
    status: 'ativo',
    foto: '/images/certificadoVariacao2.png',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function EventCreatedPage() {
  return (
    <Box sx={{ minHeight: '100dvh', bgcolor: 'background.default' }}>
      <Container sx={{ py: { xs: 3, md: 4 } }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center', mb: 2 }}>
          <EventList events={sampleEvents} title="Eventos Criados" home={false} />
        </Box>
      </Container>
    </Box>
  );
}
