'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import {
  ActivityModal,
  ConfirmModal,
  DialogModal,
  RegisterGuestModal,
} from '@/components/modals';
import { Button, PasswordInput, SelectInput, TextInput } from '@/components/ui';

const roleOptions = [
  { value: 'palestrante', label: 'Palestrante' },
  { value: 'participante', label: 'Participante' },
  { value: 'ouvinte', label: 'Ouvinte (indisponível)', disabled: true },
  { value: 'organizador', label: 'Organizador' },
] as const;

const statusOptions = [
  { value: 'ativo', label: 'Ativo' },
  { value: 'inativo', label: 'Inativo' },
  { value: 'pendente', label: 'Pendente' },
] as const;

export default function TestePage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');
  const [password, setPassword] = useState('');
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const [openConfirm, setOpenConfirm] = useState(false);
  const [openGuest, setOpenGuest] = useState(false);
  const [openActivitySignup, setOpenActivitySignup] = useState(false);
  const [openActivityManage, setOpenActivityManage] = useState(false);
  const [openShell, setOpenShell] = useState(false);

  const canSubmit =
    name.trim().length > 2 && email.includes('@') && role.length > 0 && password.length >= 6;

  const hasNameError = name.trim().length > 0 && name.trim().length < 3;
  const hasEmailError = email.trim().length > 0 && !email.includes('@');
  const hasPasswordError = password.trim().length > 0 && password.length < 6;

  return (
    <Container sx={{ py: 4 }} maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 700, color: 'text.primary' }}>
        /teste: Componentes do sistema
      </Typography>
      <Typography sx={{ mb: 4, color: 'text.secondary' }}>
        Página temporária só para visualizar e testar os componentes
      </Typography>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Inputs e Forms
            </Typography>

            <Box sx={{ display: 'grid', gap: 2.5 }}>
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                  Campos de Texto
                </Typography>
                <Box sx={{ display: 'grid', gap: 2 }}>
                  <TextInput
                    label="Nome completo"
                    value={name}
                    onChange={setName}
                    error={hasNameError}
                    helperText={
                      hasNameError ? 'Informe pelo menos 3 caracteres.' : 'Campo obrigatório'
                    }
                  />
                  <TextInput
                    label="E-mail"
                    type="email"
                    value={email}
                    onChange={setEmail}
                    error={hasEmailError}
                    helperText={hasEmailError ? 'Informe um e-mail válido.' : 'Campo obrigatório'}
                  />
                  <TextInput
                    label="Telefone"
                    value={phone}
                    onChange={setPhone}
                    placeholder="(99) 99999-9999"
                  />
                  <TextInput
                    label="Endereço"
                    value={address}
                    onChange={setAddress}
                    placeholder="Rua, número, bairro..."
                  />
                </Box>
              </Box>

              <Divider />

              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                  Campos de Senha
                </Typography>
                <Box sx={{ display: 'grid', gap: 2 }}>
                  <PasswordInput
                    label="Senha"
                    value={password}
                    onChange={setPassword}
                    error={hasPasswordError}
                    helperText={
                      hasPasswordError ? 'Use no mínimo 6 caracteres.' : 'Campo obrigatório'
                    }
                    autoComplete="new-password"
                  />
                  <PasswordInput
                    label="Confirmar senha"
                    value={password}
                    onChange={setPassword}
                    showVisibilityToggle={true}
                    helperText="Repetindo automaticamente o mesmo valor do campo Senha acima."
                  />
                </Box>
              </Box>

              <Divider />

              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                  Selects
                </Typography>
                <Box sx={{ display: 'grid', gap: 2 }}>
                  <SelectInput
                    label="Função"
                    placeholder="Selecione a função"
                    value={role}
                    onChange={setRole}
                    options={roleOptions}
                    helperText="Com opção desabilitada."
                  />
                  <SelectInput
                    label="Status"
                    placeholder="Selecione o status"
                    value={status}
                    onChange={setStatus}
                    options={statusOptions}
                  />
                </Box>
              </Box>

              <Divider />

              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                  Área de Texto
                </Typography>
                <TextInput
                  multiline
                  minRows={4}
                  label="Descrição"
                  placeholder="Digite uma descrição..."
                  value={description}
                  onChange={setDescription}
                />
              </Box>

              <Divider />

              <Box>
                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                  Capturas do Formulário
                </Typography>
                <Box sx={{ display: 'grid', gap: 1 }}>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                    Nome: {name || '—'}
                  </Typography>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                    E-mail: {email || '—'}
                  </Typography>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                    Função: {role || '—'}
                  </Typography>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                    Status: {status || '—'}
                  </Typography>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 600 }}>
                    Formulário válido: {canSubmit ? 'Sim' : 'Não'}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Botões
            </Typography>

            <Box sx={{ display: 'grid', gap: 3 }}>
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                  Variants Contained
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                  <Button variant="contained" color="primary">
                    Primary
                  </Button>
                  <Button variant="contained" color="secondary">
                    Secondary
                  </Button>
                  <Button variant="contained" color="success">
                    Success
                  </Button>
                  <Button variant="contained" color="error">
                    Error
                  </Button>
                  <Button variant="contained" color="warning">
                    Warning
                  </Button>
                </Box>
              </Box>

              <Box>
                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                  Variants Outlined
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                  <Button variant="outlined" color="primary">
                    Primary
                  </Button>
                  <Button variant="outlined" color="secondary">
                    Secondary
                  </Button>
                  <Button variant="outlined" color="success">
                    Success
                  </Button>
                  <Button variant="outlined" color="error">
                    Error
                  </Button>
                  <Button variant="outlined" color="warning">
                    Warning
                  </Button>
                </Box>
              </Box>

              <Box>
                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                  Variants Text
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                  <Button variant="text" color="primary">
                    Primary
                  </Button>
                  <Button variant="text" color="secondary">
                    Secondary
                  </Button>
                  <Button variant="text" color="success">
                    Success
                  </Button>
                  <Button variant="text" color="error">
                    Error
                  </Button>
                  <Button variant="text" color="warning">
                    Warning
                  </Button>
                </Box>
              </Box>

              <Box>
                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                  Estados
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                  <Button variant="contained" disabled>
                    Disabled
                  </Button>
                  <Button variant="contained" isLoading>
                    Loading
                  </Button>
                  <Button variant="outlined" disabled>
                    Disabled
                  </Button>
                </Box>
              </Box>

              <Box>
                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                  Ícones
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                  <Button variant="contained" leftIcon="saborrricon">
                    Left Icon contained
                  </Button>
                  <Button variant="outlined" rightIcon="saborrricon">
                    Right Icon outlined
                  </Button>
                  <Button variant="text" leftIcon="saborrricon">
                    Favorite text
                  </Button>
                </Box>
              </Box>

              <Box>
                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                  Tamanhos variados
                </Typography>
                <Box sx={{ display: 'grid', gap: 1.5 }}>
                  <Button variant="contained" sx={{ width: '100%' }}>
                    Full Width
                  </Button>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button variant="contained" sx={{ flex: 1 }}>
                      Flex 1
                    </Button>
                    <Button variant="outlined" sx={{ flex: 1 }}>
                      Flex 1
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid size={12}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Modais
            </Typography>
            <Typography sx={{ color: 'text.secondary', mb: 3 }}>Todos os modais.</Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              <Button variant="contained" color="secondary" onClick={() => setOpenConfirm(true)}>
                ConfirmModal
              </Button>
              <Button variant="outlined" color="secondary" onClick={() => setOpenGuest(true)}>
                RegisterGuestModal
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenActivitySignup(true)}
              >
                ActivityModal (Signup)
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setOpenActivityManage(true)}
              >
                ActivityModal (Manage)
              </Button>
              <Button variant="text" color="primary" onClick={() => setOpenShell(true)}>
                DialogModal
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Modals */}
      <ConfirmModal
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        message="Deseja cancelar participação no evento"
        emphasisEndText="Atividade 1"
        confirmText="Confirmar"
        cancelText="Não"
        onConfirm={async () => Promise.resolve()}
      />

      <RegisterGuestModal
        open={openGuest}
        onClose={() => setOpenGuest(false)}
        activityTitle="Título da atividade"
        activityDate='2026/08/19'
        activityLocation="Auditório Central - UEFS"
        roleOptions={[...roleOptions]}
        onSubmit={async () => Promise.resolve()}
      />

      <ActivityModal
        open={openActivitySignup}
        onClose={() => setOpenActivitySignup(false)}
        title="Evento exemplo"
        variant="signup"
        image="/card.png"
        startDate="2026-04-15"
        endDate="2026-04-19"
        location="Campus principal"
        hours={20}
        participantsCount={186}
        status="Inscrições abertas"
        description="Texto de descrição para testar expansão “ver mais”. Repetido para preencher o bloco. Texto de descrição para testar expansão “ver mais”. Repetido para preencher o bloco. Repetido para preencher o bloco. Repetido para preencher o bloco. Repetido para preencher o bloco. Repetido para preencher o bloco. Repetido para preencher o bloco."
        onSignup={async () => Promise.resolve()}
      />

      <ActivityModal
        open={openActivityManage}
        onClose={() => setOpenActivityManage(false)}
        title="Workshop exemplo"
        variant="manage"
        image="/card.png"
        startDate="2026-05-10"
        location="Laboratório 5"
        hours={4}
        participantsCount={30}
        status="Em andamento"
        description="Descrição curta para variante com dois botões."
        onCancelParticipation={async () => Promise.resolve()}
        onMarkPresence={async () => Promise.resolve()}
      />

      <DialogModal
        open={openShell}
        onClose={() => setOpenShell(false)}
        title="DialogModal + Button"
        footer={
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1.5 }}>
            <Button variant="outlined" color="secondary" onClick={() => setOpenShell(false)}>
              Fechar
            </Button>
            <Button variant="contained" color="secondary" onClick={() => setOpenShell(false)}>
              OK
            </Button>
          </Box>
        }
      >
        <Typography color="text.secondary">
          O rodapé ta usando o componente <Box component="code">Button</Box> do projeto.
        </Typography>
      </DialogModal>
    </Container>
  );
}
