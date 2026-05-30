import { useMemo, useState } from 'react';
import {
  professors as howardProfessors,
  filterOptions as howardFilterOptions,
} from './data/professors.js';
import {
  professors as stanfordProfessors,
  filterOptions as stanfordFilterOptions,
} from './data/stanfordProfessors.js';
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
    volume: 'Volume I',
    title: 'Howard Undergraduate Research Directory',
    subtitle:
      'A scholarly index of STEM faculty extending laboratory residencies to undergraduate researchers, gathered and curated for the benefit of the inquiring student.',
    professors: howardProfessors,
    filterOptions: howardFilterOptions,
    color: '#003A63',
    colorSoft: 'rgba(0, 58, 99, 0.18)',
    pillActiveStyle: {
      background:
        'linear-gradient(180deg, #0a4d7a 0%, #003A63 55%, #00253f 100%)',
      color: '#E8DFD4',
      borderColor: '#003A63',
      boxShadow:
        'inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.35)',
    },
    chipActiveStyle: {
      background: 'linear-gradient(180deg, #0a4d7a 0%, #003A63 100%)',
      borderColor: '#003A63',
      color: '#E8DFD4',
    },
    resetBtnStyle: {
      background:
        'linear-gradient(180deg, #E51937 0%, #b81026 50%, #8c0c1c 100%)',
      color: '#F3E9D8',
      boxShadow:
        'inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.35)',
    },
  },
  stanford: {
    key: 'stanford',
    label: 'Stanford',
    volume: 'Volume II',
    title: 'Stanford Undergraduate Research Directory',
    subtitle:
      'A scholarly index of laboratories across Electrical Engineering, Computer Science, Cell Biology, Materials Science, and Physics that welcome the undergraduate apprentice into their work.',
    professors: stanfordProfessors,
    filterOptions: stanfordFilterOptions,
    color: '#8C1515',
    colorSoft: 'rgba(140, 21, 21, 0.18)',
    pillActiveStyle: {
      background:
        'linear-gradient(180deg, #a8323e 0%, #8C1515 55%, #5e0e0e 100%)',
      color: '#E8DFD4',
      borderColor: '#8C1515',
      boxShadow:
        'inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.35)',
    },
    chipActiveStyle: {
      background: 'linear-gradient(180deg, #a8323e 0%, #8C1515 100%)',
      borderColor: '#8C1515',
      color: '#E8DFD4',
    },
    resetBtnStyle: {
      background:
        'linear-gradient(180deg, #a8323e 0%, #8C1515 50%, #5e0e0e 100%)',
      color: '#F3E9D8',
      boxShadow:
        'inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.35)',
    },
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

  const setQuery = (value) =>
    setQueries((prev) => ({ ...prev, [institution]: value }));

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

  const activeCount = Object.values(filters).reduce(
    (n, arr) => n + arr.length,
    0,
  );

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

  const noun = current.key === 'stanford' ? 'laboratories' : 'professors';

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Atmospheric overlays */}
      <div className="paper-texture" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />

      <div className="relative z-10 flex flex-col flex-1">
        <Banner />

        {/* Institution selector — brass-bordered pill rail */}
        <div className="border-b border-academia-border bg-academia-bg">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap items-center gap-3">
            <span className="label-cinzel text-[10px] text-academia-mutedFg tracking-[0.28em]">
              Institution
            </span>
            <span
              className="hidden sm:inline-block h-px w-10 bg-gradient-to-r from-academia-accent to-transparent"
              aria-hidden="true"
            />
            <div className="flex gap-2">
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
                      'smooth-chip font-display text-xs uppercase tracking-[0.22em] px-4 py-2 rounded border ' +
                      (active
                        ? 'engraved scale-[1.02]'
                        : 'bg-academia-bgAlt text-academia-accent border-academia-accent/60 hover:border-academia-accent hover:bg-academia-bgAlt2 hover:-translate-y-[1px]')
                    }
                    style={active ? inst.pillActiveStyle : undefined}
                  >
                    {inst.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* School-color canvas — header + main sit on the institution skin */}
        <div
          className="flex-1 flex flex-col"
          style={{
            backgroundColor: current.color,
            transition: 'background-color 600ms ease-out',
            ['--divider-bg']: current.color,
          }}
        >
          {/* Header — proclamation plaque framed by brass flourishes */}
          <header
            key={`hdr-${current.key}`}
            className="relative fade-in-up"
          >
            <div className="max-w-5xl mx-auto px-4 py-12 sm:py-16 text-center">
              <div className="frame-flourish mx-auto inline-block px-8 py-6 sm:px-12 sm:py-8">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <span className="brass-rule" aria-hidden="true" />
                  <span className="volume-label" style={{ color: '#D4B872' }}>
                    {current.volume}
                  </span>
                  <span className="brass-rule brass-rule-right" aria-hidden="true" />
                </div>
                <h1
                  className="font-heading text-3xl sm:text-5xl leading-[1.05] engraved"
                  style={{ color: '#F3E9D8' }}
                >
                  {current.title}
                </h1>
                <div
                  className="ornate-divider mx-auto mt-6 w-72 max-w-full"
                  data-glyph="✶"
                  aria-hidden="true"
                />
                <p className="font-body italic text-academia-fg/90 text-base sm:text-lg mt-5 mx-auto max-w-2xl leading-relaxed drop-cap">
                  {current.subtitle}
                </p>
              </div>
            </div>
          </header>

          <main className="max-w-7xl w-full mx-auto px-4 py-10 sm:py-14 flex-1 w-full">
          {/* Search */}
          <div className="mb-3">
            <p className="volume-label mb-2">Inquiry</p>
            <SearchBar value={query} onChange={setQuery} />
          </div>

          {/* Mobile filter toggle + count */}
          <div className="flex items-center justify-between mt-6 mb-4 lg:hidden">
            <button
              type="button"
              onClick={() => setFilterPanelOpen((o) => !o)}
              className="smooth-chip font-display text-xs uppercase tracking-[0.18em] px-3 py-2 rounded border border-academia-accent/60 text-academia-accentLight bg-academia-bgAlt hover:border-academia-accent"
            >
              {filterPanelOpen ? 'Hide filters' : 'Show filters'}
              {activeCount > 0 ? ` (${activeCount})` : ''}
            </button>
            <p className="font-body italic text-sm text-academia-fg/85">
              {filtered.length} of {current.professors.length}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 mt-2">
            <div className={filterPanelOpen ? 'block' : 'hidden lg:block'}>
              <FilterPanel
                filters={filters}
                filterOptions={current.filterOptions}
                onToggle={toggleFilter}
                onClear={clearFilters}
                activeCount={activeCount}
                activeChipStyle={current.chipActiveStyle}
              />
            </div>

            <div>
              <div className="hidden lg:flex items-baseline justify-between mb-5">
                <div>
                  <p className="volume-label">Index</p>
                  <p className="font-heading text-2xl text-academia-fg leading-none mt-1">
                    Showing{' '}
                    <span className="text-academia-accentLight">
                      {filtered.length}
                    </span>{' '}
                    of {current.professors.length}{' '}
                    <span className="italic">{noun}</span>
                  </p>
                </div>
                {activeCount > 0 ? (
                  <span className="font-display text-[10px] uppercase tracking-[0.22em] text-academia-fg/75">
                    {activeCount} filter{activeCount === 1 ? '' : 's'} applied
                  </span>
                ) : null}
              </div>

              <div
                className="ornate-divider hidden lg:block mb-6"
                data-glyph="❦"
                aria-hidden="true"
              />

              {filtered.length === 0 ? (
                <div className="corner-flourish fade-in-soft bg-academia-bgAlt border border-academia-border rounded p-12 text-center">
                  <p className="volume-label mb-3">An Empty Shelf</p>
                  <p className="font-heading text-2xl text-academia-fg">
                    No {noun} match your inquiry.
                  </p>
                  <p className="font-body italic text-academia-mutedFg mt-2">
                    Loosen a filter or clear your search to consult the full
                    register.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setQuery('');
                      clearFilters();
                    }}
                    className="smooth-all mt-6 font-display text-xs uppercase tracking-[0.2em] px-6 py-2 rounded engraved hover:brightness-110 hover:-translate-y-[1px] active:translate-y-0 active:brightness-95"
                    style={current.resetBtnStyle}
                  >
                    Reset all
                  </button>
                </div>
              ) : (
                <div
                  key={`grid-${current.key}`}
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 fade-in-soft"
                >
                  {filtered.map((p) => (
                    <ProfessorCard key={p.id} professor={p} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
        </div>

        <footer className="border-t border-academia-border bg-academia-bgAlt">
          <div className="max-w-7xl mx-auto px-4 py-6 text-xs flex flex-col sm:flex-row gap-3 justify-between items-center text-center sm:text-left">
            <span className="font-body italic text-academia-mutedFg">
              Sample data only. Names and emails are fictional placeholders for
              demo purposes.
            </span>
            <span className="font-display text-[10px] uppercase tracking-[0.24em] text-academia-mutedFg">
              An MVP Demonstration · Unaffiliated with Howard or Stanford
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
