```markdown
# Multi-Institution Undergraduate Research Directory (Demo)

Single-page React + Vite + Tailwind app for browsing labs accepting undergraduate researchers across multiple institutions. Currently covers **Howard University** and **Stanford University**.

> **Demo with sample data only.** All 40 entries (20 per institution) are fictional placeholders (`Dr. A. Sample`, `Dr. B. Example`, …) with `@sample.howard.edu` / `@sample.stanford.edu` emails. The banner at the top of the app makes this explicit to viewers.

## Local setup (one command)

```
npm install && npm run dev
```

Then open the URL Vite prints (default: `http://localhost:5173`).

## Production build

```
npm run build
```

Outputs a static site to `dist/`. Deploys to Vercel as-is — the Vite preset is auto-detected; no config needed.

## Using the app

- **Institution selector** sits below the banner: toggle between **Howard** (default) and **Stanford**. Switching swaps the entire dataset, updates the page header, and re-themes accent colors (Howard blue / Stanford cardinal).
- **Search query and filters are independent per institution** — toggling back to Howard preserves what you had selected there.
- Stanford entries surface a **hidden-pipeline callout** ("Entry path: …") when applicable — e.g. *"Students from EE 108 often get recruited."* This field is null on Howard entries and doesn't render.
- Both datasets support the **class-year-accepted** filter (`Freshmen OK`, `Sophomore+`, `Junior+`), a validated must-have from the discovery interviews at both schools.

## Swapping in real data

Each institution has its own data file:

- **Howard:** [`src/data/professors.js`](src/data/professors.js)
- **Stanford:** [`src/data/stanfordProfessors.js`](src/data/stanfordProfessors.js)

Both export a `professors` array and a `filterOptions` object using the same model. To replace the demo entries with real ones:

1. Open the appropriate data file.
2. Replace the objects in the `professors` array. Each entry must have these fields:

   ```js
   {
     id, name, department, email,
     researchArea, researchDescription,
     labType,                // 'Wet' | 'Dry' | 'Computational' | 'Field' | 'Hardware'
     acceptingStudents,      // 'Yes' | 'No' | 'Seasonal'
     experienceRequired,     // 'None' | 'Some' | 'Significant'
     internationalEligible,  // 'Yes' | 'No' | 'Case-by-case'
     paid,                   // 'Paid' | 'Unpaid' | 'Varies'
     duration,               // 'Semester' | 'Year' | 'Multi-year'
     classYearAccepted,      // 'Freshmen OK' | 'Sophomore+' | 'Junior+'
     hiddenPipeline,         // string | null  (renders as a callout on the card if non-null)
     lastUpdated,            // 'YYYY-MM-DD'
   }
   ```

   `'Hardware'` is a Stanford-validated lab type (RSG, BCIs); Howard's file does not need to use it. `hiddenPipeline` can stay `null` for any institution where that pattern isn't tracked.

3. If you add new departments or lab types, extend the matching arrays in `filterOptions` in the same file so the filter chips pick them up.
4. Remove the demo banner by deleting the `<Banner />` line in [`src/App.jsx`](src/App.jsx) once real data is in.

### Adding a third institution

1. Create `src/data/<school>Professors.js` following the same export shape.
2. Add an entry to the `INSTITUTIONS` map in [`src/App.jsx`](src/App.jsx) with the institution's title, subtitle, imported data, and Tailwind accent classes. The tab selector picks it up automatically.

No other files need to change to swap or extend data.

## Project layout

```
src/
  App.jsx                       institution selector, search + filter state, layout
  data/
    professors.js               ← Howard seed data (swap this)
    stanfordProfessors.js       ← Stanford seed data (swap this)
  components/
    Banner.jsx                  sample-data notice
    SearchBar.jsx
    FilterPanel.jsx             multi-select chips, accepts per-institution filterOptions
    ProfessorCard.jsx           expandable description, badges, hidden-pipeline callout, mailto
```
```
