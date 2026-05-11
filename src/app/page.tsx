import { redirect } from "next/navigation";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

export default function Home() {

  redirect("/home");

   return (
     <Stack spacing={1} sx={{ py: 2 }}>
       <Typography color="text.secondary">
         Aqui você adiciona suas rotas, componentes e features sem misturar responsabilidades.
       </Typography>
     </Stack>
   );
}
