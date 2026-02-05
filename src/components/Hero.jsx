import { Link } from 'react-router-dom'
import heroXray from "../assets/hero-xray.png";

export default function Hero(){
  return (
    // La imagen va en el SECTION para que cubra todo el alto del hero
    <section
      className="relative overflow-hidden bg-cover bg-center min-h-[560px] md:min-h-[640px] uw:min-h-[720px]"
      style={{
        backgroundImage: `url(${heroXray})`,
        backgroundPosition: '60% 40%', // mueve el foco si quieres
      }}
    >
      {/* ❗️Sin overlay: imagen sin opacidad */}
      {/* Si luego quieres un toque de contraste MUY leve:
          <div className="absolute inset-0 bg-black/10" />
      */}

      {/* Contenido */}
      <div className="relative z-10 container max-w-9xl uw:max-w-10xl
                pt-28 md:pt-36 uw:pt-44   /* ⬅️ más alto arriba */
                pb-12 md:pb-16           /* ⬅️ normal abajo */
                safe-px">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="chip">Salud ortopédica y rehabilitación</span>

            <h1 className="mt-16 font-extrabold tracking-tight text-fluid-5xl text-[#2FD0D8]">
              ORTHO CLINIC
            </h1>

            <h1 className="mt-6 md:mt-8 uw:mt-10 font-extrabold tracking-tight text-fluid-5xl">
              Atención médica y fisioterapia con especialistas
            </h1>

            <p className="mt-4 text-base md:text-lg text-white max-w-prose">
              Dos médicos ortopedistas y dos fisioterapeutas listos para atenderte.
              Agenda tu cita con el profesional adecuado.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
                  <a
                      href="#equipo"
                      className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl px-5 py-2.5 text-sm font-semibold text-white shadow-xl ring-1 ring-white/10 transition hover:-translate-y-0.5 hover:shadow-2xl active:translate-y-0"
                    >
                      <span className="pointer-events-none absolute -inset-1 opacity-0 blur-2xl transition duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_30%_30%,rgba(56,189,248,0.55),transparent_60%),radial-gradient(circle_at_70%_70%,rgba(37,99,235,0.45),transparent_55%)]" />
                      <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(56,189,248,0.45),rgba(37,99,235,0.30),rgba(255,255,255,0.10))]" />
                      <span className="pointer-events-none absolute inset-[1px] rounded-2xl bg-slate-950/80" />
                      <span className="pointer-events-none absolute -left-1/2 top-0 h-full w-1/2 skew-x-[-20deg] bg-white/10 opacity-0 transition duration-500 group-hover:left-[120%] group-hover:opacity-100" />

                      <span className="relative inline-flex items-center gap-2">
                        <span className="grid h-8 w-8 place-items-center rounded-xl bg-sky-500/10 ring-1 ring-sky-400/25">
                          <svg viewBox="0 0 24 24" className="h-4 w-4 text-sky-300" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                          </svg>
                        </span>
                        Conoce al equipo
                      </span>
                    </a>
            </div>
          </div>

          {/* Deja vacío para que luzca el fondo */}
          <div className="hidden lg:block" />
        </div>
      </div>
    </section>
  )
}
