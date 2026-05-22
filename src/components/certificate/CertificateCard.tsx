import Link from "next/link";
import { Box, Card, Typography } from "@mui/material";
import { ChevronRight } from "@mui/icons-material";

interface CertificateCardProps {
  id: string;
  title: string;
  issuedDate: string;
}

export function CertificateCard({ id, title, issuedDate }: CertificateCardProps) {
  return (
    <Card
      component={Link}
      href={`/certificados/${id}`}
      sx={{
        bgcolor: "#00856F",
        color: "#FFFFFF",
        borderRadius: 3,
        p: 3,
        cursor: "pointer",
        textDecoration: "none",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "all 0.3s ease",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        "&:hover": {
          bgcolor: "#006B58",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)",
          transform: "translateY(-2px)",
        },
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: "#FFFFFF",
            mb: 0.5,
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "rgba(255, 255, 255, 0.8)",
          }}
        >
          {new Date(issuedDate).toLocaleDateString("pt-BR")}
        </Typography>
      </Box>
      <ChevronRight
        sx={{
          color: "#FFFFFF",
          fontSize: 28,
          ml: 2,
        }}
      />
    </Card>
  );
}
