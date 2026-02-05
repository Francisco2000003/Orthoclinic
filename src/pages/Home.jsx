// src/pages/Home.jsx
import Hero from "../components/Hero";
import ProfileCard from "../components/ProfileCard";
import { STAFF } from "../data/staff";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import ServicesShowcase from "../components/ServicesShowcase";
import MapSection from "../components/MapSection";
import { Users, ArrowRight } from "lucide-react";

import RehabVideosSection from "../components/RehabVideosSection";


export default function Home() {
  const doctors = STAFF.filter((p) => (p.role || "").includes("Médico"));

  return (
    <>
      <Hero />

      {/* Conoce al equipo */}
      <section id="equipo" className="py-14 md:py-16 uw:py-20">
        <div className="container max-w-9xl uw:max-w-10xl safe-px">
          <h2 className="font-bold tracking-tight text-fluid-4xl">Conoce al equipo</h2>
          <p className="mt-2 max-w-prose text-slate-600 dark:text-slate-300">
            Dos médicos ortopedistas y un área de fisioterapia.
          </p>

          {/* ===================== DOCTORES ===================== */}
          <h3 className="mt-8 mb-3 font-semibold text-slate-200">Doctores</h3>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {doctors.map((p) => (
              <ProfileCard key={p.id} person={p} />
            ))}
          </div>

          {/* ===================== VALORACIÓN MÉDICA (Trauma/Orto) ===================== */}
          <div className="mt-8 rounded-2xl bg-slate-900/40 p-5 ring-1 ring-white/10">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h4 className="text-base font-semibold text-white">
                  Valoración médica (Traumatología y Ortopedia)
                </h4>
                <p className="mt-1 text-sm text-slate-300">
                  Valoración por médico especialista, ya sea interna o externa. Ideal para diagnóstico,
                  segunda opinión y plan de tratamiento.
                </p>
              </div>

              <a
                href="/agenda/valoracion-medica"
                className="inline-flex items-center justify-center rounded-xl bg-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-lg hover:bg-sky-400"
              >
                Solicitar valoración
              </a>
            </div>
          </div>

          {/* ===================== FISIOTERAPIA (SOLO 2 TARJETAS, SIN LISTA DE FISIOS) ===================== */}
          <div className="mt-10">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h3 className="font-semibold text-slate-200">Fisioterapia</h3>
                 <p className="mt-1 text-sm text-slate-300">
                     La agenda se maneja por tipo de servicio.
                      </p>

               </div>
                      <a
                      href="/fisioterapia/equipo"
                      className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl px-4 py-2.5 text-sm font-semibold text-white shadow-xl ring-1 ring-white/10 transition hover:-translate-y-0.5 hover:shadow-2xl active:translate-y-0"
                    >
                      {/* Glow externo */}
                      <span className="pointer-events-none absolute -inset-1 opacity-0 blur-2xl transition duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_30%_30%,rgba(56,189,248,0.55),transparent_60%),radial-gradient(circle_at_70%_70%,rgba(37,99,235,0.45),transparent_55%)]" />

                      {/* Borde neón */}
                      <span className="pointer-events-none absolute inset-0 rounded-2xl bg-[linear-gradient(135deg,rgba(56,189,248,0.55),rgba(37,99,235,0.35),rgba(255,255,255,0.10))] opacity-60" />
                      <span className="pointer-events-none absolute inset-[1px] rounded-2xl bg-slate-950/80" />

                      {/* Shine */}
                       <span className="pointer-events-none absolute -left-1/2 top-0 h-full w-1/2 skew-x-[-20deg] bg-white/10 opacity-0 transition duration-500 group-hover:left-[120%] group-hover:opacity-100" />

                      {/* Contenido */}
                      <span className="relative inline-flex items-center gap-2">
                        <span className="grid h-8 w-8 place-items-center rounded-xl bg-sky-500/10 ring-1 ring-sky-400/25 transition group-hover:bg-sky-500/15">
                          <Users className="h-4 w-4 text-sky-300" />
                        </span>

                        <span className="leading-none">
                          <span className="block text-[11px] font-semibold text-slate-300/90">
                            Conoce al
                          </span>
                          <span className="block font-semibold tracking-tight">
                            Equipo de fisioterapia
                          </span>
                        </span>

                        <ArrowRight className="h-4 w-4 text-slate-200/90 transition group-hover:translate-x-0.5" />
                      </span>
                    </a>
                </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {/* Card 1 */}
              <section className="rounded-2xl bg-slate-900/40 p-6 ring-1 ring-white/10">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-white">
                      Activación física para adultos mayores
                    </h4>
                    <p className="mt-1 text-sm text-slate-300">
                      Movilidad, equilibrio, fuerza suave, acondicionamiento físico y prevención de caídas.
                    </p>
                  </div>

                  <a
                    href="/agenda/fisioterapia?tipo=adulto-mayor"
                  className="inline-flex items-center justify-center rounded-xl bg-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-lg hover:bg-sky-400"
                >
                  Agendar
                </a>
              </div>
                            <p className="mt-3 text-[11px] text-slate-400">
                * Requisito: para iniciar terapia es necesario haber pasado primero por una{" "}
                <span className="text-slate-200 font-semibold">
                  valoración médica de Ortopedia/Traumatología
                </span>{" "}
                (interna o externa).
              </p>


                <div className="mt-4 rounded-xl bg-slate-950/50 p-4 ring-1 ring-white/10">
                  <p className="text-sm font-semibold text-white">Incluye</p>
                  <ul className="mt-2 space-y-2 text-sm text-slate-300">
                    <li>• Rutinas guiadas y progresivas según condición</li>
                    <li>• Ejercicios para equilibrio y coordinación</li>
                    <li>• Fortalecimiento y movilidad articular</li>
                    <li>• Recomendaciones para actividades diarias</li>
                  </ul>
                </div>
              </section>

              {/* Card 2 */}
              <section className="rounded-2xl bg-slate-900/40 p-6 ring-1 ring-white/10">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-white">
                      Fisioterapia general y funcional
                    </h4>
                    <p className="mt-1 text-sm text-slate-300">
                      Rehabilitación, terapia manual, readaptación, electroterapia y recuperación funcional.
                    </p>
                  </div>

                    <a
                      href="/agenda/fisioterapia?tipo=funcional"
                      className="inline-flex items-center justify-center rounded-xl bg-slate-900/70 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/10 hover:bg-slate-900"
                    >
                      Agendar
                    </a>
                </div>
                    <p className="mt-3 text-[11px] text-slate-400">
                      * Requisito: para iniciar terapia es necesario haber pasado primero por una{" "}
                      <span className="text-slate-200 font-semibold">
                        valoración médica de Ortopedia/Traumatología
                      </span>{" "}
                      (interna o externa).
                    </p>
                    

                <div className="mt-4 rounded-xl bg-slate-950/50 p-4 ring-1 ring-white/10">
                  <p className="text-sm font-semibold text-white">Incluye</p>
                  <ul className="mt-2 space-y-2 text-sm text-slate-300">
                    <li>• Evaluación funcional y objetivos por sesión</li>
                    <li>• Terapia manual y liberación miofascial</li>
                    <li>• Fortalecimiento, estabilidad y movilidad</li>
                    <li>• Plan de ejercicios para casa</li>
                  </ul>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios (anuncios) */}
      <ServicesShowcase />

      <RehabVideosSection />

      {/* Testimonios */}
      <Testimonials />

      {/* Preguntas frecuentes */}
      <FAQ />

      {/* Mapa / Ubicación */}
      <MapSection />
    </>
  );
}
