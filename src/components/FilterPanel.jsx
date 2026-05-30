const FILTER_LABELS = {
  department: 'Department',
  labType: 'Lab type',
  acceptingStudents: 'Accepting students',
  experienceRequired: 'Experience required',
  internationalEligible: 'International eligible',
  paid: 'Compensation',
  classYearAccepted: 'Class year accepted',
};

function FilterGroup({ field, options, selected, onToggle, accentClass }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
        {FILTER_LABELS[field]}
      </h3>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => {
          const active = selected.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onToggle(field, opt)}
              className={
                'text-xs px-2.5 py-1 rounded-full border transition ' +
                (active
                  ? `${accentClass} text-white`
                  : 'bg-white text-slate-700 border-slate-300 hover:border-slate-500')
              }
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function FilterPanel({ filters, filterOptions, onToggle, onClear, activeCount, accentClass = 'bg-howard-blue border-howard-blue', linkClass = 'text-howard-blue' }) {
  return (
    <aside className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-slate-800">Filters</h2>
        <button
          type="button"
          onClick={onClear}
          disabled={activeCount === 0}
          className={`text-xs hover:underline disabled:text-slate-400 disabled:no-underline ${linkClass}`}
        >
          Clear all{activeCount > 0 ? ` (${activeCount})` : ''}
        </button>
      </div>
      <div className="space-y-5">
        {Object.keys(FILTER_LABELS)
          .filter((field) => filterOptions[field])
          .map((field) => (
            <FilterGroup
              key={field}
              field={field}
              options={filterOptions[field]}
              selected={filters[field] || []}
              onToggle={onToggle}
              accentClass={accentClass}
            />
          ))}
      </div>
    </aside>
  );
}
