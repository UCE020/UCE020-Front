import { Typography, Box } from "@mui/material";

interface GreetingSectionProps {
  userName: string;
}

export function GreetingSection({ userName }: GreetingSectionProps) {
  return (
    <Typography
      variant="h5"
      sx={{ py: 3, fontWeight: 700, lineHeight: 1.5, textAlign: "center" }}
    >
      Olá, {userName}! O que temos para{" "}
      <Box component="span" sx={{ color: "#3dd6c8" }}>
        hoje?
      </Box>
    </Typography>
  );
}
