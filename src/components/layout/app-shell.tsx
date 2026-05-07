import type { PropsWithChildren } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

export default function AppShell({ children }: PropsWithChildren) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Container component="main" sx={{ flex: 1, py: { xs: 4, md: 8 } }}>
        {children}
      </Container>
    </Box>
  );
}