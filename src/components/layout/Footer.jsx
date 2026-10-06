import { site } from '../../data/site'

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink">
      <div className="container-x flex flex-col items-center justify-between gap-3 py-8 text-center md:py-10 lg:flex-row lg:text-left">
        <p className="eyebrow text-[10px] leading-loose text-mist">
          <span className="block font-semibold text-bone lg:inline">{site.name}</span>
          <span className="mx-4 hidden text-smoke lg:inline">|</span>
          <span className="mt-1 block lg:mt-0 lg:inline">{site.tagline}</span>
        </p>
        <p className="text-[11px] tracking-wide text-smoke">
          © {new Date().getFullYear()} {site.name}. All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}
