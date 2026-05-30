import { filterOptions } from '../data/professors.js';

const FILTER_LABELS = {
  department: 'Department',
  labType: 'Lab type',
  acceptingStudents: 'Accepting students',
  experienceRequired: 'Experience required',
  internationalEligible: 'International eligible',
  paid: 'Compensation',
};

function FilterGroup({ field, selected, onToggle }) {
  const options = filterOptions[field];
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
                  ? 'bg-howard-blue text-white border-howard-blue'
                  : 'bg-white text-slate-700 border-slate-300 hover:border-howard-blue')
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

export default function FilterPanel({ filters, onToggle, onClear, activeCount }) {
  return (
    <aside className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-slate-800">Filters</h2>
        <button
          type="button"
          onClick={onClear}
          disabled={activeCount === 0}
          className="text-xs text-howard-blue hover:underline disabled:text-slate-400 disabled:no-underline"
        >
          Clear all{activeCount > 0 ? ` (${activeCount})` : ''}
        </button>
      </div>
      <div className="space-y-5">
        {Object.keys(FILTER_LABELS).map((field) => (
          <FilterGroup
            key={field}
            field={field}
            selected={filters[field]}
            onToggle={onToggle}
          />
        ))}
      </div>
    </aside>
  );
}
