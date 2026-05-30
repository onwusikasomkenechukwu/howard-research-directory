const FILTER_LABELS = {
  department: 'Department',
  labType: 'Lab type',
  acceptingStudents: 'Accepting students',
  experienceRequired: 'Experience required',
  internationalEligible: 'International eligible',
  paid: 'Compensation',
  classYearAccepted: 'Class year accepted',
};

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

function FilterGroup({ field, numeral, options, selected, onToggle, activeChipStyle }) {
  return (
    <div>
      <div className="flex items-baseline gap-2 mb-2">
        <span className="font-display text-[10px] tracking-[0.28em] text-academia-accent">
          {numeral}.
        </span>
        <h3 className="font-display text-[10px] uppercase tracking-[0.22em] text-academia-mutedFg">
          {FILTER_LABELS[field]}
        </h3>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => {
          const active = selected.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onToggle(field, opt)}
              aria-pressed={active}
              className={
                'smooth-chip text-[11px] font-display uppercase tracking-[0.12em] px-2.5 py-1 rounded border ' +
                (active
                  ? 'text-academia-fg engraved scale-[1.02]'
                  : 'bg-academia-bg text-academia-fg/85 border-academia-border hover:border-academia-accent hover:text-academia-accentLight hover:-translate-y-[1px]')
              }
              style={active ? activeChipStyle : undefined}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function FilterPanel({
  filters,
  filterOptions,
  onToggle,
  onClear,
  activeCount,
  activeChipStyle,
}) {
  const fields = Object.keys(FILTER_LABELS).filter((f) => filterOptions[f]);
  return (
    <aside className="corner-flourish bg-academia-bgAlt border border-academia-border rounded p-6 shadow-[0_8px_24px_rgba(0,0,0,0.25)]">
      <div className="flex items-baseline justify-between mb-5">
        <div>
          <p className="volume-label">Apparatus</p>
          <h2 className="font-heading text-2xl text-academia-fg leading-none mt-1">Filters</h2>
        </div>
        <button
          type="button"
          onClick={onClear}
          disabled={activeCount === 0}
          className="font-display text-[10px] uppercase tracking-[0.2em] text-academia-accent hover:text-academia-accentLight hover:underline underline-offset-4 disabled:text-academia-mutedFg disabled:no-underline disabled:cursor-not-allowed transition"
        >
          Clear all{activeCount > 0 ? ` (${activeCount})` : ''}
        </button>
      </div>

      <div className="ornate-divider ornate-divider-onAlt mb-5" data-glyph="❦" aria-hidden="true" />

      <div className="space-y-5">
        {fields.map((field, i) => (
          <FilterGroup
            key={field}
            field={field}
            numeral={ROMAN[i]}
            options={filterOptions[field]}
            selected={filters[field] || []}
            onToggle={onToggle}
            activeChipStyle={activeChipStyle}
          />
        ))}
      </div>
    </aside>
  );
}
