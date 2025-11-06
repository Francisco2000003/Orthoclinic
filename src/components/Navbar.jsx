import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { CalendarDays, Menu, X } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/80 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-800">
      <div className="container max-w-9xl uw:max-w-10xl py-3 safe-px">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="h-28 w-auto" />
            <span className="font-bold tracking-tight text-slate-900 dark:text-white">Clínica</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <NavLink to="/" className={({isActive}) => isActive ? 'font-semibold' : 'text-slate-600 dark:text-slate-300'}>Inicio</NavLink>
            <a href="#equipo" className="text-slate-600 dark:text-slate-300">Equipo</a>
            <a href="#servicios" className="text-slate-600 dark:text-slate-300">Servicios</a>
            <a href="#contacto" className="text-slate-600 dark:text-slate-300">Contacto</a>
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <a href="#equipo" className="btn btn-ghost">Ver equipo</a>
            <Link to="/book/dr-hernandez" className="btn btn-primary">
              <CalendarDays className="h-4 w-4" /> Agendar
            </Link>
          </div>

          {/* Mobile toggler */}
          <button
            className="md:hidden inline-flex items-center justify-center rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-900"
            aria-label="Abrir menú"
            aria-expanded={open}
            onClick={() => setOpen(v => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden mt-3 border-t border-slate-200 dark:border-slate-800 pt-3 space-y-2">
            <a href="/" className="block px-2 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900">Inicio</a>
            <a href="#equipo" className="block px-2 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900">Equipo</a>
            <a href="#servicios" className="block px-2 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900">Servicios</a>
            <a href="#contacto" className="block px-2 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900">Contacto</a>
            <Link to="/book/dr-hernandez" className="btn btn-primary w-full justify-center">Agendar</Link>
          </div>
        )}
      </div>
    </header>
  )
}
