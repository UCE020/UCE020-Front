interface MonitoriaEmptyStateProps {
  hasFilters: boolean;
  onClearFilters: () => void;
}

export function MonitoriaEmptyState({
  hasFilters,
  onClearFilters,
}: MonitoriaEmptyStateProps) {
  return (
    <div className="bg-white rounded-[20px] px-6 py-16 flex flex-col items-center text-center">
      {/* Ícone */}
      <div className="w-16 h-16 rounded-2xl bg-[#2EC4A0]/10 flex items-center justify-center mb-4">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#2EC4A0"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      </div>

      {hasFilters ? (
        <>
          <p className="font-bold text-[#0F1D35] text-base mb-1">
            Nenhuma monitoria encontrada
          </p>
          <p className="text-gray-500 text-sm max-w-xs mb-5">
            Nenhum resultado para os filtros aplicados. Tente ajustar a busca.
          </p>
          <button
            onClick={onClearFilters}
            className="px-5 py-2.5 bg-[#2EC4A0] text-white text-sm font-semibold rounded-xl hover:bg-[#24a98a] transition-colors"
          >
            Limpar filtros
          </button>
        </>
      ) : (
        <>
          <p className="font-bold text-[#0F1D35] text-base mb-1">
            Você ainda não é monitor
          </p>
          <p className="text-gray-500 text-sm max-w-xs">
            Quando você for atribuído como monitor, as monitorias aparecerão
            aqui.
          </p>
        </>
      )}
    </div>
  );
}