import { Box, Container, Typography, IconButton } from '@mui/material';

import { EventsList } from '@/components/event/EventsList';
import { Event } from '@/types/event';
import { ArrowBack } from '@mui/icons-material';

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

      <Container maxWidth="md" sx={{ py: { xs: 3, md: 4 } }}>
        {/* Header */}
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2, mb: 2 }}>
          <IconButton
            size="small"
            sx={{
              color: 'text.secondary',
              '&:hover': { bgcolor: 'background.default' },
            }}
          >
            <ArrowBack />
          </IconButton>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: 'text.primary',
            }}
          >
            Eventos Criados
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center', mb: 2 }}>
          {/* Lista de eventos criados - substitua pelo mapeamento real dos seus dados */}
          <Box sx={{ width: '100%', maxWidth: 860 }}>
            <EventsList events={sampleEvents} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
