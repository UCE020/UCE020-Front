import { Paper, InputBase } from "@mui/material";
import { Search } from "@mui/icons-material";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = "procurar evento" }: SearchBarProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        px: 2,
        py: 1,
        borderRadius: 50,
        bgcolor: "#f0f2f5",
        mt: 1,
      }}
    >
      <Search sx={{ color: "text.secondary", fontSize: 18 }} />
      <InputBase
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        fullWidth
        inputProps={{ "aria-label": placeholder }}
      />
    </Paper>
  );
}
