export default function Testimonials(){
  const items = [
    { name: 'María G.', text: 'Atención excelente, diagnóstico claro y recuperación rápida.' },
    { name: 'Juan R.', text: 'La terapia con el equipo de fisios me devolvió la movilidad.' },
    { name: 'Elena P.', text: 'Puntuales y profesionales. Súper recomendable.' },
  ]

  return (
    <section className="py-14 md:py-16 uw:py-20 bg-slate-50 dark:bg-slate-900">
      <div className="container max-w-9xl uw:max-w-10xl safe-px">
        <h2 className="font-bold tracking-tight text-fluid-4xl">Testimonios</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300 max-w-prose">Opiniones reales de pacientes.</p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {items.map((t, i) => (
            <div key={i} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-950/60 p-5 shadow-card">
              <p className="text-sm text-slate-700 dark:text-slate-300">“{t.text}”</p>
              <p className="mt-3 text-sm font-semibold text-slate-900 dark:text-white">— {t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
