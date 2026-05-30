export default function Banner() {
  return (
    <div className="relative z-10 border-b border-academia-border bg-academia-bgAlt2 text-academia-fg">
      <div className="max-w-7xl mx-auto px-4 py-2 text-center text-sm flex items-center justify-center gap-3 flex-wrap">
        <span className="label-cinzel text-[10px] tracking-[0.3em] text-academia-accent">
          Notice
        </span>
        <span className="hidden sm:inline-block h-3 w-px bg-academia-border" aria-hidden="true" />
        <span className="font-body italic">
          <strong className="not-italic font-display uppercase tracking-[0.18em] text-academia-accent text-xs">
            Demo with sample data
          </strong>{' '}
          — real listings for both institutions in progress.
        </span>
      </div>
    </div>
  );
}
