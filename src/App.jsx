import { useMemo, useState } from 'react';
import { professors } from './data/professors.js';
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
};

export default function App() {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);

  const toggleFilter = (field, value) => {
    setFilters((prev) => {
      const current = prev[field];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [field]: next };
    });
  };

  const clearFilters = () => setFilters(EMPTY_FILTERS);

  const activeCount = Object.values(filters).reduce((n, arr) => n + arr.length, 0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return professors.filter((p) => {
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
  }, [query, filters]);

  return (
    <div className="min-h-screen flex flex-col">
      <Banner />

      <header className="bg-howard-blue text-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-xl sm:text-2xl font-bold">
            Howard Undergraduate Research Directory
          </h1>
          <p className="text-sm text-white/80 mt-1">
            Find STEM faculty accepting undergraduate researchers.
          </p>
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
            Showing {filtered.length} of {professors.length}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
          <div className={filterPanelOpen ? 'block' : 'hidden lg:block'}>
            <FilterPanel
              filters={filters}
              onToggle={toggleFilter}
              onClear={clearFilters}
              activeCount={activeCount}
            />
          </div>

          <div>
            <p className="hidden lg:block text-sm text-slate-600 mb-3">
              Showing <strong>{filtered.length}</strong> of {professors.length} professors
            </p>

            {filtered.length === 0 ? (
              <div className="bg-white border border-dashed border-slate-300 rounded-lg p-10 text-center">
                <p className="text-slate-700 font-medium">No professors match your filters.</p>
                <p className="text-sm text-slate-500 mt-1">
                  Try removing a filter or clearing your search.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    clearFilters();
                  }}
                  className="mt-4 text-sm px-3 py-1.5 rounded bg-howard-blue text-white"
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
          <span>MVP demo — not affiliated with any official Howard University listing.</span>
        </div>
      </footer>
    </div>
  );
}
