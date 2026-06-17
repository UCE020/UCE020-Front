'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Box,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
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
import { ImageUpload } from '@/components/ui/inputs';
import { colorTokens } from '@/lib/colors';
import { useCreateEvent } from '../../evento/hooks/useCreateEvent';
import { useEditEvent } from '../../evento/hooks/useEditEvent';

type EventFormMode = 'create' | 'edit';

type ActivityItem = {
  id: string;
  title: string;
};

type FormState = {
  nome: string;
  localizacao: string;
  responsavel: string;
  descricao: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  cargaHoraria: string;
  status: 'pendente' | 'iniciada' | 'andamento' | 'finalizada';
  foto: string | null;
};

type TouchedState = Record<keyof FormState, boolean>;

const STATUS_OPTIONS: { value: FormState['status']; label: string }[] = [
  { value: 'pendente', label: 'Pendente' },
  { value: 'iniciada', label: 'Iniciada' },
  { value: 'andamento', label: 'Em andamento' },
  { value: 'finalizada', label: 'Finalizada' },
];

const DEFAULT_FORM: FormState = {
  nome: '',
  localizacao: '',
  responsavel: '',
  descricao: '',
  startDate: '',
  endDate: '',
  startTime: '',
  endTime: '',
  cargaHoraria: '',
  status: 'pendente',
  foto: null,
};

function createTouchedState(): TouchedState {
  return {
    nome: false,
    localizacao: false,
    responsavel: false,
    descricao: false,
    startDate: false,
    endDate: false,
    startTime: false,
    endTime: false,
    cargaHoraria: false,
    status: false,
    foto: false,
  };
}

function getErrors(form: FormState, touched: TouchedState) {
  return {
    nome:
      touched.nome && form.nome.trim().length < 3
        ? 'Informe um nome com pelo menos 3 caracteres.'
        : '',
    localizacao:
      touched.localizacao && form.localizacao.trim().length < 3
        ? 'Informe o local do evento.'
        : '',
    responsavel:
      touched.responsavel && form.responsavel.trim().length < 3
        ? 'Informe o responsável.'
        : '',
    descricao:
      touched.descricao && form.descricao.trim().length < 10
        ? 'Descreva melhor o evento.'
        : '',
    startDate: touched.startDate && !form.startDate ? 'Selecione a data de início.' : '',
    endDate: touched.endDate && !form.endDate ? 'Selecione a data de término.' : '',
    startTime: touched.startTime && !form.startTime ? 'Selecione o horário de início.' : '',
    endTime: touched.endTime && !form.endTime ? 'Selecione o horário de término.' : '',
    cargaHoraria:
      touched.cargaHoraria && (!form.cargaHoraria || Number(form.cargaHoraria) < 0)
        ? 'Informe a carga horária.'
        : '',
    status: '',
    foto: '',
  };
}

function toISODateTime(date: string, time: string): string {
  return `${date}T${time}:00`;
}

interface EventFormProps {
  mode: EventFormMode;
  eventId?: number;
}

export default function EventForm({ mode, eventId }: EventFormProps) {
  const isEdit = mode === 'edit';
  const [form, setForm] = useState<FormState>(DEFAULT_FORM);
  const [touched, setTouched] = useState<TouchedState>(createTouchedState);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [editingActivityId, setEditingActivityId] = useState<string | null>(null);

  const { handleCreate, loading: createLoading, error: createError } = useCreateEvent();
  const {
    event: existingEvent,
    loadingEvent,
    loadError,
    handleUpdate,
    loading: updateLoading,
    error: updateError,
  } = useEditEvent(isEdit && eventId != null ? eventId : null);

  const isSubmitting = createLoading || updateLoading;
  const submitError = createError || updateError;

  useEffect(() => {
    if (!existingEvent) return;
    const startDT = existingEvent.dataInicio ? new Date(existingEvent.dataInicio) : null;
    const endDT = existingEvent.dataFim ? new Date(existingEvent.dataFim) : null;

    const pad = (n: number) => String(n).padStart(2, '0');
    const toDate = (dt: Date | null) =>
      dt ? `${dt.getFullYear()}-${pad(dt.getMonth() + 1)}-${pad(dt.getDate())}` : '';
    const toTime = (dt: Date | null) =>
      dt ? `${pad(dt.getHours())}:${pad(dt.getMinutes())}` : '';

    setForm({
      nome: existingEvent.nome ?? '',
      localizacao: existingEvent.localizacao ?? '',
      responsavel: existingEvent.responsavel ?? '',
      descricao: existingEvent.descricao ?? '',
      startDate: toDate(startDT),
      endDate: toDate(endDT),
      startTime: toTime(startDT),
      endTime: toTime(endDT),
      cargaHoraria: String(existingEvent.cargaHoraria ?? ''),
      status: (existingEvent.status as FormState['status']) ?? 'pendente',
      foto: existingEvent.foto ?? null,
    });
  }, [existingEvent]);

  const errors = useMemo(() => getErrors(form, touched), [form, touched]);
  const canSubmit =
    Object.values(errors).every((e) => e === '') &&
    form.nome.trim().length >= 3 &&
    form.localizacao.trim().length >= 3 &&
    form.responsavel.trim().length >= 3 &&
    form.descricao.trim().length >= 10 &&
    form.startDate.length > 0 &&
    form.endDate.length > 0 &&
    form.startTime.length > 0 &&
    form.endTime.length > 0 &&
    form.cargaHoraria.trim().length > 0 &&
    Number(form.cargaHoraria) >= 0;

  const title = isEdit ? 'Edição de Evento' : 'Cadastrar Evento';
  const subtitle = isEdit
    ? 'Edite as informações do evento abaixo'
    : 'Preencha os dados abaixo para cadastrar um novo evento';
  const actionLabel = isEdit ? 'Salvar' : 'Cadastrar';

  function updateField(field: keyof FormState, value: any) {
    setForm((cur) => ({ ...cur, [field]: value }));
  }

  function markTouched(field: keyof FormState) {
    setTouched((cur) => ({ ...cur, [field]: true }));
  }

  async function handleSubmit() {
    const allTouched = Object.fromEntries(
      Object.keys(form).map((k) => [k, true])
    ) as TouchedState;
    setTouched(allTouched);

    const currentErrors = getErrors(form, allTouched);
    const isValid =
      Object.values(currentErrors).every((e) => e === '') &&
      form.nome.trim().length >= 3 &&
      form.localizacao.trim().length >= 3 &&
      form.responsavel.trim().length >= 3 &&
      form.descricao.trim().length >= 10 &&
      form.startDate.length > 0 &&
      form.endDate.length > 0 &&
      form.startTime.length > 0 &&
      form.endTime.length > 0 &&
      form.cargaHoraria.trim().length > 0 &&
      Number(form.cargaHoraria) >= 0;

    if (!isValid) return;

    const payload = {
      nome: form.nome,
      localizacao: form.localizacao,
      responsavel: form.responsavel,
      descricao: form.descricao,
      dataInicio: toISODateTime(form.startDate, form.startTime),
      dataFim: toISODateTime(form.endDate, form.endTime),
      cargaHoraria: Number(form.cargaHoraria),
      status: form.status,
      foto: form.foto ?? undefined,
    };

    if (isEdit) {
      await handleUpdate(payload);
    } else {
      await handleCreate(payload);
    }
  }

  function handleAddActivity() {
    const newId = crypto.randomUUID();
    setActivities((cur) => [
      ...cur,
      { id: newId, title: '' },
    ]);
    setEditingActivityId(newId);
  }

  function handleRemoveActivity(id: string) {
    setActivities((cur) => cur.filter((a) => a.id !== id));
  }

  function handleEditActivity(id: string) {
    setEditingActivityId(id);
  }

  function handleUpdateActivityTitle(id: string, newTitle: string) {
    setActivities((cur) =>
      cur.map((a) => (a.id === id ? { ...a, title: newTitle } : a))
    );
  }

  if (isEdit && loadingEvent) {
    return (
      <Box
        sx={{
          minHeight: '100dvh',
          background: colorTokens.surface.background,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isEdit && loadError) {
    return (
      <Box
        sx={{
          minHeight: '100dvh',
          background: colorTokens.surface.background,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography color="error">{loadError}</Typography>
        <Button variant="outlined" component={Link} href="/home">
          Voltar ao início
        </Button>
      </Box>
    );
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
                <TextInput label="Nome" value={form.nome} onChange={(v) => updateField('nome', v)} onBlur={() => markTouched('nome')} error={Boolean(errors.nome)} size="small" fullWidth />
                {errors.nome ? <Typography sx={{ mt: 0.4, fontSize: 11, color: 'error.main' }}>{errors.nome}</Typography> : null}
              </Box>

              <Box sx={{ minWidth: 0 }}>
                <TextInput
                  label="Local"
                  value={form.localizacao}
                  onChange={(v) => updateField('localizacao', v)}
                  onBlur={() => markTouched('localizacao')}
                  error={Boolean(errors.localizacao)}
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
                {errors.localizacao ? <Typography sx={{ mt: 0.4, fontSize: 11, color: 'error.main' }}>{errors.localizacao}</Typography> : null}
              </Box>

              <Box sx={{ minWidth: 0 }}>
                <TextInput
                  label="Responsável"
                  value={form.responsavel}
                  onChange={(v) => updateField('responsavel', v)}
                  onBlur={() => markTouched('responsavel')}
                  error={Boolean(errors.responsavel)}
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
                {errors.responsavel ? <Typography sx={{ mt: 0.4, fontSize: 11, color: 'error.main' }}>{errors.responsavel}</Typography> : null}
              </Box>

              <Box sx={{ minWidth: 0 }}>
                <TextInput
                  label="Descrição do evento"
                  value={form.descricao}
                  onChange={(v) => updateField('descricao', v)}
                  onBlur={() => markTouched('descricao')}
                  error={Boolean(errors.descricao)}
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
                {errors.descricao ? <Typography sx={{ mt: 0.4, fontSize: 11, color: 'error.main' }}>{errors.descricao}</Typography> : null}
              </Box>

              <ImageUpload
                label="Imagem do Evento"
                value={form.foto}
                onChange={(value) => updateField('foto', value)}
                onBlur={() => markTouched('foto')}
                error={Boolean(errors.foto)}
                helperText={errors.foto}
              />

              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1.5 }}>
                <Box sx={{ minWidth: 0 }}>
                  <TextInput label="Data de Início" value={form.startDate} onChange={(v) => updateField('startDate', v)} onBlur={() => markTouched('startDate')} error={Boolean(errors.startDate)} size="small" fullWidth type="date" slotProps={{ inputLabel: { shrink: true }, input: { endAdornment: <InputAdornment position="end" /> } }} />
                  {errors.startDate ? <Typography sx={{ mt: 0.4, fontSize: 11, color: 'error.main' }}>{errors.startDate}</Typography> : null}
                </Box>

                <Box sx={{ minWidth: 0 }}>
                  <TextInput label="Data de Término" value={form.endDate} onChange={(v) => updateField('endDate', v)} onBlur={() => markTouched('endDate')} error={Boolean(errors.endDate)} size="small" fullWidth type="date" slotProps={{ inputLabel: { shrink: true }, input: { endAdornment: <InputAdornment position="end" /> } }} />
                  {errors.endDate ? <Typography sx={{ mt: 0.4, fontSize: 11, color: 'error.main' }}>{errors.endDate}</Typography> : null}
                </Box>

                <Box sx={{ minWidth: 0 }}>
                  <TextInput label="Horário de Início" value={form.startTime} onChange={(v) => updateField('startTime', v)} onBlur={() => markTouched('startTime')} error={Boolean(errors.startTime)} size="small" fullWidth type="time" slotProps={{ inputLabel: { shrink: true }, input: { endAdornment: <InputAdornment position="end" /> } }} />
                  {errors.startTime ? <Typography sx={{ mt: 0.4, fontSize: 11, color: 'error.main' }}>{errors.startTime}</Typography> : null}
                </Box>

                <Box sx={{ minWidth: 0 }}>
                  <TextInput label="Horário de Término" value={form.endTime} onChange={(v) => updateField('endTime', v)} onBlur={() => markTouched('endTime')} error={Boolean(errors.endTime)} size="small" fullWidth type="time" slotProps={{ inputLabel: { shrink: true }, input: { endAdornment: <InputAdornment position="end" /> } }} />
                  {errors.endTime ? <Typography sx={{ mt: 0.4, fontSize: 11, color: 'error.main' }}>{errors.endTime}</Typography> : null}
                </Box>
              </Box>

              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1.5 }}>
                <Box sx={{ minWidth: 0 }}>
                  <TextInput
                    label="Carga Horária (h)"
                    value={form.cargaHoraria}
                    onChange={(v) => updateField('cargaHoraria', v)}
                    onBlur={() => markTouched('cargaHoraria')}
                    error={Boolean(errors.cargaHoraria)}
                    size="small"
                    fullWidth
                    type="number"
                    slotProps={{ inputLabel: { shrink: true } }}
                  />
                  {errors.cargaHoraria ? <Typography sx={{ mt: 0.4, fontSize: 11, color: 'error.main' }}>{errors.cargaHoraria}</Typography> : null}
                </Box>

                <Box sx={{ minWidth: 0 }}>
                  <TextField
                    select
                    label="Status"
                    value={form.status}
                    onChange={(e) => updateField('status', e.target.value)}
                    size="small"
                    fullWidth
                  >
                    {STATUS_OPTIONS.map((opt) => (
                      <MenuItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </MenuItem>
                    ))}
                  </TextField>
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
                    {editingActivityId === activity.id ? (
                      <TextInput
                        value={activity.title}
                        onChange={(v) => handleUpdateActivityTitle(activity.id, v)}
                        onBlur={() => setEditingActivityId(null)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') setEditingActivityId(null);
                        }}
                        size="small"
                        fullWidth
                        autoFocus
                        sx={{ fontSize: 14 }}
                      />
                    ) : (
                      <Typography sx={{ fontSize: 14, color: colorTokens.text.primary, fontWeight: 400 }}>{activity.title}</Typography>
                    )}

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <IconButton size="small" aria-label={`Editar ${activity.title}`} onClick={() => handleEditActivity(activity.id)} sx={{ color: colorTokens.neutral.gray500 }}>
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

            {submitError && (
              <Typography sx={{ fontSize: 12, color: 'error.main', textAlign: 'center' }}>
                {submitError}
              </Typography>
            )}

            <Box sx={{ pt: 1.25, display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleSubmit}
                disabled={!canSubmit || isSubmitting}
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
                {isSubmitting ? <CircularProgress size={18} sx={{ color: 'white' }} /> : actionLabel}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
