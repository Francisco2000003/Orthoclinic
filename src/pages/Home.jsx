import Hero from '../components/Hero'
import ProfileCard from '../components/ProfileCard'
import { STAFF } from '../data/staff'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'

export default function Home(){
  const doctors = STAFF.filter(p => p.role.includes('Médico'))
  const physios = STAFF.filter(p => p.role.includes('Fisioterapeuta'))

  return (
    <>
      <Hero />

      {/* Equipo */}
      <section id="equipo" className="py-14 md:py-16 uw:py-20">
        <div className="container max-w-9xl uw:max-w-10xl safe-px">
          <h2 className="font-bold tracking-tight text-fluid-4xl">Conoce al equipo</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300 max-w-prose">Dos médicos ortopedistas y dos fisioterapeutas.</p>

          <h3 className="mt-8 mb-3 font-semibold text-slate-700 dark:text-slate-200">Doctores</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {doctors.map(p => <ProfileCard key={p.id} person={p} />)}
          </div>

          <h3 className="mt-10 mb-3 font-semibold text-slate-700 dark:text-slate-200">Fisioterapeutas</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {physios.map(p => <ProfileCard key={p.id} person={p} />)}
          </div>
        </div>
      </section>

      {/* Servicios & contacto (placeholder) */}
      <section id="servicios" className="py-14 md:py-16 uw:py-20 bg-slate-50 dark:bg-slate-900">
        <div className="container max-w-9xl uw:max-w-10xl safe-px">
          <h2 className="font-bold tracking-tight text-fluid-4xl">Servicios</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300 max-w-prose">Valoración, seguimiento, rehabilitación y más.</p>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-5 bg-white/60 dark:bg-slate-950/60">Consultas</div>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-5 bg-white/60 dark:bg-slate-950/60">Rehabilitación</div>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-5 bg-white/60 dark:bg-slate-950/60">Procedimientos</div>
          </div>
        </div>
      </section>
<Testimonials />
<FAQ />
      <section id="contacto" className="py-14 md:py-16 uw:py-20">
        <div className="container max-w-9xl uw:max-w-10xl safe-px">
          <h2 className="font-bold tracking-tight text-fluid-4xl">Contacto</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300 max-w-prose">Dirección, WhatsApp y horarios próximamente.</p>
        </div>
      </section>
    </>
  )
}
