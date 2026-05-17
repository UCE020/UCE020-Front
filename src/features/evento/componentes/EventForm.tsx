'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Box,
  Divider,
  IconButton,
  InputAdornment,
  Typography,
} from '@mui/material';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

import { Button, TextInput } from '@/components/ui';
import { colorTokens } from '@/lib/colors';

type EventFormMode = 'create' | 'edit';

type ActivityItem = {
  id: string;
  title: string;
};

type FormState = {
  name: string;
  location: string;
  responsible: string;
  description: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
};

type TouchedState = Record<keyof FormState, boolean>;

const DEFAULT_FORM: FormState = {
  name: '',
  location: '',
  responsible: '',
  description: '',
  startDate: '',
  endDate: '',
  startTime: '',
  endTime: '',
};

const EDIT_FORM: FormState = {
  name: 'Semana de Tecnologia',
  location: 'Auditório Principal',
  responsible: 'Henry Souza',
  description:
    'Programação com palestras, oficinas e atividades práticas para os participantes.',
  startDate: '2026-05-20',
  endDate: '2026-05-22',
  startTime: '08:00',
  endTime: '18:00',
};

function createTouchedState(): TouchedState {
  return {
    name: false,
    location: false,
    responsible: false,
    description: false,
    startDate: false,
    endDate: false,
    startTime: false,
    endTime: false,
  };
}

function getErrors(form: FormState, touched: TouchedState) {
  return {
    name:
      touched.name && form.name.trim().length < 3
        ? 'Informe um nome com pelo menos 3 caracteres.'
        : '',
    location:
      touched.location && form.location.trim().length < 3
        ? 'Informe o local do evento.'
        : '',
    responsible:
      touched.responsible && form.responsible.trim().length < 3
        ? 'Informe o responsável.'
        : '',
    description:
      touched.description && form.description.trim().length < 10
        ? 'Descreva melhor o evento.'
        : '',
    startDate: touched.startDate && !form.startDate ? 'Selecione a data de início.' : '',
    endDate: touched.endDate && !form.endDate ? 'Selecione a data de término.' : '',
    startTime:
      touched.startTime && !form.startTime ? 'Selecione o horário de início.' : '',
    endTime:
      touched.endTime && !form.endTime ? 'Selecione o horário de término.' : '',
  };
}

export default function EventForm({ mode }: { mode: EventFormMode }) {
  const isEdit = mode === 'edit';
  const [form, setForm] = useState<FormState>(isEdit ? EDIT_FORM : DEFAULT_FORM);
  const [touched, setTouched] = useState<TouchedState>(createTouchedState);
  const [activities, setActivities] = useState<ActivityItem[]>([
    { id: '1', title: 'Atividade 1' },
    { id: '2', title: 'Atividade 2' },
  ]);

  const errors = useMemo(() => getErrors(form, touched), [form, touched]);
  const canSubmit =
    Object.values(errors).every((error) => error === '') &&
    form.name.trim().length >= 3 &&
    form.location.trim().length >= 3 &&
    form.responsible.trim().length >= 3 &&
    form.description.trim().length >= 10 &&
    form.startDate.length > 0 &&
    form.endDate.length > 0 &&
    form.startTime.length > 0 &&
    form.endTime.length > 0;

  const title = isEdit ? 'Edição de Evento' : 'Cadastrar Evento';
  const subtitle = isEdit
    ? 'Edite as informações do evento abaixo'
    : 'Preencha os dados abaixo para cadastrar um novo evento';
  const actionLabel = isEdit ? 'Salvar' : 'Cadastrar';

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function markTouched(field: keyof FormState) {
    setTouched((current) => ({ ...current, [field]: true }));
  }

  function handleSubmit() {
    setTouched({
      name: true,
      location: true,
      responsible: true,
      description: true,
      startDate: true,
      endDate: true,
      startTime: true,
      endTime: true,
    });

    if (!canSubmit) return;

    console.log(isEdit ? 'Salvar evento' : 'Cadastrar evento', form, activities);
  }

  function handleAddActivity() {
    setActivities((current) => [
      ...current,
      { id: crypto.randomUUID(), title: `Atividade ${current.length + 1}` },
    ]);
  }

  function handleRemoveActivity(id: string) {
    setActivities((current) => current.filter((activity) => activity.id !== id));
  }

  return (
    <Box sx={{ minHeight: '100dvh', background: colorTokens.surface.background, overflowX: 'hidden' }}>

      <Box sx={{ px: 2, py: 3, display: 'flex', justifyContent: 'center' }}>
        <Box
          sx={{
            width: '100%',
            maxWidth: 520,
            background: colorTokens.neutral.white,
            borderRadius: '28px',
            boxShadow: '0 18px 40px rgba(25, 44, 72, 0.12)',
            px: { xs: 2, sm: 3 },
            py: { xs: 2.5, sm: 3 },
            boxSizing: 'border-box',
            overflow: 'hidden',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <IconButton component={Link} href="/home" aria-label="Voltar" sx={{ p: 0.5, color: colorTokens.text.primary }}>
              <ArrowBackIosNewRoundedIcon sx={{ fontSize: 16 }} />
            </IconButton>

            <Typography sx={{ fontSize: 'clamp(18px, 5vw, 26px)', lineHeight: 1.1, fontWeight: 800, color: colorTokens.text.primary }}>
              {title}
            </Typography>

            <Box sx={{ flex: 1, height: 1, background: colorTokens.neutral.gray300, ml: 1 }} />
          </Box>

          <Typography sx={{ fontSize: 11, color: colorTokens.neutral.gray500, mb: 2.5 }}>{subtitle}</Typography>

          <Box sx={{ display: 'grid', gap: 1.75 }}>
            <Box>
              <Typography sx={{ fontSize: 12, fontWeight: 500, color: colorTokens.text.primary, mb: 0.75 }}>
                Dados do Evento
              </Typography>
              <Divider sx={{ borderColor: colorTokens.neutral.gray300, mb: 1.5 }} />
            </Box>

            <Box sx={{ display: 'grid', gap: 1.5 }}>
              <Box sx={{ minWidth: 0 }}>
                <TextInput label="Nome" value={form.name} onChange={(value) => updateField('name', value)} onBlur={() => markTouched('name')} error={Boolean(errors.name)} size="small" fullWidth />
                {errors.name ? <Typography sx={{ mt: 0.4, fontSize: 11, color: 'error.main' }}>{errors.name}</Typography> : null}
              </Box>

              <Box sx={{ minWidth: 0 }}>
                <TextInput
                  label="Local"
                  value={form.location}
                  onChange={(value) => updateField('location', value)}
                  onBlur={() => markTouched('location')}
                  error={Boolean(errors.location)}
                  size="small"
                  fullWidth
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <LocationOnOutlinedIcon sx={{ fontSize: 18, color: colorTokens.neutral.gray500 }} />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
                {errors.location ? <Typography sx={{ mt: 0.4, fontSize: 11, color: 'error.main' }}>{errors.location}</Typography> : null}
              </Box>

              <Box sx={{ minWidth: 0 }}>
                <TextInput
                  label="Responsável"
                  value={form.responsible}
                  onChange={(value) => updateField('responsible', value)}
                  onBlur={() => markTouched('responsible')}
                  error={Boolean(errors.responsible)}
                  size="small"
                  fullWidth
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <BadgeOutlinedIcon sx={{ fontSize: 18, color: colorTokens.neutral.gray500 }} />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
                {errors.responsible ? <Typography sx={{ mt: 0.4, fontSize: 11, color: 'error.main' }}>{errors.responsible}</Typography> : null}
              </Box>

              <Box sx={{ minWidth: 0 }}>
                <TextInput
                  label="Descrição do evento"
                  value={form.description}
                  onChange={(value) => updateField('description', value)}
                  onBlur={() => markTouched('description')}
                  error={Boolean(errors.description)}
                  size="small"
                  fullWidth
                  multiline
                  minRows={3}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end" sx={{ alignSelf: 'flex-start', mt: 0.5 }}>
                          <DescriptionOutlinedIcon sx={{ fontSize: 18, color: colorTokens.neutral.gray500 }} />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
                {errors.description ? <Typography sx={{ mt: 0.4, fontSize: 11, color: 'error.main' }}>{errors.description}</Typography> : null}
              </Box>

              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1.5 }}>
                <Box sx={{ minWidth: 0 }}>
                  <TextInput
                    label="Data de Início"
                    value={form.startDate}
                    onChange={(value) => updateField('startDate', value)}
                    onBlur={() => markTouched('startDate')}
                    error={Boolean(errors.startDate)}
                    size="small"
                    fullWidth
                    type="date"
                    slotProps={{
                      inputLabel: { shrink: true },
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                  {errors.startDate ? <Typography sx={{ mt: 0.4, fontSize: 11, color: 'error.main' }}>{errors.startDate}</Typography> : null}
                </Box>

                <Box sx={{ minWidth: 0 }}>
                  <TextInput
                    label="Data de Término"
                    value={form.endDate}
                    onChange={(value) => updateField('endDate', value)}
                    onBlur={() => markTouched('endDate')}
                    error={Boolean(errors.endDate)}
                    size="small"
                    fullWidth
                    type="date"
                    slotProps={{
                      inputLabel: { shrink: true },
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                  {errors.endDate ? <Typography sx={{ mt: 0.4, fontSize: 11, color: 'error.main' }}>{errors.endDate}</Typography> : null}
                </Box>

                <Box sx={{ minWidth: 0 }}>
                  <TextInput
                    label="Horário de Início"
                    value={form.startTime}
                    onChange={(value) => updateField('startTime', value)}
                    onBlur={() => markTouched('startTime')}
                    error={Boolean(errors.startTime)}
                    size="small"
                    fullWidth
                    type="time"
                    slotProps={{
                      inputLabel: { shrink: true },
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                  {errors.startTime ? <Typography sx={{ mt: 0.4, fontSize: 11, color: 'error.main' }}>{errors.startTime}</Typography> : null}
                </Box>

                <Box sx={{ minWidth: 0 }}>
                  <TextInput
                    label="Horário de Término"
                    value={form.endTime}
                    onChange={(value) => updateField('endTime', value)}
                    onBlur={() => markTouched('endTime')}
                    error={Boolean(errors.endTime)}
                    size="small"
                    fullWidth
                    type="time"
                    slotProps={{
                      inputLabel: { shrink: true },
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                  {errors.endTime ? <Typography sx={{ mt: 0.4, fontSize: 11, color: 'error.main' }}>{errors.endTime}</Typography> : null}
                </Box>
              </Box>
            </Box>

            <Box sx={{ pt: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1, mb: 1.5 }}>
                <Typography sx={{ fontSize: 12, fontWeight: 500, color: colorTokens.text.primary }}>
                  Atividades Cadastradas
                </Typography>

                <Button
                  variant="text"
                  color="secondary"
                  leftIcon={<AddRoundedIcon sx={{ fontSize: 16 }} />}
                  onClick={handleAddActivity}
                  sx={{
                    minWidth: 0,
                    px: 0,
                    py: 0,
                    fontSize: 11,
                    fontWeight: 600,
                    color: colorTokens.navigation.default,
                    textTransform: 'none',
                    '&:hover': { backgroundColor: 'transparent', color: colorTokens.navigation.hover },
                  }}
                >
                  Adicionar atividade
                </Button>
              </Box>

              <Box sx={{ display: 'grid', gap: 1.25 }}>
                {activities.map((activity) => (
                  <Box
                    key={activity.id}
                    sx={{
                      border: `1px solid ${colorTokens.neutral.gray300}`,
                      borderRadius: '6px',
                      boxShadow: '0 6px 14px rgba(25, 44, 72, 0.08)',
                      px: 1.5,
                      py: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 1,
                    }}
                  >
                    <Typography sx={{ fontSize: 14, color: colorTokens.text.primary, fontWeight: 400 }}>{activity.title}</Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <IconButton size="small" aria-label={`Editar ${activity.title}`} sx={{ color: colorTokens.neutral.gray500 }}>
                        <EditOutlinedIcon sx={{ fontSize: 18 }} />
                      </IconButton>

                      <IconButton size="small" aria-label={`Excluir ${activity.title}`} onClick={() => handleRemoveActivity(activity.id)} sx={{ color: colorTokens.neutral.gray500 }}>
                        <DeleteOutlineOutlinedIcon sx={{ fontSize: 18 }} />
                      </IconButton>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>

            <Box sx={{ pt: 1.25, display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleSubmit}
                disabled={!canSubmit}
                sx={{
                  minWidth: 118,
                  height: 34,
                  borderRadius: '6px',
                  fontSize: 14,
                  fontWeight: 700,
                  textTransform: 'none',
                  backgroundColor: colorTokens.navigation.default,
                  '&:hover': { backgroundColor: colorTokens.navigation.hover },
                }}
              >
                {actionLabel}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
