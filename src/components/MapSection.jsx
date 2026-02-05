// src/components/MapSection.jsx
import {
  Phone,
  MapPin,
  Clock,
  Navigation,
  Route,
  MessageCircle,
  CheckCircle2,
  ShieldCheck,
  Star,
  Car,
} from "lucide-react";

export default function MapSection() {
  // Links de ejemplo: cámbialos por los reales
  const phone = "2720000000";
  const telHref = `tel:${phone}`;
  const waHref = `https://wa.me/52${phone}`;
  const gmapsLink = "https://maps.google.com/?q=Ortho+Clinic+Cordoba";
  const gmapsDirections =
    "https://www.google.com/maps/dir/?api=1&destination=Ortho+Clinic+Cordoba";

  return (
    <section id="ubicacion" className="py-12 md:py-16 uw:py-20">
      <div className="container max-w-9xl uw:max-w-10xl safe-px">
        <div className="mb-6">
          <p className="chip">Ubicación</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight">¿Dónde estamos?</h2>
          <p className="mt-2 max-w-prose text-slate-500 dark:text-slate-300">
            Encuéntranos fácilmente e inicia indicaciones en Google Maps.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* PANEL IZQUIERDO — DISEÑO MEJORADO */}
          <div className="lg:col-span-4">
            <div className="relative overflow-hidden rounded-2xl border border-slate-200/20 bg-white/80 shadow-xl ring-1 ring-black/5 backdrop-blur-sm dark:border-white/10 dark:bg-slate-900/70">
              {/* Decor */}
              <div className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-[--primary]/15 blur-2xl" />
              <div className="pointer-events-none absolute -left-20 bottom-0 size-44 rounded-full bg-blue-500/10 blur-2xl" />

              {/* Header */}
              <div className="flex items-start gap-4 p-5 pb-4">
                {/* Logo de la clínica (placeholder) */}
                <div className="grid size-14 place-items-center overflow-hidden rounded-full ring-1 ring-slate-200/40 dark:ring-white/10">
                  {/* Reemplaza src por tu logo */}
                  <img
                    src="/logo.png"
                    alt="Logo clínica"
                    className="h-14 w-14 object-contain"
                  />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-emerald-500" />
                    <span className="text-xs font-semibold tracking-wide text-emerald-600 dark:text-emerald-400">
                      Clínica verificada
                    </span>
                  </div>
                  <h3 className="mt-1 text-lg font-semibold leading-tight">
                    Ortho Clinic Córdoba
                  </h3>
                  <div className="mt-1 flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < 4 ? "fill-amber-400" : "opacity-40"
                        }`}
                      />
                    ))}
                    <span className="ml-1 text-xs font-medium text-slate-500 dark:text-slate-300">
                      4.5 · 38 reseñas
                    </span>
                  </div>
                </div>
              </div>

              {/* Chips de estado */}
              <div className="px-5">
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600 ring-1 ring-emerald-500/20 dark:text-emerald-400">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Atención hoy
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-2.5 py-1 text-xs font-medium text-blue-600 ring-1 ring-blue-500/20 dark:text-blue-400">
                    <Car className="h-3.5 w-3.5" />
                    Estacionamiento
                  </span>
                </div>
              </div>

              <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-slate-200/60 to-transparent dark:via-white/10" />

              {/* Datos */}
              <div className="space-y-4 px-5">
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[--primary]" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
                      Teléfono
                    </p>
                    <a
                      href={telHref}
                      className="mt-1 inline-flex items-center gap-2 text-[15px] font-medium hover:underline"
                    >
                      (272) 000 0000
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[--primary]" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
                      Dirección
                    </p>
                    <p className="mt-1 text-[15px]">
                      Calle 15 entre Av. 2 y 4, Córdoba, Veracruz
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <a href={gmapsLink} target="_blank" rel="noreferrer" className="btn btn-ghost h-9 px-3">
                        Abrir en Maps
                      </a>
                      <a href={gmapsDirections} target="_blank" rel="noreferrer" className="btn btn-ghost h-9 px-3">
                        Cómo llegar
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[--primary]" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
                      Horarios
                    </p>
                    <p className="mt-1 text-[15px]">
                      Lun – Vie · 9:00 – 20:00
                      <br /> Sáb · 9:00 – 14:00
                    </p>
                  </div>
                </div>
              </div>

              {/* Acciones principales */}
              <div className="mt-5 grid grid-cols-2 gap-2 px-5">
                <a href={waHref} target="_blank" rel="noreferrer" className="btn btn-primary h-10 justify-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
                <a href={telHref} className="btn btn-ghost h-10 justify-center gap-2">
                  <Phone className="h-4 w-4" />
                  Llamar
                </a>
              </div>

              <div className="mt-2 grid grid-cols-2 gap-2 px-5 pb-1">
                <a href={gmapsLink} target="_blank" rel="noreferrer" className="btn btn-ghost h-9 justify-center gap-2">
                  <Navigation className="h-4 w-4" />
                  Maps
                </a>
                <a href={gmapsDirections} target="_blank" rel="noreferrer" className="btn btn-ghost h-9 justify-center gap-2">
                  <Route className="h-4 w-4" />
                  Rutas
                </a>
              </div>

              <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-slate-200/60 to-transparent dark:via-white/10" />

              {/* Facilidades */}
              <div className="grid grid-cols-1 gap-3 px-5 pb-5 md:grid-cols-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm">Acceso para silla de ruedas</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm">Estacionamiento cercano</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm">Facturación disponible</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm">Atención con cita</span>
                </div>
              </div>
            </div>
          </div>

          {/* MAPA */}
<div className="lg:col-span-8">
  <div className="overflow-hidden rounded-2xl border border-slate-200/20 shadow-xl dark:border-white/10">
    <iframe
      title="Mapa Ortho Clinic Córdoba"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className="h-[360px] w-full md:h-[420px] lg:h-[520px]"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2244.5094173493194!2d-96.93236658005205!3d18.895958606644285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85c4e56908ca97eb%3A0x36038140e7a74819!2sOrtho%20Clinic%20Cordoba!5e0!3m2!1ses-419!2smx!4v1762671650797!5m2!1ses-419!2smx"
      allowFullScreen
    />
  </div>
</div>

        </div>
      </div>
    </section>
  );
}
