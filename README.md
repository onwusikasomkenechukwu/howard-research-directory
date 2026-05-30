# Howard Undergraduate Research Directory (Demo)

Single-page React + Vite + Tailwind app for browsing Howard STEM faculty accepting undergraduate researchers.

> **Demo with sample data only.** All 20 professors are fictional placeholders (`Dr. A. Sample`, `Dr. B. Example`, …) with `@sample.howard.edu` emails. The banner at the top of the app makes this explicit to viewers.

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

## Swapping in real data

All listings live in **[`src/data/professors.js`](src/data/professors.js)** as a single exported array. To replace the demo entries with real ones after the demo:

1. Open `src/data/professors.js`.
2. Replace the objects in the `professors` array. Each entry must have these fields:

   ```js
   {
     id, name, department, email,
     researchArea, researchDescription,
     labType,                // 'Wet' | 'Dry' | 'Computational' | 'Field'
     acceptingStudents,      // 'Yes' | 'No' | 'Seasonal'
     experienceRequired,     // 'None' | 'Some' | 'Significant'
     internationalEligible,  // 'Yes' | 'No' | 'Case-by-case'
     paid,                   // 'Paid' | 'Unpaid' | 'Varies'
     duration,               // 'Semester' | 'Year' | 'Multi-year'
     lastUpdated,            // 'YYYY-MM-DD'
   }
   ```

3. If you add new departments, extend `filterOptions.department` in the same file so the filter chips pick them up.
4. Remove the demo banner by deleting the `<Banner />` line in [`src/App.jsx`](src/App.jsx) once real data is in.

No other files need to change to swap data.

## Project layout

```
src/
  App.jsx                 search + filter state, layout
  data/professors.js      ← seed data (swap this)
  components/
    Banner.jsx            sample-data notice
    SearchBar.jsx
    FilterPanel.jsx       multi-select chips, 6 facets
    ProfessorCard.jsx     expandable description, badges, mailto
```
