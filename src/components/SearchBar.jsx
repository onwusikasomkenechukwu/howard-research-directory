export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative">
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by name, department, research area, keywords…"
        className="w-full rounded border border-academia-border bg-academia-bgAlt pl-11 pr-3 py-3 text-base font-body text-academia-fg placeholder:italic placeholder:text-academia-mutedFg shadow-[inset_0_1px_0_rgba(0,0,0,0.35)] focus:border-academia-accent focus:outline-none focus:ring-2 focus:ring-academia-accent/40 transition-colors"
      />
      <svg
        className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-academia-accent"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
        />
      </svg>
    </div>
  );
}
