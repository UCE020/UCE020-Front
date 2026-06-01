export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(d);
}

export function formatDateTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function formatNumber(value: number, decimals: number = 2): string {
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
}

export function formatActivitySchedule(startDate: Date | string, endDate: Date | string) {
  return {
    dayMonth: formatDate(startDate),
    timeRange: `${formatTime(startDate)} - ${formatTime(endDate)}`,
  };
}

export function formatActivityDate(startDate: Date | string, endDate?: Date | string): string {
  try {
    if (startDate) {
      const start = new Date(startDate);
      const startDay = start.getUTCDate();
      const month = start.toLocaleString('pt-BR', { month: 'long' });
      const year = start.getUTCFullYear();

      if (endDate) {
        const end = new Date(endDate);
        const endDay = end.getUTCDate();
        if (startDay !== endDay) {
          return `${startDay} a ${endDay} de ${month} de ${year}`;
        }
      }
      return `${startDay} de ${month} de ${year}`;
    } else {
      return 'Data não informada';
    }
  } catch {
    return 'Data indisponível';
  }
}
