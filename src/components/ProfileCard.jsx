import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Play, CalendarPlus } from 'lucide-react'
import BookingModal from './BookingModal'

export default function ProfileCard({ person }){
  const [open, setOpen] = useState(false)

  return (
    <div className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4 shadow-card hover:shadow-lg transition">
      <div className="flex items-start gap-4">
        <img src={person.photo} alt={person.name} loading="lazy" className="h-24 w-24 md:h-28 md:w-28 rounded-xl object-cover"/>
        <div className="flex-1">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-lg md:text-xl font-bold tracking-tight">{person.name}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">{person.role} · {person.location}</p>
            </div>
            <Link to={`/book/${person.slug}`} className="btn btn-primary"><CalendarPlus className="h-4 w-4"/> Agendar</Link>
          </div>

          <p className="mt-3 text-sm text-slate-700 dark:text-slate-300 max-w-prose">{person.bio}</p>

          <div className="mt-3 flex flex-wrap gap-2">
            {person.badges.map((b) => (
              <span key={b} className="chip">{b}</span>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button onClick={() => setOpen(true)} className="btn btn-ghost"><Play className="h-4 w-4"/> Ver video</button>
            <button onClick={() => setOpen(true)} className="btn btn-ghost">Precios/servicios</button>
          </div>
        </div>
      </div>

      <BookingModal open={open} setOpen={setOpen} person={person} />
    </div>
  )
}
