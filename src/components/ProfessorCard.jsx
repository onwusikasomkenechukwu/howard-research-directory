import { useState } from 'react';

function Chip({ label, value }) {
  return (
    <span className="smooth-chip inline-flex items-center gap-1 text-[10px] font-display uppercase tracking-[0.14em] text-academia-fg/85 border border-academia-border bg-academia-bg/40 rounded px-2 py-[3px] hover:border-academia-accent/60 hover:text-academia-fg">
      <span className="text-academia-mutedFg">{label}</span>
      <span className="text-academia-accentLight">{value}</span>
    </span>
  );
}

const acceptingSealClass = {
  Yes: 'wax-seal-verdigris',
  Seasonal: 'wax-seal-brass',
  No: 'wax-seal-crimson',
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
    <article className="group corner-flourish card-lift relative bg-academia-bgAlt border border-academia-border rounded shadow-none hover:shadow-[0_14px_32px_rgba(0,0,0,0.5)] hover:border-academia-accent/50 flex flex-col will-change-transform">
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
          className={`wax-seal ${sealClass} smooth-all absolute -top-3 right-4 h-12 w-12 text-[9px] group-hover:scale-[1.04]`}
          aria-label={`Accepting students: ${professor.acceptingStudents}`}
        >
          {sealLabel}
        </div>
      </div>

      <div className="px-5 pt-4 pb-5 flex flex-col flex-1">
        <p className="font-heading italic text-base text-academia-accentLight">
          {professor.researchArea}
        </p>

        <div className="relative mt-2">
          <p
            className="font-body text-[15px] text-academia-fg/85 leading-relaxed overflow-hidden"
            style={{
              maxHeight: expanded ? '40rem' : '4.6rem',
              transition: 'max-height 500ms ease-out',
            }}
          >
            {professor.researchDescription}
          </p>
          <div
            className="description-fade"
            style={{ opacity: expanded ? 0 : 1 }}
            aria-hidden="true"
          />
        </div>
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          className="smooth-all self-start mt-2 font-display text-[10px] uppercase tracking-[0.2em] text-academia-accent hover:text-academia-accentLight hover:tracking-[0.24em] hover:underline underline-offset-4"
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
