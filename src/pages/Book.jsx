import { useParams } from 'react-router-dom'
import { STAFF } from '../data/staff'
import SchedulePicker from '../components/SchedulePicker'

export default function Book(){
  const { slug } = useParams()
  const person = STAFF.find(p => p.slug === slug)

  if(!person){
    return (
      <div className="container max-w-3xl py-10 safe-px">
        <h1 className="text-xl md:text-2xl font-bold">Profesional no encontrado</h1>
        <p className="mt-2 text-slate-600">Revisa el enlace o vuelve al inicio.</p>
      </div>
    )
  }

  return (
    <div className="container max-w-4xl uw:max-w-5xl py-10 safe-px">
      <div className="flex flex-col md:flex-row items-start gap-6">
        <img src={person.photo} alt={person.name} className="h-24 w-24 md:h-28 md:w-28 rounded-xl object-cover" />
        <div>
          <h1 className="text-xl md:text-2xl font-bold">Agendar con {person.name}</h1>
          <p className="text-sm text-slate-600 dark:text-slate-300">{person.role} · {person.location}</p>
          <div className="mt-3">
            <span className="chip">Agenda en línea</span>
          </div>
        </div>
      </div>

      <div className="mt-6 grid md:grid-cols-2 gap-8">
        <div>
          <div className="aspect-video rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900">
            <iframe className="w-full h-full"src={person.videoUrl}title={person.name}loading="lazy"frameBorder="0"allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"allowFullScreen></iframe>
          </div>
          <p className="mt-3 text-sm text-slate-700 dark:text-slate-300 max-w-prose">{person.bio}</p>
          <ul className="mt-3 list-disc list-inside text-sm">
            {person.services.map(s => <li key={s}>{s}</li>)}
          </ul>
        </div>
        <div>
          <SchedulePicker person={person} />
        </div>
      </div>
    </div>
  )
}
