import { MonitoriaView } from "@/features/monitoria";

export const metadata = {
  title: "Minhas Monitorias",
  description: "Disciplinas em que você atua como monitor",
};

export default function MonitoriasPage() {
  return <MonitoriaView />;
}