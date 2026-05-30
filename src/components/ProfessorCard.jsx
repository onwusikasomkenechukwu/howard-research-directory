import { useState } from 'react';

function Chip({ label, value }) {
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-display uppercase tracking-[0.14em] text-academia-fg/85 border border-academia-border bg-academia-bg/40 rounded px-2 py-[3px]">
      <span className="text-academia-mutedFg">{label}</span>
      <span className="text-academia-accentLight">{value}</span>
    </span>
  );
}

const acceptingSealClass = {
  Yes: 'wax-seal-crimson',
  Seasonal: 'wax-seal-brass',
  No: 'wax-seal-blue',
};

export default function ProfessorCard({ professor }) {
  const [expanded, setExpanded] = useState(false);
  const mailtoOutdated =
    `mailto:research-directory@sample.howard.edu` +
    `?subject=${encodeURIComponent(`Outdated listing: ${professor.name}`)}` +
    `&body=${encodeURIComponent(
      `The listing for ${professor.name} (ID ${professor.id}) appears outdated.\n\nDetails:\n`,
    )}`;

  const sealClass = acceptingSealClass[professor.acceptingStudents] || 'wax-seal-crimson';
  const sealLabel =
    professor.acceptingStudents === 'Yes'
      ? 'Open'
      : professor.acceptingStudents === 'Seasonal'
      ? 'Seasonal'
      : 'Closed';

  return (
    <article className="corner-flourish relative bg-academia-bgAlt border border-academia-border rounded shadow-none hover:shadow-[0_10px_28px_rgba(0,0,0,0.45)] hover:border-academia-accent/40 transition-all duration-300 flex flex-col">
      {/* Brass title band */}
      <div className="relative border-b border-academia-border bg-gradient-to-b from-academia-bgAlt2 to-academia-bgAlt px-5 pt-4 pb-3">
        <p className="font-display text-[10px] uppercase tracking-[0.28em] text-academia-accent">
          {professor.department}
        </p>
        <h3 className="font-heading text-xl text-academia-fg leading-tight mt-1 pr-16">
          {professor.name}
        </h3>

        {/* Wax seal — accepting status */}
        <div
          className={`wax-seal ${sealClass} absolute -top-3 right-4 h-12 w-12 text-[9px]`}
          aria-label={`Accepting students: ${professor.acceptingStudents}`}
        >
          {sealLabel}
        </div>
      </div>

      <div className="px-5 pt-4 pb-5 flex flex-col flex-1">
        <p className="font-heading italic text-base text-academia-accentLight">
          {professor.researchArea}
        </p>

        <p
          className="mt-2 font-body text-[15px] text-academia-fg/85 leading-relaxed"
          style={
            expanded
              ? undefined
              : {
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }
          }
        >
          {professor.researchDescription}
        </p>
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          className="self-start mt-2 font-display text-[10px] uppercase tracking-[0.2em] text-academia-accent hover:text-academia-accentLight hover:underline underline-offset-4 transition"
        >
          {expanded ? '— Show less' : '— Read more'}
        </button>

        {professor.hiddenPipeline ? (
          <div className="mt-4 border-l-2 border-academia-accent bg-academia-bg/40 pl-3 pr-3 py-2">
            <p className="font-display text-[9px] uppercase tracking-[0.28em] text-academia-accent mb-0.5">
              Entry Path
            </p>
            <p className="font-body italic text-sm text-academia-fg/90 leading-snug">
              {professor.hiddenPipeline}
            </p>
          </div>
        ) : null}

        <div className="mt-4 flex flex-wrap gap-1.5">
          <Chip label="Lab" value={professor.labType} />
          <Chip label="Exp" value={professor.experienceRequired} />
          <Chip label="Intl" value={professor.internationalEligible} />
          <Chip label="Pay" value={professor.paid} />
          <Chip label="Term" value={professor.duration} />
          {professor.classYearAccepted ? (
            <Chip label="Year" value={professor.classYearAccepted} />
          ) : null}
        </div>

        <div className="mt-4 pt-3 border-t border-academia-border flex items-center justify-between gap-2 text-xs">
          <a
            href={`mailto:${professor.email}`}
            className="font-body italic text-academia-accent hover:text-academia-accentLight hover:underline underline-offset-4 truncate max-w-[62%]"
          >
            {professor.email}
          </a>
          <span
            className="font-display text-[9px] uppercase tracking-[0.22em] text-academia-mutedFg whitespace-nowrap"
            title={`Last updated ${professor.lastUpdated}`}
          >
            Updated {professor.lastUpdated}
          </span>
        </div>

        <div className="mt-2 text-right">
          <a
            href={mailtoOutdated}
            className="font-display text-[9px] uppercase tracking-[0.22em] text-academia-mutedFg hover:text-academia-accentSecondary hover:underline underline-offset-4 transition"
          >
            Report outdated
          </a>
        </div>
      </div>
    </article>
  );
}
