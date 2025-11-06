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
              <a href="#equipo" className="btn btn-ghost">Conoce al equipo</a>
              <Link to="/book/dr-hernandez" className="btn btn-primary">Apartar cita</Link>
            </div>
          </div>

          {/* Deja vacío para que luzca el fondo */}
          <div className="hidden lg:block" />
        </div>
      </div>
    </section>
  )
}
