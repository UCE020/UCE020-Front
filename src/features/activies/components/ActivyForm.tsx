'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Box,
  Divider,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
} from '@mui/material';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

import { Button, TextInput } from '@/components/ui';
import { colorTokens } from '@/lib/colors';

// ─── Types ───────────────────────────────────────────────────────────────────

type ActivityFormMode = 'create' | 'edit';

type FormState = {
  name: string;
  category: string;
  guests: string;
  workload: string;
  description: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
};

type TouchedState = Record<keyof FormState, boolean>;

// ─── Constants ───────────────────────────────────────────────────────────────

const CATEGORY_OPTIONS = [
  'Palestra',
  'Oficina',
  'Mesa Redonda',
  'Minicurso',
  'Workshop',
  'Outro',
];

const DEFAULT_FORM: FormState = {
  name: '',
  category: '',
  guests: '',
  workload: '',
  description: '',
  startDate: '',
  endDate: '',
  startTime: '',
  endTime: '',
};

const EDIT_FORM: FormState = {
  name: 'Introdução ao React',
  category: 'Oficina',
  guests: 'Kauan Farias',
  workload: '4',
  description: 'Atividade prática com foco em componentes e hooks do React.',
  startDate: '2026-05-20',
  endDate: '2026-05-20',
  startTime: '08:00',
  endTime: '12:00',
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function createTouchedState(): TouchedState {
  return {
    name: false,
    category: false,
    guests: false,
    workload: false,
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
    category:
      touched.category && !form.category
        ? 'Selecione uma categoria.'
        : '',
    guests: '', // optional field — no validation required
    workload:
      touched.workload && form.workload !== '' && isNaN(Number(form.workload))
        ? 'Informe um número válido de horas.'
        : '',
    description:
      touched.description && form.description.trim().length < 10
        ? 'Descreva melhor a atividade (mínimo 10 caracteres).'
        : '',
    startDate:
      touched.startDate && !form.startDate ? 'Selecione a data de início.' : '',
    endDate:
      touched.endDate && !form.endDate ? 'Selecione a data de término.' : '',
    startTime:
      touched.startTime && !form.startTime ? 'Selecione o horário de início.' : '',
    endTime:
      touched.endTime && !form.endTime ? 'Selecione o horário de término.' : '',
  };
}

function isFormValid(form: FormState, errors: ReturnType<typeof getErrors>) {
  return (
    Object.values(errors).every((e) => e === '') &&
    form.name.trim().length >= 3 &&
    Boolean(form.category) &&
    form.description.trim().length >= 10 &&
    Boolean(form.startDate) &&
    Boolean(form.endDate) &&
    Boolean(form.startTime) &&
    Boolean(form.endTime)
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

// Mock event info shown at the top of the form (would come from props/context in real usage)
type EventInfo = {
  title: string;
  date: string;
  location: string;
};

const MOCK_EVENT: EventInfo = {
  title: 'Título do Evento',
  date: 'dd/mm/yyyy',
  location: 'localização',
};

export default function ActivityForm({ mode }: { mode: ActivityFormMode }) {
  const isEdit = mode === 'edit';

  const [form, setForm] = useState<FormState>(isEdit ? EDIT_FORM : DEFAULT_FORM);
  const [touched, setTouched] = useState<TouchedState>(createTouchedState);

  const errors = useMemo(() => getErrors(form, touched), [form, touched]);
  const canSubmit = isFormValid(form, errors);

  const title = isEdit ? 'Edição de Atividade' : 'Cadastrar Atividade';
  const subtitle = isEdit
    ? 'Edite as informações da atividade abaixo'
    : 'Preencha os dados abaixo para cadastrar uma nova atividade';
  const actionLabel = isEdit ? 'Salvar' : 'Cadastrar';

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function markTouched(field: keyof FormState) {
    setTouched((current) => ({ ...current, [field]: true }));
  }

  function handleSubmit() {
    // Mark all fields as touched to trigger all validations
    const allTouched: TouchedState = {
      name: true,
      category: true,
      guests: true,
      workload: true,
      description: true,
      startDate: true,
      endDate: true,
      startTime: true,
      endTime: true,
    };
    setTouched(allTouched);

    const currentErrors = getErrors(form, allTouched);
    if (!isFormValid(form, currentErrors)) return;

    console.log(isEdit ? 'Salvar atividade' : 'Cadastrar atividade', form);
  }

  return (
    <Box
      sx={{
        minHeight: '100dvh',
        background: colorTokens.surface.background,
        overflowX: 'hidden',
      }}
    >
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
          {/* ── Header ── */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <IconButton
              component={Link}
              href="/home"
              aria-label="Voltar"
              sx={{ p: 0.5, color: colorTokens.text.primary }}
            >
              <ArrowBackIosNewRoundedIcon sx={{ fontSize: 16 }} />
            </IconButton>

            <Typography
              sx={{
                fontSize: 'clamp(18px, 5vw, 26px)',
                lineHeight: 1.1,
                fontWeight: 800,
                color: colorTokens.text.primary,
              }}
            >
              {title}
            </Typography>

            <Box
              sx={{
                flex: 1,
                height: 1,
                background: colorTokens.neutral.gray300,
                ml: 1,
              }}
            />
          </Box>

          <Typography sx={{ fontSize: 11, color: colorTokens.neutral.gray500, mb: 2.5 }}>
            {subtitle}
          </Typography>

          {/* ── Event Info Card ── */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              border: `1px solid ${colorTokens.neutral.gray300}`,
              borderRadius: '10px',
              px: 1.5,
              py: 1.25,
              mb: 2.5,
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: colorTokens.neutral.gray300,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <CalendarTodayOutlinedIcon
                sx={{ fontSize: 20, color: colorTokens.neutral.gray500 }}
              />
            </Box>

            <Box>
              <Typography
                sx={{ fontSize: 13, fontWeight: 600, color: colorTokens.text.primary }}
              >
                {MOCK_EVENT.title}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <CalendarTodayOutlinedIcon
                  sx={{ fontSize: 12, color: colorTokens.neutral.gray500 }}
                />
                <Typography sx={{ fontSize: 11, color: colorTokens.neutral.gray500 }}>
                  {MOCK_EVENT.date}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <LocationOnOutlinedIcon
                  sx={{ fontSize: 12, color: colorTokens.neutral.gray500 }}
                />
                <Typography sx={{ fontSize: 11, color: colorTokens.neutral.gray500 }}>
                  {MOCK_EVENT.location}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* ── Form ── */}
          <Box sx={{ display: 'grid', gap: 1.75 }}>
            {/* Section label */}
            <Box>
              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: colorTokens.text.primary,
                  mb: 0.75,
                }}
              >
                Dados da Atividade
              </Typography>
              <Divider sx={{ borderColor: colorTokens.neutral.gray300, mb: 1.5 }} />
            </Box>

            <Box sx={{ display: 'grid', gap: 1.5 }}>
              {/* Nome da Atividade */}
              <Box sx={{ minWidth: 0 }}>
                <TextInput
                  label="Nome da Atividade"
                  value={form.name}
                  onChange={(value) => updateField('name', value)}
                  onBlur={() => markTouched('name')}
                  error={Boolean(errors.name)}
                  size="small"
                  fullWidth
                />
                {errors.name && (
                  <Typography sx={{ mt: 0.4, fontSize: 11, color: 'error.main' }}>
                    {errors.name}
                  </Typography>
                )}
              </Box>

              {/* Categoria (Select) */}
              <Box sx={{ minWidth: 0 }}>
                <FormControl fullWidth size="small" error={Boolean(errors.category)}>
                  <InputLabel
                    sx={{ fontSize: 14, color: colorTokens.neutral.gray500 }}
                  >
                    Categoria
                  </InputLabel>
                  <Select
                    value={form.category}
                    label="Categoria"
                    onChange={(e) => updateField('category', e.target.value)}
                    onBlur={() => markTouched('category')}
                    sx={{ borderRadius: '6px' }}
                  >
                    {CATEGORY_OPTIONS.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {errors.category && (
                  <Typography sx={{ mt: 0.4, fontSize: 11, color: 'error.main' }}>
                    {errors.category}
                  </Typography>
                )}
              </Box>

              {/* Convidados + Carga Horária */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 1.5,
                }}
              >
                {/* Convidados — left side with "+" add button feel */}
                <Box sx={{ minWidth: 0 }}>
                  <TextInput
                    label="Convidados"
                    value={form.guests}
                    onChange={(value) => updateField('guests', value)}
                    onBlur={() => markTouched('guests')}
                    size="small"
                    fullWidth
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <AddRoundedIcon
                              sx={{ fontSize: 18, color: colorTokens.neutral.gray500 }}
                            />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                </Box>

                {/* Carga Horária */}
                <Box sx={{ minWidth: 0 }}>
                  <TextInput
                    label="Carga horária"
                    value={form.workload}
                    onChange={(value) => updateField('workload', value)}
                    onBlur={() => markTouched('workload')}
                    error={Boolean(errors.workload)}
                    size="small"
                    fullWidth
                    type="number"
                    slotProps={{
                      input: { inputProps: { min: 0 } },
                    }}
                  />
                  {errors.workload && (
                    <Typography sx={{ mt: 0.4, fontSize: 11, color: 'error.main' }}>
                      {errors.workload}
                    </Typography>
                  )}
                </Box>
              </Box>

              {/* Descrição da Atividade */}
              <Box sx={{ minWidth: 0 }}>
                <TextInput
                  label="Descrição da atividade"
                  value={form.description}
                  onChange={(value) => updateField('description', value)}
                  onBlur={() => markTouched('description')}
                  error={Boolean(errors.description)}
                  size="small"
                  fullWidth
                  multiline
                  minRows={3}
                />
                {errors.description && (
                  <Typography sx={{ mt: 0.4, fontSize: 11, color: 'error.main' }}>
                    {errors.description}
                  </Typography>
                )}
              </Box>

              {/* Datas e Horários */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                  gap: 1.5,
                }}
              >
                {/* Data de Início */}
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
                    slotProps={{ inputLabel: { shrink: true } }}
                  />
                  {errors.startDate && (
                    <Typography sx={{ mt: 0.4, fontSize: 11, color: 'error.main' }}>
                      {errors.startDate}
                    </Typography>
                  )}
                </Box>

                {/* Data de Término */}
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
                    slotProps={{ inputLabel: { shrink: true } }}
                  />
                  {errors.endDate && (
                    <Typography sx={{ mt: 0.4, fontSize: 11, color: 'error.main' }}>
                      {errors.endDate}
                    </Typography>
                  )}
                </Box>

                {/* Horário de Início */}
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
                    slotProps={{ inputLabel: { shrink: true } }}
                  />
                  {errors.startTime && (
                    <Typography sx={{ mt: 0.4, fontSize: 11, color: 'error.main' }}>
                      {errors.startTime}
                    </Typography>
                  )}
                </Box>

                {/* Horário de Término */}
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
                    slotProps={{ inputLabel: { shrink: true } }}
                  />
                  {errors.endTime && (
                    <Typography sx={{ mt: 0.4, fontSize: 11, color: 'error.main' }}>
                      {errors.endTime}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>

            {/* Submit */}
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