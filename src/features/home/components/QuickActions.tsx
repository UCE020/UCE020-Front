"use client";

import { Box } from "@mui/material";
import { useRouter } from "next/navigation";

const QUICK_ACTIONS = [
  { line1: "criar novo",  line2: "evento",       variant: "navy", href: "/criar-evento"    },
  { line1: "meus",        line2: "certificados", variant: "teal", href: "/certificados"    },
  { line1: "eventos",     line2: "criados",      variant: "teal", href: "/eventos-criados" },
  { line1: "monitoria",   line2: "de eventos",   variant: "navy", href: "/monitoria"       },
] as const;

export function QuickActions() {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 140px)",
        gap: 1,
        justifyContent: "center",
        mb: 1,
      }}
    >
      {QUICK_ACTIONS.map((action) => (
        <Box
          key={action.href}
          component="button"
          onClick={() => router.push(action.href)}
          sx={{
            width: 140,
            height: 122,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
            bgcolor: action.variant === "navy" ? "#1a2744" : "#3dd6c8",
            color: "#fff",
            fontSize: 18,
            fontWeight: 700,
            lineHeight: 1.35,
            textAlign: "center",
            p: "10px 8px",
            fontFamily: "inherit",
            transition: "filter .15s, transform .15s",
            "&:hover": { filter: "brightness(0.88)", transform: "translateY(-1px)" },
          }}
        >
          {action.line1}<br />{action.line2}
        </Box>
      ))}
    </Box>
  );
}
