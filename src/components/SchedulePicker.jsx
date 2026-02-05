// src/components/SchedulePicker.jsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import DailyCalendar from './DailyCalendar'

const schema = z.object({
  service: z.string().min(1, 'Selecciona un servicio'),
  name: z.string().min(3, 'Nombre muy corto'),
  phone: z.string().min(10, 'Teléfono inválido'),
  // date y time vendrán del calendario; validamos en submit
})

export default function SchedulePicker({ person }){
  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } =
    useForm({ resolver: zodResolver(schema) })

  // Guardamos slot elegido (date + time) en el formulario (hidden) para validarlo/enviarlo
  const pickedDate = watch("date")   // string yyyy-MM-dd
  const pickedTime = watch("time")   // string HH:mm

  const onPickSlot = ({ date, time }) => {
    setValue("date", date, { shouldValidate: true })
    setValue("time", time, { shouldValidate: true })
  }

  const onSubmit = async (values) => {
    // Validación adicional: necesitamos un slot
    if (!values.date || !values.time) {
      alert("Selecciona un horario en el calendario.")
      return
    }

    // MOCK: aquí abrimos WhatsApp (puedes cambiar por fetch() al backend)
    const msg = `Hola, quiero agendar con ${person.name}.
Servicio: ${values.service}
Fecha: ${values.date}
Hora: ${values.time}
Nombre: ${values.name}
Tel: ${values.phone}`
    const recepcion = '522291234567' // 52 + LADA + número (sin +)
    const url = `https://wa.me/${recepcion}?text=${encodeURIComponent(msg)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Servicio */}
      <div>
        <label className="text-sm font-medium">Servicio</label>
        <select
          className="mt-1 w-full rounded-xl border border-slate-300 bg-white p-2 dark:bg-slate-950 dark:border-slate-800"
          {...register('service')}
        >
          <option value="">— Selecciona —</option>
          {person.services.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        {errors.service && <p className="text-xs text-red-600 mt-1">{errors.service.message}</p>}
      </div>

      {/* Calendario diario */}
      <DailyCalendar person={person} onPick={onPickSlot} />

      

      {/* Datos del paciente */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium">Nombre completo</label>
          <input
            className="mt-1 w-full rounded-xl border border-slate-300 bg-white p-2 dark:bg-slate-950 dark:border-slate-800"
            placeholder="Tu nombre"
            {...register('name')}
          />
          {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="text-sm font-medium">Teléfono</label>
          <input
            className="mt-1 w-full rounded-xl border border-slate-300 bg-white p-2 dark:bg-slate-950 dark:border-slate-800"
            placeholder="10 dígitos"
            maxLength={10}
            inputMode="numeric"
            pattern="\d{10}"
            title="Ingresa 10 dígitos"
            {...register('phone')}
          />
          {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone.message}</p>}
        </div>
      </div>

      {/* Hidden fields para enviar/validar fecha-hora */}
      <input type="hidden" {...register("date")} />
      <input type="hidden" {...register("time")} />

      <button type="submit" className="btn btn-primary w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Enviando…' : 'Solicitar cita'}
      </button>
      <p className="text-xs text-slate-500">* Selecciona primero un horario en el calendario.</p>
    </form>
  )
}
