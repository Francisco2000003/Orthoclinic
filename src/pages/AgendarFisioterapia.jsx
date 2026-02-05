// src/pages/AgendaFisioterapia.jsx
import { Link, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  ShieldCheck,
  CalendarDays,
  Clock,
  User,
  Phone,
  CheckCircle2,
  Info,
  Sparkles,
} from "lucide-react";
import { useMemo, useState } from "react";

function useQuery() {
  const { search } = useLocation();
  return new URLSearchParams(search);
}

// ✅ Cambia este número por el WhatsApp real (formato internacional sin +)
const WHATSAPP_NUMBER = "5210000000000"; // ej: 5212710000000

const LS_KEY = "clinic.bookings.physio.v1";

function pad2(n) {
  return String(n).padStart(2, "0");
}
function formatDateISO(d) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}
function formatDatePretty(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("es-MX", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
function formatTimePretty(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  const ampm = h >= 12 ? "p.m." : "a.m.";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${pad2(h12)}:${pad2(m)} ${ampm}`;
}
function buildNextDays(n = 14) {
  const out = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = 0; i < n; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    out.push(formatDateISO(d));
  }
  return out;
}
function buildSlots({ startHour = 9, endHour = 20, stepMin = 60 }) {
  const out = [];
  for (let h = startHour; h < endHour; h++) {
    for (let m = 0; m < 60; m += stepMin) {
      out.push(`${pad2(h)}:${pad2(m)}`);
    }
  }
  return out;
}
function loadBookings() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function saveBookings(list) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(list));
  } catch {}
}
function normalizePhone(s) {
  return (s || "").replace(/\D/g, "").slice(0, 10);
}

function StepPill({ n, title, active }) {
  return (
    <div
      className={[
        "flex items-center gap-3 rounded-2xl px-4 py-3 ring-1",
        active
          ? "bg-sky-500/10 text-white ring-sky-400/30"
          : "bg-slate-950/40 text-slate-200 ring-white/10",
      ].join(" ")}
    >
      <span
        className={[
          "grid h-7 w-7 place-items-center rounded-full text-xs font-bold ring-1",
          active
            ? "bg-sky-500 text-white ring-sky-400/40"
            : "bg-slate-900 text-slate-200 ring-white/10",
        ].join(" ")}
      >
        {n}
      </span>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold">{title}</p>
        <p className="text-[11px] text-slate-400">
          {n === 1 ? "Servicio, fecha y horario" : n === 2 ? "Tus datos" : "Confirmación"}
        </p>
      </div>
    </div>
  );
}

export default function AgendaFisioterapia() {
  const q = useQuery();
  const tipo = q.get("tipo"); // "adulto-mayor" | "funcional" | null

  const title =
    tipo === "adulto-mayor"
      ? "Agenda: Activación física (adulto mayor)"
      : tipo === "funcional"
      ? "Agenda: Fisioterapia general y funcional"
      : "Agenda: Fisioterapia";

  const desc =
    tipo === "adulto-mayor"
      ? "Movilidad, equilibrio, fuerza suave, acondicionamiento físico y prevención de caídas."
      : tipo === "funcional"
      ? "Rehabilitación, terapia manual, readaptación, electroterapia y recuperación funcional."
      : "Agenda general de fisioterapia.";

  const services = useMemo(() => {
    if (tipo === "adulto-mayor") {
      return [
        { id: "am-45", label: "Activación física (adulto mayor) — 45 min", minutes: 45 },
        { id: "am-60", label: "Activación física (adulto mayor) — 60 min", minutes: 60 },
      ];
    }
    // funcional / general
    return [
      { id: "fn-60", label: "Fisioterapia general y funcional — 60 min", minutes: 60 },
    ];
  }, [tipo]);

  const dateOptions = useMemo(() => buildNextDays(14), []);
  const allSlots = useMemo(() => buildSlots({ startHour: 9, endHour: 20, stepMin: 60 }), []);

  // Form
  const [serviceId, setServiceId] = useState(services[0]?.id || "");
  const [dateISO, setDateISO] = useState(dateOptions[0] || "");
  const [timeHHMM, setTimeHHMM] = useState(allSlots[0] || "");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  const selectedService = services.find((s) => s.id === serviceId);

  function isSlotTaken(date, time) {
    const bookings = loadBookings();
    return bookings.some((b) => b.dateISO === date && b.timeHHMM === time);
  }

  const availableSlots = useMemo(() => {
    return allSlots.filter((t) => !isSlotTaken(dateISO, t));
  }, [allSlots, dateISO]);

  // Step logic (simple)
  const step1Ok = Boolean(serviceId && dateISO && timeHHMM);
  const step2Ok = Boolean(fullName.trim() && normalizePhone(phone).length === 10);
  const activeStep = sent ? 3 : step1Ok ? (step2Ok ? 3 : 2) : 1;

  function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    const cleanPhone = normalizePhone(phone);

    if (!serviceId) return setError("Selecciona un servicio.");
    if (!dateISO) return setError("Selecciona una fecha.");
    if (!timeHHMM) return setError("Selecciona un horario.");
    if (!fullName.trim()) return setError("Escribe tu nombre completo.");
    if (cleanPhone.length !== 10) return setError("El teléfono debe tener 10 dígitos.");

    if (isSlotTaken(dateISO, timeHHMM)) {
      return setError("Ese horario ya fue tomado. Elige otro horario disponible.");
    }

    const booking = {
      id: crypto?.randomUUID?.() || `${Date.now()}`,
      type: "fisioterapia",
      tipo: tipo || "general",
      serviceId,
      serviceLabel: selectedService?.label || "",
      dateISO,
      timeHHMM,
      fullName: fullName.trim(),
      phone: cleanPhone,
      createdAt: new Date().toISOString(),
    };

    const current = loadBookings();
    saveBookings([booking, ...current]);

    const msg =
      `Hola, quiero apartar una cita de ${booking.serviceLabel}.\n\n` +
      `📅 Fecha: ${formatDatePretty(booking.dateISO)}\n` +
      `🕒 Hora: ${formatTimePretty(booking.timeHHMM)}\n` +
      `👤 Nombre: ${booking.fullName}\n` +
      `📱 Tel: ${booking.phone}\n\n` +
      `*Nota: Ya cuento (o cuento con) valoración médica Ortopedia/Traumatología (interna o externa).*`;

    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

    setSent(true);
    window.open(waUrl, "_blank", "noopener,noreferrer");

    setFullName("");
    setPhone("");
  }

  const prettyDate = dateISO ? formatDatePretty(dateISO) : "—";
  const prettyTime = timeHHMM ? formatTimePretty(timeHHMM) : "—";

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.20),transparent_60%),radial-gradient(circle_at_bottom,_rgba(37,99,235,0.28),transparent_55%)]"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-10">
        <Link
          to="/#equipo"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-200 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Link>

        {/* Header */}
        <div className="mt-6 rounded-3xl bg-slate-900/70 p-6 ring-1 ring-white/10 shadow-xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold">{title}</h1>
              <p className="mt-1 text-sm text-slate-300">{desc}</p>
            </div>

            <span className="inline-flex items-center gap-2 rounded-full bg-slate-950/70 px-3 py-1 text-xs text-slate-200 ring-1 ring-sky-500/30">
              <ShieldCheck className="h-3.5 w-3.5 text-sky-400" />
              Agenda general (cualquier fisioterapeuta)
            </span>
          </div>

          {/* Requisito */}
          <div className="mt-5 rounded-2xl bg-amber-500/10 p-4 ring-1 ring-amber-400/30">
            <p className="text-sm text-amber-100">
              <span className="font-semibold">Requisito:</span> Para iniciar terapia es necesario haber pasado primero por una{" "}
              <span className="font-semibold">valoración médica de Ortopedia/Traumatología</span> (interna o externa).
            </p>
            <p className="mt-1 text-xs text-amber-200/80">
              Si aún no tienes valoración, solicita una en la sección “Valoración médica”.
            </p>
          </div>

          {/* Layout */}
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr,0.8fr]">
            {/* LEFT: Steps + Form */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <StepPill n={1} title="Selecciona horario" active={activeStep === 1} />
                <StepPill n={2} title="Ingresa tus datos" active={activeStep === 2} />
                <StepPill n={3} title="Confirma por WhatsApp" active={activeStep === 3} />
              </div>

              <form
                onSubmit={handleSubmit}
                className="rounded-2xl bg-slate-950/60 p-5 ring-1 ring-white/10"
              >
                {/* Step 1 */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-sky-400" />
                    <p className="text-sm font-semibold">Datos de la cita</p>
                  </div>
                  <p className="text-[11px] text-slate-400">Disponibilidad: 14 días</p>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* Servicio */}
                  <label className="block">
                    <span className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-300">
                      <ShieldCheck className="h-4 w-4 text-sky-400" />
                      Servicio
                    </span>
                    <select
                      value={serviceId}
                      onChange={(e) => setServiceId(e.target.value)}
                      className="w-full rounded-xl bg-slate-900/70 px-3 py-2 text-sm text-white ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-sky-400/60"
                    >
                      {services.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  {/* Fecha */}
                  <label className="block">
                    <span className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-300">
                      <CalendarDays className="h-4 w-4 text-sky-400" />
                      Fecha
                    </span>
                    <select
                      value={dateISO}
                      onChange={(e) => setDateISO(e.target.value)}
                      className="w-full rounded-xl bg-slate-900/70 px-3 py-2 text-sm text-white ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-sky-400/60"
                    >
                      {dateOptions.map((d) => (
                        <option key={d} value={d}>
                          {formatDatePretty(d)}
                        </option>
                      ))}
                    </select>
                  </label>

                  {/* Horario */}
                  <label className="block md:col-span-2">
                    <span className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-300">
                      <Clock className="h-4 w-4 text-sky-400" />
                      Horario disponible
                    </span>
                    <select
                      value={timeHHMM}
                      onChange={(e) => setTimeHHMM(e.target.value)}
                      className="w-full rounded-xl bg-slate-900/70 px-3 py-2 text-sm text-white ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-sky-400/60"
                    >
                      {availableSlots.length === 0 ? (
                        <option value="">Sin horarios disponibles</option>
                      ) : (
                        availableSlots.map((t) => (
                          <option key={t} value={t}>
                            {formatTimePretty(t)}
                          </option>
                        ))
                      )}
                    </select>
                    <p className="mt-2 text-[11px] text-slate-400">
                      * Al solicitar la cita se abrirá WhatsApp para confirmar.
                    </p>
                  </label>
                </div>

                {/* Divider */}
                <div className="my-5 h-px w-full bg-white/10" />

                {/* Step 2 */}
                <div className="mb-4 flex items-center gap-2">
                  <Info className="h-4 w-4 text-sky-400" />
                  <p className="text-sm font-semibold">Tus datos</p>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* Nombre */}
                  <label className="block">
                    <span className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-300">
                      <User className="h-4 w-4 text-sky-400" />
                      Nombre completo
                    </span>
                    <input
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Tu nombre"
                      className="w-full rounded-xl bg-slate-900/70 px-3 py-2 text-sm text-white ring-1 ring-white/10 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400/60"
                    />
                  </label>

                  {/* Teléfono */}
                  <label className="block">
                    <span className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-300">
                      <Phone className="h-4 w-4 text-sky-400" />
                      Teléfono
                    </span>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(normalizePhone(e.target.value))}
                      placeholder="10 dígitos"
                      inputMode="numeric"
                      className="w-full rounded-xl bg-slate-900/70 px-3 py-2 text-sm text-white ring-1 ring-white/10 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400/60"
                    />
                  </label>
                </div>

                {/* Error / success */}
                {error && (
                  <div className="mt-4 rounded-xl bg-rose-500/10 p-3 text-sm text-rose-200 ring-1 ring-rose-400/30">
                    {error}
                  </div>
                )}

                {sent && (
                  <div className="mt-4 rounded-xl bg-emerald-500/10 p-3 text-sm text-emerald-200 ring-1 ring-emerald-400/30">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5" />
                      <span>Solicitud enviada. Te contactaremos por WhatsApp para confirmar.</span>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={availableSlots.length === 0}
                  className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-sky-500 px-4 py-3 text-sm font-semibold text-white shadow-lg hover:bg-sky-400 disabled:opacity-50"
                >
                  Solicitar cita
                </button>
              </form>
            </div>

            {/* RIGHT: Summary */}
            <aside className="space-y-4">
              <div className="rounded-2xl bg-slate-950/60 p-5 ring-1 ring-white/10">
                <p className="text-sm font-semibold">Resumen de tu cita</p>

                <div className="mt-3 space-y-3 text-sm">
                  <div className="rounded-xl bg-slate-900/40 p-3 ring-1 ring-white/10">
                    <p className="text-xs uppercase tracking-wide text-slate-400">Servicio</p>
                    <p className="mt-1 font-semibold text-white">{selectedService?.label || "—"}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-slate-900/40 p-3 ring-1 ring-white/10">
                      <p className="text-xs uppercase tracking-wide text-slate-400">Fecha</p>
                      <p className="mt-1 font-semibold text-white">{prettyDate}</p>
                    </div>
                    <div className="rounded-xl bg-slate-900/40 p-3 ring-1 ring-white/10">
                      <p className="text-xs uppercase tracking-wide text-slate-400">Hora</p>
                      <p className="mt-1 font-semibold text-white">{prettyTime}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-slate-900/40 p-3 ring-1 ring-white/10">
                      <p className="text-xs uppercase tracking-wide text-slate-400">Nombre</p>
                      <p className="mt-1 font-semibold text-white">{fullName.trim() || "—"}</p>
                    </div>
                    <div className="rounded-xl bg-slate-900/40 p-3 ring-1 ring-white/10">
                      <p className="text-xs uppercase tracking-wide text-slate-400">Teléfono</p>
                      <p className="mt-1 font-semibold text-white">
                        {normalizePhone(phone) || "—"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 rounded-xl bg-sky-500/10 p-3 ring-1 ring-sky-400/20">
                  <p className="text-xs text-slate-200">
                    Al finalizar, se abrirá WhatsApp para confirmar tu cita. Si no tienes WhatsApp,
                    puedes copiar la información del resumen.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-slate-950/60 p-5 ring-1 ring-white/10">
                <p className="text-sm font-semibold">¿Qué sigue?</p>
                <ol className="mt-2 space-y-2 text-sm text-slate-300">
                  <li>1) Selecciona servicio, fecha y horario.</li>
                  <li>2) Escribe tu nombre y teléfono.</li>
                  <li>3) Pulsa <span className="font-semibold text-white">Solicitar cita</span> para confirmar por WhatsApp.</li>
                </ol>

                <div className="mt-4 rounded-xl bg-amber-500/10 p-3 ring-1 ring-amber-400/20">
                  <p className="text-xs text-amber-100">
                    Recuerda: es necesario contar con valoración médica (Ortopedia/Traumatología) para iniciar terapia.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
