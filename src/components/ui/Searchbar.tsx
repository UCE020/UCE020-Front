import { Paper, InputBase } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { Search } from "@mui/icons-material";

interface SearchbarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  sx?: SxProps<Theme>;
}

export function Searchbar({ value, onChange, placeholder = "procurar evento", sx }: SearchbarProps) {
  return (
    <Paper
      elevation={0}
      sx={[
        {
          display: "flex",
          alignItems: "center",
          gap: 1,
          px: 2,
          py: 1,
          borderRadius: 50,
          bgcolor: "#FFF",
          mt: 1,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
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

export default Searchbar;
