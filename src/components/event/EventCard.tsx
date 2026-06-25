/* eslint-disable @next/next/no-img-element */
import type { EventCardProps } from "@/types/event";

function formatDateRange(start: string, end: string): string {
  const fmt = (date: string) =>
    new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  return `${fmt(start)} a ${fmt(end)}`;
}

export function EventCard({ event, onClick }: EventCardProps) {
  const imageSrc = event.foto || "/images/certificadoVariacao2.png";

  return (
    <button
      type="button"
      onClick={() => onClick?.(event)}
      className="group w-full text-left flex items-center gap-4 bg-white rounded-[20px] px-5 py-4 hover:shadow-md transition-shadow duration-200"
    >
      <div className="relative w-[90px] h-[85px] flex-shrink-0 rounded-[40px] overflow-hidden bg-[#f0faf7]">
        <img
          src={imageSrc}
          alt={event.nome}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-[#0F1D35] text-[15px] leading-snug group-hover:text-[#2EC4A0] transition-colors line-clamp-1 mb-1.5">
          {event.nome}
        </h3>

        <div className="flex flex-col gap-0.5">
          <p className="text-[13px] text-gray-600">
            <span className="font-semibold text-gray-800">Data:</span>{" "}
            {formatDateRange(event.dataInicio, event.dataFim)}
          </p>
          <p className="text-[13px] text-gray-600">
            <span className="font-semibold text-gray-800">Local:</span>{" "}
            {event.localizacao || "A definir"}
          </p>
          <p className="text-[13px] text-gray-600">
            <span className="font-semibold text-gray-800">Carga horária:</span>{" "}
            {event.cargaHoraria}h
          </p>
        </div>
      </div>
    </button>
  );
}
