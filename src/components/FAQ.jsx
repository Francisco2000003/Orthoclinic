export default function FAQ(){
  const faqs = [
    { q: '¿Cómo aparto una cita?', a: 'Elige al profesional, selecciona servicio, fecha y hora y confirma.' },
    { q: '¿Atienden urgencias?', a: 'Sí. Escríbenos por WhatsApp para disponibilidad inmediata.' },
    { q: '¿Aceptan aseguradoras?', a: 'Sí, según póliza. Te orientamos con la documentación.' },
  ]

  return (
    <section className="py-14 md:py-16 uw:py-20">
      <div className="container max-w-9xl uw:max-w-10xl safe-px">
        <h2 className="font-bold tracking-tight text-fluid-4xl">Preguntas frecuentes</h2>
        <div className="mt-6 space-y-4">
          {faqs.map((f, i) => (
            <div key={i} className="rounded-2xl border border-slate-200 dark:border-slate-800 p-5 bg-white/70 dark:bg-slate-950/60">
              <p className="font-semibold">{f.q}</p>
              <p className="mt-1 text-slate-600 dark:text-slate-300">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
