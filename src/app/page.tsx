'use client';

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div style={{ padding: '40px' }}>
      <Stack spacing={3}>
        <Typography variant="h5">Teste de Componente</Typography>
        
        {/* Teste 1: Botão padrão */}
        <Button onClick={() => alert('Funcionou!')}>
          Clique Aqui
        </Button>

        {/* Teste 2: Botão carregando */}
        <Button isLoading color="secondary">
          Carregando
        </Button>
      </Stack>
      <Stack spacing={1} sx={{ py: 2 }}>
        <Typography color="text.secondary">
          Aqui você adiciona suas rotas, componentes e features sem misturar responsabilidades.
        </Typography>
      </Stack>
    </div>
  );
}