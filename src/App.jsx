import { useMemo, useState } from 'react';
import { professors as howardProfessors, filterOptions as howardFilterOptions } from './data/professors.js';
import { professors as stanfordProfessors, filterOptions as stanfordFilterOptions } from './data/stanfordProfessors.js';
import Banner from './components/Banner.jsx';
import SearchBar from './components/SearchBar.jsx';
import FilterPanel from './components/FilterPanel.jsx';
import ProfessorCard from './components/ProfessorCard.jsx';

const EMPTY_FILTERS = {
  department: [],
  labType: [],
  acceptingStudents: [],
  experienceRequired: [],
  internationalEligible: [],
  paid: [],
  classYearAccepted: [],
};

const INSTITUTIONS = {
  howard: {
    key: 'howard',
    label: 'Howard',
    title: 'Howard Undergraduate Research Directory',
    subtitle: 'Find STEM faculty accepting undergraduate researchers.',
    professors: howardProfessors,
    filterOptions: howardFilterOptions,
    headerClass: 'bg-howard-blue',
    accentClass: 'bg-howard-blue border-howard-blue',
    linkClass: 'text-howard-blue',
    activeTabClass: 'bg-howard-blue text-white border-howard-blue',
    inactiveTabClass: 'bg-white text-howard-blue border-slate-300 hover:border-howard-blue',
    resetBtnClass: 'bg-howard-blue text-white',
  },
  stanford: {
    key: 'stanford',
    label: 'Stanford',
    title: 'Stanford Undergraduate Research Directory',
    subtitle: 'Find labs across CS, EE, Cell Biology, MSE, and Physics accepting undergraduate researchers.',
    professors: stanfordProfessors,
    filterOptions: stanfordFilterOptions,
    headerClass: 'bg-[#8C1515]',
    accentClass: 'bg-[#8C1515] border-[#8C1515]',
    linkClass: 'text-[#8C1515]',
    activeTabClass: 'bg-[#8C1515] text-white border-[#8C1515]',
    inactiveTabClass: 'bg-white text-[#8C1515] border-slate-300 hover:border-[#8C1515]',
    resetBtnClass: 'bg-[#8C1515] text-white',
  },
};

export default function App() {
  const [institution, setInstitution] = useState('howard');
  const [queries, setQueries] = useState({ howard: '', stanford: '' });
  const [allFilters, setAllFilters] = useState({
    howard: EMPTY_FILTERS,
    stanford: EMPTY_FILTERS,
  });
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);

  const current = INSTITUTIONS[institution];
  const query = queries[institution];
  const filters = allFilters[institution];

  const setQuery = (value) => setQueries((prev) => ({ ...prev, [institution]: value }));

  const toggleFilter = (field, value) => {
    setAllFilters((prev) => {
      const currentFilters = prev[institution];
      const list = currentFilters[field] || [];
      const next = list.includes(value)
        ? list.filter((v) => v !== value)
        : [...list, value];
      return {
        ...prev,
        [institution]: { ...currentFilters, [field]: next },
      };
    });
  };

  const clearFilters = () =>
    setAllFilters((prev) => ({ ...prev, [institution]: EMPTY_FILTERS }));

  const activeCount = Object.values(filters).reduce((n, arr) => n + arr.length, 0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return current.professors.filter((p) => {
      if (q) {
        const hay =
          `${p.name} ${p.department} ${p.researchArea} ${p.researchDescription}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      for (const field of Object.keys(filters)) {
        const sel = filters[field];
        if (sel.length > 0 && !sel.includes(p[field])) return false;
      }
      return true;
    });
  }, [query, filters, current.professors]);

  return (
    <div className="min-h-screen flex flex-col">
      <Banner />

      <div className="bg-slate-100 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase tracking-wide text-slate-500 mr-1">
            Institution:
          </span>
          {Object.values(INSTITUTIONS).map((inst) => {
            const active = institution === inst.key;
            return (
              <button
                key={inst.key}
                type="button"
                onClick={() => {
                  setInstitution(inst.key);
                  setFilterPanelOpen(false);
                }}
                aria-pressed={active}
                className={
                  'text-sm font-medium px-3 py-1.5 rounded-full border transition ' +
                  (active ? inst.activeTabClass : inst.inactiveTabClass)
                }
              >
                {inst.label}
              </button>
            );
          })}
        </div>
      </div>

      <header className={`${current.headerClass} text-white`}>
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-xl sm:text-2xl font-bold">{current.title}</h1>
          <p className="text-sm text-white/80 mt-1">{current.subtitle}</p>
        </div>
      </header>

      <div className="max-w-7xl w-full mx-auto px-4 py-6 flex-1">
        <div className="mb-4">
          <SearchBar value={query} onChange={setQuery} />
        </div>

        <div className="flex items-center justify-between mb-4 lg:hidden">
          <button
            type="button"
            onClick={() => setFilterPanelOpen((o) => !o)}
            className="text-sm px-3 py-1.5 rounded border border-slate-300 bg-white"
          >
            {filterPanelOpen ? 'Hide filters' : 'Show filters'}
            {activeCount > 0 ? ` (${activeCount})` : ''}
          </button>
          <p className="text-sm text-slate-600">
            Showing {filtered.length} of {current.professors.length}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
          <div className={filterPanelOpen ? 'block' : 'hidden lg:block'}>
            <FilterPanel
              filters={filters}
              filterOptions={current.filterOptions}
              onToggle={toggleFilter}
              onClear={clearFilters}
              activeCount={activeCount}
              accentClass={current.accentClass}
              linkClass={current.linkClass}
            />
          </div>

          <div>
            <p className="hidden lg:block text-sm text-slate-600 mb-3">
              Showing <strong>{filtered.length}</strong> of {current.professors.length} {current.key === 'stanford' ? 'labs' : 'professors'}
            </p>

            {filtered.length === 0 ? (
              <div className="bg-white border border-dashed border-slate-300 rounded-lg p-10 text-center">
                <p className="text-slate-700 font-medium">No {current.key === 'stanford' ? 'labs' : 'professors'} match your filters.</p>
                <p className="text-sm text-slate-500 mt-1">
                  Try removing a filter or clearing your search.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    clearFilters();
                  }}
                  className={`mt-4 text-sm px-3 py-1.5 rounded ${current.resetBtnClass}`}
                >
                  Reset all
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map((p) => (
                  <ProfessorCard key={p.id} professor={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="bg-white border-t border-slate-200 mt-8">
        <div className="max-w-7xl mx-auto px-4 py-4 text-xs text-slate-500 flex flex-col sm:flex-row gap-2 justify-between">
          <span>
            Sample data only. Names and emails are fictional placeholders for demo purposes.
          </span>
          <span>MVP demo — not affiliated with any official Howard or Stanford listing.</span>
        </div>
      </footer>
    </div>
  );
}
