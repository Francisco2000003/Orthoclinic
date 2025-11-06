// src/data/availability.js
import { format, addDays, isSunday, isSaturday } from "date-fns"

// Genera slots por defecto (lun-sáb); dom = sin horarios
export function defaultSlotsForDate(date) {
  if (isSunday(date)) return []             // Domingos: cerrado
  // Sábados: menos horarios
  if (isSaturday(date)) return ["09:00", "10:00", "12:00"]
  // Lun–Vie
  return ["09:00", "10:00", "12:00", "16:00"]
}

// Mapa demo de disponibilidad específica (reemplazable por API)
export const AVAILABILITY = {
  "dr-hernandez": {
    // Ejemplos: ajusta a tus fechas reales
    [format(new Date(), "yyyy-MM-dd")]: ["10:00", "12:00", "16:00"],
    [format(addDays(new Date(), 1), "yyyy-MM-dd")]: ["09:00", "10:00", "12:00", "16:00"],
  },
  "dr-puig": {
    [format(new Date(), "yyyy-MM-dd")]: ["09:00", "11:00", "13:00"],
  },
  "fisio-ana": {},
  "fisio-luis": {},
}
