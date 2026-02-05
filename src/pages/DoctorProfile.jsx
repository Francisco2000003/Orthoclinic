import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Clock3,
  Star,
  CheckCircle2,
  Stethoscope,
  ShieldCheck,
  Youtube,
  Award,
  Users,
  Activity,
  GraduationCap,
  HeartPulse,
  Brain,
  Languages,
  Microscope,
  Quote,
  Sparkles,
} from "lucide-react";
import { STAFF } from "../data/staff";

/**
 * Página de perfil detallado para cada especialista.
 * Ruta: /doctor/:slug
 */
export default function DoctorProfile() {
  const { slug } = useParams();

  const doctor = useMemo(
    () => STAFF.find((p) => p.slug === slug),
    [slug]
  );

  if (!doctor) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-100">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-16">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-sky-300 hover:text-sky-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-8 text-center shadow-xl">
            <p className="text-lg font-semibold">
              No encontramos el perfil solicitado.
            </p>
            <p className="mt-2 text-sm text-slate-300">
              Verifica el enlace o selecciona nuevamente un especialista desde la
              página principal.
            </p>
          </div>
        </div>
      </main>
    );
  }

  const isPhysio = (doctor.role || "").toLowerCase().includes("fisio");

  const years = doctor.years ?? 5;
  const rating = typeof doctor.rating === "number" ? doctor.rating : 5;
  const location = doctor.location ?? "Córdoba, Ver.";
  const badges = doctor.badges ?? [];
  const services = doctor.services ?? [];
  const profile = doctor.profile ?? {};

  const aboutText =
    profile.bio ??
    doctor.bio ??
    (isPhysio
      ? "Fisioterapeuta enfocada en la recuperación funcional y prevención de recaídas, combinando terapia manual y ejercicio terapéutico."
      : "Especialista en el diagnóstico y tratamiento de lesiones musculoesqueléticas, combinando tecnología de imagen con un trato cercano.");

  const defaultSpecialties = isPhysio
    ? [
        "Rehabilitación postquirúrgica.",
        "Lesiones deportivas y retorno al deporte.",
        "Dolor musculoesquelético crónico.",
        "Programas de fuerza y estabilidad.",
        "Prevención de recaídas."
      ]
    : [
        "Lesiones de rodilla (ligamentos, meniscos).",
        "Lesiones de hombro y manguito rotador.",
        "Artrosis y desgaste articular.",
        "Lesiones deportivas en alto y bajo rendimiento.",
        "Dolor de columna de origen mecánico."
      ];

  const specialties = profile.specialties ?? defaultSpecialties;

  // Stats personalizados
  const stats = {
    patientsPerYear: profile.patientsPerYear ?? 300,
    surgeriesPerYear: profile.surgeriesPerYear ?? (isPhysio ? 150 : 120),
    satisfaction: profile.satisfaction ?? 98,
  };

  // Videos: primero profile.videos, si no, el videoUrl del staff, y si tampoco, fallback Rick Astley 😅
  const videosFromProfile = profile.videos ?? [];
  const baseVideos =
    videosFromProfile.length > 0
      ? videosFromProfile
      : doctor.videoUrl
      ? [doctor.videoUrl]
      : [];
  const videos =
    baseVideos.length > 0
      ? baseVideos
      : ["https://www.youtube.com/embed/dQw4w9WgXcQ"];

  const testimonials =
    profile.testimonials ??
    [
      {
        name: "Paciente",
        text: "El especialista explicó con claridad el diagnóstico y el plan de tratamiento. El seguimiento fue cercano y profesional.",
      },
      {
        name: "Paciente",
        text: "Gracias a la combinación de tratamiento y rehabilitación pude retomar mis actividades sin dolor.",
      },
    ];

  const roleChipLabel = isPhysio
    ? "Fisioterapeuta"
    : doctor.role || "Especialista";
  const RoleIcon = isPhysio ? Activity : Stethoscope;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* Fondo degradado */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.22),transparent_60%),radial-gradient(circle_at_bottom,_rgba(37,99,235,0.32),transparent_55%)]"
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-10 lg:px-6 lg:pt-14">
        {/* Volver + badge verificado */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-200 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a doctores
          </Link>

          <span className="inline-flex items-center gap-2 rounded-full bg-slate-900/80 px-3 py-1 text-xs text-slate-200 ring-1 ring-sky-500/30">
            <ShieldCheck className="h-3.5 w-3.5 text-sky-400" />
            Perfil verificado por la clínica
          </span>
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,2.2fr)_minmax(320px,1fr)] lg:items-start">
          {/* COLUMNA IZQUIERDA */}
          <section className="space-y-8">
            {/* Header principal */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl sm:p-8">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-24 h-56 w-56 rounded-full bg-sky-500/30 blur-3xl"
              />

              <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
                {/* Foto grande */}
                <div className="shrink-0">
                  <div className="relative">
                    <img
                      src={doctor.photo}
                      alt={doctor.name}
                      className="h-40 w-40 rounded-3xl object-cover ring-2 ring-sky-500/80 sm:h-48 sm:w-48"
                    />
                    <span className="absolute -bottom-2 -right-2 inline-flex items-center gap-1 rounded-full bg-sky-500 px-2.5 py-1 text-xs font-semibold text-white shadow-lg">
                      <RoleIcon className="h-3.5 w-3.5" />
                      {roleChipLabel}
                    </span>
                  </div>
                </div>

                {/* Info principal */}
                <div className="relative flex-1 space-y-3">
                  <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                      {doctor.name}
                    </h1>
                    <p className="mt-1 text-sm text-slate-200">
                      {doctor.role}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-200">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-800/80 px-3 py-1 ring-1 ring-white/10">
                      <Clock3 className="h-3.5 w-3.5 text-sky-300" />
                      {years} años de experiencia
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-800/80 px-3 py-1 ring-1 ring-white/10">
                      <MapPin className="h-3.5 w-3.5 text-sky-300" />
                      {location}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-800/80 px-3 py-1 ring-1 ring-white/10">
                      <Star className="h-3.5 w-3.5 text-yellow-300" />
                      {rating.toFixed(1)} / 5 · Opiniones de pacientes
                    </span>
                  </div>

                  {badges.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {badges.map((b, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 rounded-full bg-sky-500/10 px-3 py-1 text-[11px] font-medium text-sky-100 ring-1 ring-sky-400/30"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                          {b}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Resumen en cifras */}
              <div className="relative mt-6 grid gap-3 text-xs sm:grid-cols-3">
                <StatPill
                  label="Pacientes atendidos al año"
                  value={`${stats.patientsPerYear}+`}
                  icon={Users}
                />
                <StatPill
                  label={
                    isPhysio
                      ? "Programas de rehabilitación al año"
                      : "Procedimientos quirúrgicos anuales"
                  }
                  value={`${stats.surgeriesPerYear}+`}
                  icon={Activity}
                />
                <StatPill
                  label="Índice de satisfacción"
                  value={`${stats.satisfaction}%`}
                  icon={HeartPulse}
                />
              </div>
            </div>

            {/* Sobre el especialista */}
            <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl sm:p-7">
              <h2 className="text-lg font-semibold text-white">
                Sobre el especialista
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-200">
                {aboutText}
              </p>

              <div className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-emerald-400" />
                    <span>
                      Valoración integral y explicación clara del diagnóstico.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-emerald-400" />
                    <span>
                      Planes de tratamiento personalizados según objetivos del
                      paciente.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-emerald-400" />
                    <span>
                      Acompañamiento cercano durante todo el proceso de
                      recuperación.
                    </span>
                  </li>
                </ul>

                <div className="space-y-2 rounded-2xl bg-slate-950/60 p-4 ring-1 ring-white/5">
                  <h3 className="text-sm font-semibold text-white">
                    Formación y certificaciones
                  </h3>
                  <ul className="space-y-1.5 text-xs text-slate-200">
                    <li>
                      •{" "}
                      {profile.education ??
                        (isPhysio
                          ? "Licenciatura en Fisioterapia con enfoque en rehabilitación musculoesquelética."
                          : "Especialidad en Ortopedia y Traumatología.")}
                    </li>
                    <li>
                      • Actualización continua mediante cursos y congresos
                      nacionales e internacionales.
                    </li>
                    <li>
                      • Participación en programas de educación a pacientes y
                      personal de salud.
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Áreas de especialidad */}
            <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text白">
                    Áreas de especialidad
                  </h2>
                  <p className="mt-1 text-xs text-slate-300">
                    Principales tipos de casos que atiende de forma habitual.
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600/15 px-2.5 py-1 text-[11px] font-medium text-emerald-200 ring-1 ring-emerald-500/40">
                  <HeartPulse className="h-3.5 w-3.5" />
                  Enfoque musculoesquelético
                </span>
              </div>

              <div className="mt-4 grid gap-4 text-sm md:grid-cols-2">
                <ul className="space-y-2">
                  {specialties.slice(0, 3).map((s, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Sparkles className="mt-0.5 h-4 w-4 flex-none text-sky-300" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
                <ul className="space-y-2">
                  {specialties.slice(3).map((s, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Sparkles className="mt-0.5 h-4 w-4 flex-none text-sky-300" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Enfoque de tratamiento (timeline) */}
            <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl sm:p-7">
              <h2 className="text-lg font-semibold text-white">
                ¿Cómo trabaja el especialista?
              </h2>
              <p className="mt-1 text-xs text-slate-300">
                Proceso típico de atención desde la primera valoración hasta el
                alta.
              </p>

              <ol className="mt-4 space-y-4 text-sm">
                <TimelineItem
                  step="1"
                  title="Valoración integral"
                  description="Revisión clínica detallada, historial y, cuando es necesario, estudios complementarios para definir el diagnóstico con precisión."
                  icon={Activity}
                />
                <TimelineItem
                  step="2"
                  title="Plan de tratamiento personalizado"
                  description={
                    isPhysio
                      ? "Se diseña un programa de fisioterapia con objetivos claros, ejercicios y sesiones adaptadas a tu ritmo."
                      : "Se explican las alternativas disponibles (tratamiento conservador, fisioterapia, cirugía, etc.) y se elige la mejor opción para tu caso."
                  }
                  icon={Brain}
                />
                <TimelineItem
                  step="3"
                  title="Seguimiento cercano"
                  description="Se evalúa tu evolución y se ajusta el plan según tu respuesta, nivel de actividad y metas personales."
                  icon={HeartPulse}
                />
                <TimelineItem
                  step="4"
                  title="Alta y prevención"
                  description="Al cierre del tratamiento se entregan recomendaciones específicas para reducir el riesgo de recaídas o nuevas lesiones."
                  icon={Sparkles}
                />
              </ol>
            </section>

            {/* VIDEOS */}
            <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl sm:p-7">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    Videos del especialista
                  </h2>
                  <p className="mt-1 text-xs text-slate-300">
                    Contenido educativo y demostrativo dirigido a pacientes.
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-red-600/15 px-2.5 py-1 text-[11px] font-medium text-red-200 ring-1 ring-red-500/40">
                  <Youtube className="h-3.5 w-3.5" />
                  Canal educativo
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {videos.map((url, i) => (
                  <div
                    key={i}
                    className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/60 shadow-lg"
                  >
                    <div className="aspect-video">
                      <iframe
                        src={url}
                        title={`Video ${i + 1} del especialista`}
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="h-full w-full"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-3 text-[11px] text-slate-400">
                * Sustituye estos enlaces por los videos reales del especialista
                (explicación de procedimientos, cuidados, ejercicios, etc.).
              </p>
            </section>

            {/* Testimonios */}
            <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-white">
                  Opiniones de pacientes
                </h2>
                <span className="inline-flex items-center gap-1 rounded-full bg-yellow-500/10 px-2.5 py-1 text-[11px] font-medium text-yellow-200 ring-1 ring-yellow-400/40">
                  <Star className="h-3.5 w-3.5" />
                  Satisfacción {stats.satisfaction}%*
                </span>
              </div>
              <p className="mt-1 text-[11px] text-slate-400">
                * Estimación interna basada en encuestas de seguimiento a
                pacientes de la clínica.
              </p>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {testimonials.map((t, i) => (
                  <figure
                    key={i}
                    className="relative overflow-hidden rounded-2xl bg-slate-950/70 p-4 ring-1 ring-white/5"
                  >
                    <Quote className="absolute -top-1 -left-1 h-6 w-6 text-sky-500/30" />
                    <blockquote className="mt-3 text-xs leading-relaxed text-slate-200">
                      “{t.text}”
                    </blockquote>
                    <figcaption className="mt-3 text-[11px] font-medium text-slate-300">
                      {t.name}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
          </section>

          {/* COLUMNA DERECHA: FICHA PROFESIONAL */}
          <aside className="space-y-4">
            <section className="rounded-3xl border border-white/10 bg-slate-900/90 p-5 shadow-2xl sm:p-6">
              <h2 className="text-base font-semibold text-white">
                Ficha profesional
              </h2>
              <p className="mt-1 text-xs text-slate-300">
                Resumen de la trayectoria, líneas de trabajo e intereses
                clínicos.
              </p>

              <div className="mt-4 space-y-3 text-xs text-slate-200">
                <div className="flex items-start gap-3">
                  <Award className="mt-0.5 h-4 w-4 text-amber-300" />
                  <div>
                    <p className="font-medium text-slate-100">
                      Trayectoria clínica
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-300">
                      {years} años de práctica en el área musculoesquelética,
                      con experiencia tanto en consulta privada como en centros
                      especializados.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Microscope className="mt-0.5 h-4 w-4 text-cyan-300" />
                  <div>
                    <p className="font-medium text-slate-100">
                      Intereses clínicos / investigación
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-300">
                      {profile.research ??
                        "Manejo integral de lesiones musculoesqueléticas y optimización de programas de rehabilitación."}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="mt-0.5 h-4 w-4 text-sky-300" />
                  <div>
                    <p className="font-medium text-slate-100">
                      Tipo de pacientes que atiende
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-300">
                      Deportistas, pacientes con dolor articular crónico,
                      personas en rehabilitación post-operatoria y adultos que
                      desean mejorar su movilidad y calidad de vida.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <GraduationCap className="mt-0.5 h-4 w-4 text-indigo-300" />
                  <div>
                    <p className="font-medium text-slate-100">
                      Filosofía de atención
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-300">
                      Explica cada paso del proceso de tratamiento y toma
                      decisiones en conjunto con el paciente, basándose en
                      evidencia científica actual.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Languages className="mt-0.5 h-4 w-4 text-emerald-300" />
                  <div>
                    <p className="font-medium text-slate-100">Idiomas</p>
                    <p className="mt-0.5 text-[11px] text-slate-300">
                      {profile.languages ??
                        "Español (nativo) · Inglés para revisión de literatura médica."}
                    </p>
                  </div>
                </div>
              </div>

              {services.length > 0 && (
                <div className="mt-4 rounded-2xl bg-slate-950/70 p-3 ring-1 ring-white/5">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                    Procedimientos / servicios frecuentes
                  </p>
                  <ul className="mt-2 flex flex-wrap gap-1.5 text-[11px] text-slate-200">
                    {services.slice(0, 8).map((s, i) => (
                      <li
                        key={i}
                        className="rounded-full bg-slate-800/80 px-2.5 py-1 ring-1 ring-white/10"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>

            <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-4 text-xs text-slate-300 shadow-xl">
              <p>
                Este perfil está pensado para que conozcas con detalle la forma
                de trabajo del especialista antes de agendar tu cita. Si tienes
                dudas sobre qué profesional es el indicado para tu caso, el
                equipo de la clínica puede orientarte y canalizarte con la mejor
                opción.
              </p>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}

/* COMPONENTES AUXILIARES */

function StatPill({ label, value, icon: Icon }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-slate-950/70 px-3 py-2 ring-1 ring-white/5">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-500/20">
        <Icon className="h-4 w-4 text-sky-300" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-slate-100">{value}</p>
        <p className="text-[10px] text-slate-400">{label}</p>
      </div>
    </div>
  );
}

function TimelineItem({ step, title, description, icon: Icon }) {
  return (
    <li className="relative flex gap-3">
      <div className="flex flex-col items-center">
        <div className="grid h-8 w-8 place-items-center rounded-full bg-sky-500/20 text-xs font-semibold text-sky-100 ring-1 ring-sky-400/40">
          {step}
        </div>
        <div className="mt-1 h-full w-px flex-1 bg-slate-700/60" />
      </div>
      <div className="space-y-0.5">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-sky-300" />
          <p className="text-sm font-semibold text-white">{title}</p>
        </div>
        <p className="text-xs text-slate-300">{description}</p>
      </div>
    </li>
  );
}
