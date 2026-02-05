// src/components/Testimonials.jsx
import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Star, ShieldCheck } from "lucide-react";
import RatingStars from "./RatingStars";

const LS_KEY = "orthoclinic_ratings_google_v1";

// ---------- Utils ----------
function loadRatings() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}
function saveRatings(obj) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(obj));
  } catch {}
}
function avg(arr) {
  if (!arr || !arr.length) return 0;
  return +(arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1);
}
function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}
function getDistribution(starsArr) {
  // returns {5:count,4:count...1:count}
  const dist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  for (const s of starsArr || []) {
    const v = clamp(Number(s) || 0, 1, 5);
    dist[v] = (dist[v] || 0) + 1;
  }
  return dist;
}
function cn(...arr) {
  return arr.filter(Boolean).join(" ");
}

// ✅ Calificables controlados (2 doctores + 2 servicios)
const RATABLES = [
  {
    id: "dr_buganza",
    name: "Dr. Martin Buganza",
    role: "Médico Ortopedista",
    photo: "/MartinBuganza.png",
    tag: "Doctor",
  },
  {
    id: "dr_miguel_puig",
    name: "Dr. Miguel Puig",
    role: "Médico Ortopedista",
    photo: "/MiguelPuig.png",
    tag: "Doctor",
  },
  {
    id: "rehab_general",
    name: "Rehabilitación general",
    role: "Servicio",
    photo: "/Rehabilitacion.png",
    tag: "Rehabilitación",
  },
  {
    id: "rehab_adultos_mayores",
    name: "Rehabilitación para adultos mayores",
    role: "Servicio",
    photo: "/Rehabilitacion.png",
    tag: "Rehabilitación",
  },
];

function Pill({ children }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/70">
      {children}
    </span>
  );
}

function BarRow({ label, count, total }) {
  const pct = total ? Math.round((count / total) * 100) : 0;
  return (
    <div className="flex items-center gap-3">
      <div className="flex w-10 items-center gap-1 text-xs text-white/70">
        <span>{label}</span>
        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
      </div>

      <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-white/10">
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-amber-400/80"
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="w-10 text-right text-xs text-white/60">{count}</div>
    </div>
  );
}

export default function Testimonials() {
  const [ratings, setRatings] = useState({});
  const [selectedId, setSelectedId] = useState(RATABLES[0]?.id || "");
  const [stars, setStars] = useState(0);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    setRatings(loadRatings());
  }, []);

  // ------------- Guardar rating -------------
  const handleRate = () => {
    if (!selectedId || !stars) return;

    setRatings((prev) => {
      const next = { ...prev };
      if (!next[selectedId]) next[selectedId] = { stars: [] };
      next[selectedId].stars = [...next[selectedId].stars, stars];
      saveRatings(next);
      return next;
    });

    setStars(0);
    setSent(true);
    setTimeout(() => setSent(false), 1600);
  };

  // ------------- Stats globales (google style) -------------
  const globalStats = useMemo(() => {
    const all = Object.values(ratings).flatMap((r) => r.stars || []);
    const dist = getDistribution(all);
    return {
      total: all.length,
      avg: avg(all),
      dist,
    };
  }, [ratings]);

  // top “calificados” (por promedio y luego por total)
  const ranked = useMemo(() => {
    const rows = RATABLES.map((p) => {
      const stat = ratings[p.id]?.stars || [];
      return {
        ...p,
        total: stat.length,
        promedio: avg(stat),
      };
    });

    return rows.sort((a, b) => {
      if (b.promedio !== a.promedio) return b.promedio - a.promedio;
      return b.total - a.total;
    });
  }, [ratings]);

  const distTotal = globalStats.total;
  const d = globalStats.dist;

  return (
    <section id="testimonios" className="py-14 md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
            <ShieldCheck className="h-4 w-4 text-cyan-300" />
            Calificaciones
          </div>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Experiencias de pacientes
          </h2>
          <p className="mt-2 max-w-2xl text-white/70">
            Estilo “Google Reviews”: promedio, distribución por estrellas y calificación rápida.
            Sin comentarios; solo estrellas.
          </p>
        </div>

        {/* Google summary card */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left: Overall rating */}
          <div className="lg:col-span-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm font-semibold text-white">Promedio general</p>

              <div className="mt-4 flex items-end gap-3">
                <div className="text-5xl font-bold tracking-tight text-white">
                  {globalStats.avg ? globalStats.avg.toFixed(1) : "—"}
                </div>
                <div className="pb-2">
                  <RatingStars value={globalStats.avg} readOnly size="lg" />
                  <p className="mt-1 text-xs text-white/60">
                    {distTotal
                      ? `${distTotal} reseña${distTotal === 1 ? "" : "s"}`
                      : "Aún no hay reseñas"}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <Pill>Solo doctores y servicios</Pill>
                <Pill>Uso interno</Pill>
                <Pill>Sin datos sensibles</Pill>
              </div>
            </div>
          </div>

          {/* Right: Distribution bars */}
          <div className="lg:col-span-8">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-semibold text-white">Distribución por estrellas</p>
                <p className="text-xs text-white/60">
                  {distTotal ? "Basado en reseñas registradas" : "Sin reseñas aún"}
                </p>
              </div>

              <div className="mt-4 space-y-3">
                <BarRow label="5" count={d[5]} total={distTotal} />
                <BarRow label="4" count={d[4]} total={distTotal} />
                <BarRow label="3" count={d[3]} total={distTotal} />
                <BarRow label="2" count={d[2]} total={distTotal} />
                <BarRow label="1" count={d[1]} total={distTotal} />
              </div>
            </div>
          </div>
        </div>

        {/* Rate module */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-[1fr,auto] md:items-center">
            <div>
              <h3 className="text-lg font-semibold text-white">Calificar (rápido)</h3>
              <p className="mt-1 text-sm text-white/70">
                Selecciona un médico o servicio y asigna estrellas.
              </p>

              <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="relative w-full sm:w-[420px]">
                  <select
                    value={selectedId}
                    onChange={(e) => setSelectedId(e.target.value)}
                    className="w-full appearance-none rounded-xl border-0 bg-black/30 py-3 pl-3 pr-10 text-sm text-white ring-1 ring-inset ring-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400/60"
                    aria-label="Selecciona médico o servicio"
                  >
                    {RATABLES.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} — {p.role}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm text-white/70">Tu calificación:</span>
                  <RatingStars value={stars} onChange={setStars} size="lg" />
                </div>
              </div>
            </div>

            <div className="flex items-end md:justify-end">
              <button
                onClick={handleRate}
                disabled={!selectedId || !stars}
                className="rounded-full border border-white/10 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/15 disabled:opacity-50"
              >
                Publicar
              </button>
            </div>
          </div>

          {sent && (
            <div className="border-t border-emerald-500/40 bg-emerald-500/10 p-4 text-sm text-emerald-300">
              ¡Gracias! Tu calificación fue registrada.
            </div>
          )}
        </div>

        {/* Ratable list (like Google "people also rate") */}
        <div className="mt-10 flex items-end justify-between gap-3">
          <div>
            <h4 className="text-base font-semibold text-white">Calificaciones por médico/servicio</h4>
            <p className="mt-1 text-sm text-white/70">
              Promedio y cantidad de reseñas por cada opción.
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ranked.map((p) => (
            <article
              key={p.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
            >
              <div className="flex items-center gap-4">
                <div className="relative h-14 w-14 overflow-hidden rounded-xl bg-black/30 ring-1 ring-white/10">
                  <img
                    src={p.photo || "/logo.png"}
                    alt={p.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = "/logo.png";
                    }}
                  />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-semibold text-white">{p.name}</p>
                    <span className="shrink-0 rounded-full border border-white/10 bg-black/20 px-2 py-0.5 text-[10px] text-white/60">
                      {p.tag}
                    </span>
                  </div>
                  <p className="truncate text-xs text-white/60">{p.role}</p>

                  <div className="mt-2 flex items-center gap-2">
                    <RatingStars value={p.promedio} readOnly size="sm" />
                    <span className="text-xs text-white/60">
                      {p.total ? `${p.promedio.toFixed(1)}/5` : "Sin calificaciones"} ·{" "}
                      {p.total} reseña{p.total === 1 ? "" : "s"}
                    </span>
                  </div>
                </div>
              </div>

              {/* mini barra de “satisfacción” (pro) */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-white/60">
                  <span>Satisfacción</span>
                  <span>{p.total ? `${Math.round((p.promedio / 5) * 100)}%` : "—"}</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-emerald-400/70"
                    style={{ width: `${p.total ? (p.promedio / 5) * 100 : 0}%` }}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
