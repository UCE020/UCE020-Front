import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1a2744",        // navy — botões escuros (criar evento, certificados)
      light: "#223260",
      dark: "#111b30",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#3dd6c8",        // teal — botões claros (eventos criados, monitoria)
      light: "#6fe4da",
      dark: "#2ab8ab",
      contrastText: "#1a2744",
    },
    background: {
      default: "#ffffff",     // fundo geral branco
      paper: "#f4f6f9",       // cards e superfícies elevadas
    },
    text: {
      primary: "#0f172a",
      secondary: "#64748b",
    },
    divider: "rgba(0,0,0,0.08)",
  },
  shape: {
    borderRadius: 14,
  },
  typography: {
    fontFamily: "var(--font-geist-sans), Inter, system-ui, sans-serif",
    h1: {
      fontWeight: 800,
      letterSpacing: "-0.04em",
    },
    h2: {
      fontWeight: 800,
      letterSpacing: "-0.035em",
    },
    button: {
      textTransform: "none",
      fontWeight: 700,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          "&:hover": { boxShadow: "none" },
          transition: "transform .15s, filter .15s, background-color .2s",
          "&:hover:not(:disabled)": {
            transform: "translateY(-2px)",
            filter: "brightness(1.08)",
          },
          "&:active": {
            transform: "translateY(0)",
          },
        },
        containedPrimary: {
          backgroundColor: "#1a2744",
          "&:hover": { backgroundColor: "#223260" },
        },
        containedSecondary: {
          backgroundColor: "#3dd6c8",
          color: "#1a2744",
          "&:hover": { backgroundColor: "#2fc4b7" },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#ffffff",
          color: "#0f172a",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#f4f6f9",
          backgroundImage: "none",
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#1a2744",  // drawer continua navy (igual ao Figma)
          backgroundImage: "none",
        },
      },
    },
  },
});

export default theme;
