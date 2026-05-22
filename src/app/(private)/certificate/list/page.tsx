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

import { CertificateCard } from "@/components/certificate";

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

export default function CertificatesPage() {
  const router = useRouter();
  const [certificates] = useState(MOCK_CERTIFICATES);

  return (
    <Box sx={{ minHeight: "100dvh", bgcolor: "background.default" }}>

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
