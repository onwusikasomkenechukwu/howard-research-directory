export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative">
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by name, department, research area, keywords…"
        className="w-full rounded-md border border-slate-300 bg-white pl-10 pr-3 py-2.5 text-sm shadow-sm focus:border-howard-blue focus:outline-none focus:ring-1 focus:ring-howard-blue"
      />
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
      </svg>
    </div>
  );
}
