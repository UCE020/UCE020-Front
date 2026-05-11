"use client";

import {
  Drawer, Box, Typography,
  IconButton, List, ListItem,
  ListItemIcon, ListItemText,
} from "@mui/material";
import {
  Close, Home, Description,
  Assignment, AddCircle,
  CalendarMonth, BarChart,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";

const NAV_ITEMS = [
  { icon: <Home />,          label: "Início",          href: "/home"            },
  { icon: <Description />,   label: "Certificados",    href: "/certificados"    },
  { icon: <Assignment />,    label: "Inscrições",      href: "/inscricoes"      },
  { icon: <AddCircle />,     label: "Criar evento",    href: "/criar-evento"    },
  { icon: <CalendarMonth />, label: "Eventos Criados", href: "/eventos-criados" },
  { icon: <BarChart />,      label: "Monitoria",       href: "/monitoria"       },
];

interface AppDrawerProps {
  open: boolean;
  onClose: () => void;
  activeHref?: string;
}

export function AppDrawer({ open, onClose, activeHref = "/home" }: AppDrawerProps) {
  const router = useRouter();

  function handleNav(href: string) {
    router.push(href);
    onClose();
  }

  return (
    <Drawer
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            backgroundColor: "#1a2744",
            color: "#fff",
            width: 280,
          },
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2.5,
          py: 2.5,
          borderBottom: "1px solid rgba(255,255,255,.07)",
        }}
      >
        <Typography
          fontWeight={800}
          fontSize={17}
          sx={{ color: "#3dd6c8", letterSpacing: "-.5px" }}
        >
          Kauan
        </Typography>
        <IconButton onClick={onClose} sx={{ color: "rgba(255,255,255,0.5)" }}>
          <Close />
        </IconButton>
      </Box>

      <List sx={{ pt: 1.5 }}>
        {NAV_ITEMS.map((item) => {
          const isActive = item.href === activeHref;
          return (
            <ListItem
              key={item.href}
              onClick={() => handleNav(item.href)}
              sx={{
                borderRadius: "0 50px 50px 0",
                mr: 2,
                cursor: "pointer",
                bgcolor: isActive ? "rgba(61,214,200,.18)" : "transparent",
                color: isActive ? "#3dd6c8" : "rgba(255,255,255,0.85)",
                "&:hover": {
                  bgcolor: "rgba(61,214,200,.12)",
                  color: "#3dd6c8",
                },
              }}
            >
              <ListItemIcon sx={{ color: "inherit", minWidth: 36 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                slotProps={{
                  primary: { style: { fontWeight: 600, fontSize: 14 } },
                }}
              />
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
}
