import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import SchedulePicker from './SchedulePicker'

export default function BookingModal({ open, setOpen, person }){
  if(!person) return null
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => setOpen(false)}>
        <Transition.Child as={Fragment}
          enter="ease-out duration-200" enterFrom="opacity-0" enterTo="opacity-100"
          leave="ease-in duration-150" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black/40" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child as={Fragment}
              enter="ease-out duration-200" enterFrom="opacity-0 translate-y-2" enterTo="opacity-100 translate-y-0"
              leave="ease-in duration-150" leaveFrom="opacity-100" leaveTo="opacity-0">
              <Dialog.Panel className="w-full max-w-2xl uw:max-w-3xl transform overflow-hidden rounded-2xl bg-white dark:bg-slate-950 p-6 text-left align-middle shadow-xl">
                <Dialog.Title className="text-lg md:text-xl font-bold">Agendar con {person.name}</Dialog.Title>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Selecciona servicio y horario disponible.</p>

                <div className="mt-4 grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="aspect-video rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900">
                      <iframe className="w-full h-full" src={person.videoUrl} title={person.name} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                    </div>
                    <ul className="mt-3 space-y-1 text-sm list-disc list-inside">
                      {person.services.map(s => <li key={s}>{s}</li>)}
                    </ul>
                  </div>
                  <div>
                    <SchedulePicker person={person} />
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-2">
                  <button className="btn btn-ghost" onClick={() => setOpen(false)}>Cerrar</button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
