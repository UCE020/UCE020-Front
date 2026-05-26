import type { Activity } from '@/types/activity';

export const MOCK_EVENT = {
  id: '1',
  name: 'Semana de Integração de Eng. de Computação',
  startDate: '2026-04-15T07:00:00',
  endDate: '2026-04-19T18:00:00',
  imageUrl:
    'https://th.bing.com/th/id/R.8e49b8ccde38ab5b0973123b8f46c19c?rik=1d8g28rlCrtSFw&pid=ImgRaw&r=0',
  location: 'Auditório Central - UEFS',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  participantsCount: 164,
  hours: 20,
  status: 'inscrições abertas',
  activities: [
    {
      id: 'a1',
      title: 'Atividade 1',
      startDate: '2026-04-15T07:00:00',
      endDate: '2026-04-15T08:00:00',
      status: 'inscrições abertas',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    },
    {
      id: 'a2',
      title: 'Atividade 2',
      startDate: '2026-04-16T07:00:00',
      endDate: '2026-04-16T08:00:00',
      status: 'inscrições encerradas',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      id: 'a3',
      title: 'Atividade 3',
      startDate: '2026-04-17T07:00:00',
      endDate: '2026-04-17T08:00:00',
      status: 'inscrições abertas',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    },
    {
      id: 'a4',
      title: 'Atividade 4',
      startDate: '2026-04-16T07:00:00',
      endDate: '2026-04-16T08:00:00',
      status: 'inscrições abertas',
    },
    {
      id: 'a5',
      title: 'Atividade 5',
      startDate: '2026-04-17T07:00:00',
      endDate: '2026-04-17T08:00:00',
      status: 'inscrições encerradas',
    },
    {
      id: 'a6',
      title: 'Atividade 6',
      startDate: '2026-04-16T07:00:00',
      endDate: '2026-04-16T08:00:00',
      status: 'inscrições encerradas',
    },
    {
      id: 'a7',
      title: 'Atividade 7',
      startDate: '2026-04-17T07:00:00',
      endDate: '2026-04-17T08:00:00',
      status: 'inscrições abertas',
    },
  ] as Activity[],
};
