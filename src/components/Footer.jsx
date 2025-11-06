export default function Footer(){
  return (
    <footer className="mt-12 border-t border-slate-200 dark:border-slate-800">
      <div className="container max-w-9xl uw:max-w-10xl py-8 text-sm text-slate-500 safe-px">
        © {new Date().getFullYear()} Clínica. Todos los derechos reservados.
      </div>
    </footer>
  )
}
