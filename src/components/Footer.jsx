import {
  Facebook,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowUpRight,
} from "lucide-react";

export default function Footer() {
  // —— EDITA AQUI TUS DATOS ——
  const ABOUT = {
    title: "Ortho Clinic Córdoba",
    blurb:
      "Atención ortopédica y rehabilitación basada en evidencia, con especialistas y equipamiento de vanguardia.",
    address: "Córdoba, Veracruz, México",
  };

  const CONTACT = {
    phoneLabel: "(271) 000 0000",
    phoneHref: "tel:2710000000",
    emailLabel: "contacto@tudominio.com",
    emailHref: "mailto:contacto@tudominio.com",
  };

  const HOURS = {
    weekday: "Lun – Vie · 9:00 – 20:00",
    saturday: "Sáb · 9:00 – 14:00",
  };

  const SOCIAL = {
    youtube: "https://youtube.com/@tucanal",
    facebook: "https://facebook.com/tuclinica",
    instagram: "https://instagram.com/tuclinica",
  };

  const TAGLINE =
    "Cuidamos tu movilidad y rendimiento con tratamientos personalizados y mínima invasión.";

  return (
    <footer className="relative mt-24 bg-slate-950 text-slate-300">
      {/* top border */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* contenido principal */}
      <div className="container safe-px max-w-9xl uw:max-w-10xl py-10 md:py-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Col 1: Acerca */}
          <div className="lg:col-span-3">
            <h4 className="text-lg font-semibold text-white">{ABOUT.title}</h4>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">{ABOUT.blurb}</p>

            <div className="mt-4 flex items-start gap-2 text-sm text-slate-400">
              <MapPin className="mt-0.5 size-4 shrink-0" />
              <span>{ABOUT.address}</span>
            </div>
          </div>

          {/* Col 2: Contacto */}
          <div className="lg:col-span-3">
            <h5 className="text-base font-semibold text-white">Contacto</h5>
            <div className="mt-3 space-y-2 text-sm">
              <a
                href={CONTACT.phoneHref}
                className="flex items-center gap-2 text-slate-300 transition hover:text-white"
              >
                <Phone className="size-4" />
                <span>Tel: {CONTACT.phoneLabel}</span>
              </a>
              <a
                href={CONTACT.emailHref}
                className="flex items-center gap-2 text-slate-300 transition hover:text-white"
              >
                <Mail className="size-4" />
                <span>Email: {CONTACT.emailLabel}</span>
              </a>
            </div>
          </div>

          {/* Col 3: Horarios */}
          <div className="lg:col-span-3">
            <h5 className="text-base font-semibold text-white">Horarios</h5>
            <div className="mt-3 space-y-2 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <Clock className="size-4" />
                <span>{HOURS.weekday}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="size-4" />
                <span>{HOURS.saturday}</span>
              </div>
            </div>
          </div>

          {/* Col 4: Logo grande + tagline + redes */}
          <div className="lg:col-span-3">
            <div className="flex flex-col items-center justify-center gap-4">
              {/* Logo horizontal: pon tu archivo en /public/clinic-logo-wide.png */}
              <img
                src="/public/logo.png"
                alt="Logo de la clínica"
                className="h-24 w-auto object-contain md:h-28 lg:h-32"
              />

              <p className="max-w-xs text-center text-sm leading-relaxed text-slate-400">
                {TAGLINE}
              </p>

              {/* Redes tipo glow (los mismos estilos pro) */}
              <div className="mt-2 flex items-center gap-3">
                <a
                  href={SOCIAL.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex size-10 items-center justify-center rounded-xl border border-white/10 bg-slate-900/60 text-slate-200 transition hover:-translate-y-0.5 hover:border-blue-400/30 hover:bg-blue-500/10 hover:text-white hover:shadow-[0_0_30px] hover:shadow-blue-500/20"
                  aria-label="Facebook"
                >
                  <Facebook className="size-5" />
                </a>

                <a
                  href={SOCIAL.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex size-10 items-center justify-center rounded-xl border border-white/10 bg-slate-900/60 text-slate-200 transition hover:-translate-y-0.5 hover:border-pink-400/30 hover:bg-pink-500/10 hover:text-white hover:shadow-[0_0_30px] hover:shadow-pink-500/20"
                  aria-label="Instagram"
                >
                  <Instagram className="size-5" />
                </a>

                <a
                  href={SOCIAL.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex size-10 items-center justify-center rounded-xl border border-white/10 bg-slate-900/60 text-slate-200 transition hover:-translate-y-0.5 hover:border-rose-400/30 hover:bg-rose-500/10 hover:text-white hover:shadow-[0_0_30px] hover:shadow-rose-500/20"
                  aria-label="YouTube"
                >
                  <Youtube className="size-5" />
                </a>
              </div>

              {/* badge robots opcional */}
              <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                <span>Hecho por:</span>
                <img
                  src="/public/RObots.png"
                  alt="RObots"
                  className="h-5 w-auto rounded-sm ring-1 ring-white/10 object-contain"
                />
                <span className="font-medium text-slate-200">RObots</span>
              </div>
            </div>
          </div>
        </div>
      </div>

     
    </footer>
  );
}
