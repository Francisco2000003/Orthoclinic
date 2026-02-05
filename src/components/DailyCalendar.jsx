import { useMemo, useState } from "react";
import {
  addDays,
  format,
  isAfter,
  isBefore,
  isSameDay,
  startOfDay,
  addMinutes,
} from "date-fns";
import { es } from "date-fns/locale";
import clsx from "clsx";

/**
 * Calendario diario “premium”
 * - Muestra días: hoy → hoy + 13 (14 días en total)
 * - Oculta días anteriores; si hoy cambia, se actualiza al recargar.
 * - Horas fijas 09:00–20:00.
 * - Médicos (role incluye “médico” u “ortop”): intervalos de 30 min.
 * - Fisioterapeutas (role incluye “fisio”): intervalos de 60 min.
 * - No muestra horarios anteriores a la hora actual si el día seleccionado es hoy.
 *
 * Props:
 * - person: { role?: string, ... } (usado para ajustar duración)
 * - onPick?: ({date, time}) => void
 */
export default function DailyCalendar({ person, onPick }) {
  // Config fechas: [hoy, hoy+13]
  const today = startOfDay(new Date());
  const days = useMemo(() => {
    return Array.from({ length: 14 }, (_, i) => addDays(today, i));
  }, [today]);

  // Día seleccionado por defecto: hoy
  const [selected, setSelected] = useState(today);

  // Duración por rol
  const role = (person?.role || "").toLowerCase();
  const isPhysio = role.includes("fisio");
  const slotMinutes = isPhysio ? 60 : 30;

  // Genera slots entre 09:00 y 20:00
  const slots = useMemo(() => {
    const start = new Date(selected);
    start.setHours(9, 0, 0, 0);
    const end = new Date(selected);
    end.setHours(20, 0, 0, 0);

    const out = [];
    let cursor = start;
    const now = new Date();

    while (!isAfter(cursor, end)) {
      // Si es hoy, oculta los horarios pasados
      if (!isSameDay(selected, today) || isAfter(cursor, now)) {
        out.push(new Date(cursor));
      }
      cursor = addMinutes(cursor, slotMinutes);
    }
    // No dejes el último exacto en 20:00 si se pasó al sumar
    return out.filter((d) => !isAfter(d, end));
  }, [selected, slotMinutes, today]);

  const handlePick = (d) => {
    const dateStr = format(selected, "yyyy-MM-dd");
    const timeStr = format(d, "HH:mm");
    onPick?.({ date: dateStr, time: timeStr });
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-cyan-400">
            Disponibilidad
          </p>
          <h3 className="text-lg font-semibold text-white">
            {format(selected, "EEEE d 'de' MMMM", { locale: es })}
          </h3>
          <p className="text-xs text-slate-400">
            Horario de {isPhysio ? "fisioterapia" : "consulta"}: 9:00 – 20:00
          </p>
        </div>
      </div>

      {/* Días (chips scrollable) */}
      <div className="no-scrollbar flex gap-2 overflow-x-auto py-1">
        {days.map((d) => {
          const isSel = isSameDay(d, selected);
          const isPast = isBefore(d, today);
          if (isPast) return null; // nunca mostrar días anteriores

          return (
            <button
              key={+d}
              onClick={() => setSelected(d)}
              className={clsx(
                "rounded-xl px-3 py-2 text-left ring-1 transition",
                "min-w-[110px]",
                isSel
                  ? "bg-cyan-500/10 text-cyan-200 ring-cyan-400/30"
                  : "bg-white/5 text-slate-200 ring-white/10 hover:bg-white/10"
              )}
            >
              <span className="block text-[11px] uppercase tracking-wide">
                {format(d, "EEE", { locale: es })}
              </span>
              <span className="block text-sm font-semibold">
                {format(d, "d 'de' MMM", { locale: es })}
              </span>
            </button>
          );
        })}
      </div>

      {/* Rejilla de horarios */}
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
        {slots.length === 0 ? (
          <p className="col-span-full rounded-xl bg-white/5 p-4 text-center text-sm text-slate-300 ring-1 ring-white/10">
            No hay horarios disponibles hoy. Prueba con otro día.
          </p>
        ) : (
          slots.map((d) => {
            const label = format(d, "hh:mm aaaa", { locale: es }); // 03:00 p. m.
            return (
              <button
                key={+d}
                onClick={() => handlePick(d)}
                className="
                  rounded-xl bg-white/5 px-3 py-2 text-sm font-medium text-slate-100
                  ring-1 ring-white/10 transition hover:bg-white/10 focus:outline-none
                  focus-visible:ring-2 focus-visible:ring-cyan-400/60
                "
              >
                {label}
              </button>
            );
          })
        )}
      </div>

      <p className="text-xs text-slate-500">
        * Sólo se muestran fechas futuras y hasta dos semanas a partir de hoy.
      </p>
    </div>
  );
}
