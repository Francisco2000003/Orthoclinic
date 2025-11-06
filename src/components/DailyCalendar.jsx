// src/components/DailyCalendar.jsx
import { useEffect, useMemo, useState } from "react"
import { format, addDays, isToday, isBefore, parse } from "date-fns"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import { AVAILABILITY, defaultSlotsForDate } from "../data/availability"

export default function DailyCalendar({ person, onPick }) {
  // Estado de la fecha activa (arranca en HOY)
  const [date, setDate] = useState(new Date())
  const slug = person?.slug

  // Fecha formateada para keys del mapa
  const ymd = useMemo(() => format(date, "yyyy-MM-dd"), [date])

  // Slots para el día: preferimos disponibilidad explícita; si no hay, usamos fallback
  const slots = useMemo(() => {
    const explicit = AVAILABILITY[slug]?.[ymd]
    return explicit ?? defaultSlotsForDate(date)
  }, [slug, ymd, date])

  // Deshabilitar horarios pasados si el día es hoy
  function isPastSlot(hhmm) {
    if (!isToday(date)) return false
    const now = new Date()
    // Construimos una fecha con la hora del slot para compararla
    const slotDate = parse(hhmm, "HH:mm", new Date())
    // “slotDate” está con la fecha de hoy (parse usa hoy por defecto)
    return isBefore(slotDate, now)
  }

  // Handlers navegación
  const goToday = () => setDate(new Date())
  const prevDay = () => setDate(d => addDays(d, -1))
  const nextDay = () => setDate(d => addDays(d, 1))

  // UX: si no hay horarios, lo mostramos; si hay, botones seleccionables
  return (
    <div className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
      {/* Header fecha + acciones */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-brand-600" />
          <div className="font-semibold">
            {format(date, "EEEE d 'de' MMMM yyyy")}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={goToday} className="btn btn-ghost">Hoy</button>
          <button onClick={prevDay} className="btn btn-ghost" aria-label="Día anterior">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button onClick={nextDay} className="btn btn-ghost" aria-label="Día siguiente">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Horarios */}
      <div className="mt-4">
        {slots.length === 0 ? (
          <div className="text-sm text-slate-600 dark:text-slate-300">
            Sin horarios para este día.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {slots.map(time => {
              const disabled = isPastSlot(time)
              return (
                <button
                  key={time}
                  type="button"
                  disabled={disabled}
                  onClick={() => onPick({ date: ymd, time })}
                  className={`px-3 py-2 rounded-xl border text-sm
                    ${disabled
                      ? "border-slate-200 text-slate-400 cursor-not-allowed"
                      : "border-brand-200 hover:bg-brand-50 text-brand-700"}`}
                >
                  {time}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
