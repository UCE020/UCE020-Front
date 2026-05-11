import { Box, IconButton, Avatar } from "@mui/material";
import { Menu, Person } from "@mui/icons-material";

interface TopBarProps {
  onMenuClick: () => void;
}

export function TopBar({ onMenuClick }: TopBarProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 3,
        py: 2,
        maxWidth: 1200,
        mx: "auto",
      }}
    >
      <IconButton onClick={onMenuClick} aria-label="Abrir menu">
        <Menu />
      </IconButton>
      <Avatar sx={{ bgcolor: "#3dd6c8", color: "#1a2744", width: 36, height: 36 }}>
        <Person fontSize="small" />
      </Avatar>
    </Box>
  );
}
