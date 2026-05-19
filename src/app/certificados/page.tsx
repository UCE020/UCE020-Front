"use client";

import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  IconButton,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useRouter } from "next/navigation";

import { Header } from "@/components/ui/Header";
import { CertificateCard } from "@/components/CertificateCard";

// Mock data
const MOCK_CERTIFICATES = [
  {
    id: "cert-001",
    title: "Palestra: O futuro da IA",
    issuedDate: "2024-05-10",
  },
  {
    id: "cert-002",
    title: "Oficina: Circuitos Digitais",
    issuedDate: "2024-05-12",
  },
  {
    id: "cert-003",
    title: "Atividade: Nome da atividade",
    issuedDate: "2024-05-15",
  },
];

const NAV_LINKS = [
  { label: "Início", href: "/home" },
  { label: "Certificados", href: "/certificados" },
  { label: "Inscrições", href: "/inscricoes" },
  { label: "Criar evento", href: "/criar-evento" },
  { label: "Eventos Criados", href: "/eventos-criados" },
  { label: "Monitoria", href: "/monitoria" },
];

const USER = { name: "João" };

export default function CertificatesPage() {
  const router = useRouter();
  const [certificates] = useState(MOCK_CERTIFICATES);

  return (
    <Box sx={{ minHeight: "100dvh", bgcolor: "background.default" }}>
      <Header
        user={USER}
        navLinks={NAV_LINKS}
        onLogout={() => console.log("logout")}
      />

      <Container maxWidth="md" sx={{ py: { xs: 3, sm: 4 } }}>
        {/* Header */}
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 2, mb: 4 }}>
          <IconButton
            onClick={() => router.back()}
            size="small"
            sx={{
              color: "text.secondary",
              "&:hover": { bgcolor: "background.default" },
            }}
          >
            <ArrowBack />
          </IconButton>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: "text.primary",
            }}
          >
            Certificados
          </Typography>
        </Box>

        {/* Lista de Certificados */}
        {certificates.length > 0 ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {certificates.map((cert) => (
              <CertificateCard
                key={cert.id}
                id={cert.id}
                title={cert.title}
                issuedDate={cert.issuedDate}
              />
            ))}
          </Box>
        ) : (
          <Typography color="text.secondary" sx={{ textAlign: "center", py: 4 }}>
            Você ainda não tem certificados criados
          </Typography>
        )}
      </Container>
    </Box>
  );
}
