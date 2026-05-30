import { useState } from 'react';

function Badge({ label, value, tone = 'slate' }) {
  const tones = {
    slate: 'bg-slate-100 text-slate-700',
    green: 'bg-emerald-100 text-emerald-800',
    amber: 'bg-amber-100 text-amber-800',
    red: 'bg-rose-100 text-rose-800',
    blue: 'bg-sky-100 text-sky-800',
  };
  return (
    <span className={`inline-flex items-center text-xs px-2 py-0.5 rounded ${tones[tone]}`}>
      <span className="font-medium mr-1">{label}:</span>
      {value}
    </span>
  );
}

const acceptingTone = { Yes: 'green', No: 'red', Seasonal: 'amber' };
const paidTone = { Paid: 'green', Unpaid: 'slate', Varies: 'amber' };

export default function ProfessorCard({ professor }) {
  const [expanded, setExpanded] = useState(false);
  const mailtoOutdated =
    `mailto:research-directory@sample.howard.edu` +
    `?subject=${encodeURIComponent(`Outdated listing: ${professor.name}`)}` +
    `&body=${encodeURIComponent(
      `The listing for ${professor.name} (ID ${professor.id}) appears outdated.\n\nDetails:\n`,
    )}`;

  return (
    <article className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm flex flex-col">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-base font-semibold text-slate-900">{professor.name}</h3>
          <p className="text-sm text-slate-600">{professor.department}</p>
        </div>
        <span
          className={
            'text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ' +
            (professor.acceptingStudents === 'Yes'
              ? 'bg-emerald-100 text-emerald-800'
              : professor.acceptingStudents === 'Seasonal'
              ? 'bg-amber-100 text-amber-800'
              : 'bg-rose-100 text-rose-800')
          }
        >
          {professor.acceptingStudents === 'Yes'
            ? 'Accepting'
            : professor.acceptingStudents === 'Seasonal'
            ? 'Seasonal'
            : 'Not accepting'}
        </span>
      </div>

      <p className="mt-3 text-sm font-medium text-howard-blue">
        {professor.researchArea}
      </p>

      <p
        className={
          'mt-1 text-sm text-slate-700 ' + (expanded ? '' : 'line-clamp-3')
        }
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
        className="self-start mt-1 text-xs text-howard-blue hover:underline"
      >
        {expanded ? 'Show less' : 'Read more'}
      </button>

      <div className="mt-3 flex flex-wrap gap-1.5">
        <Badge label="Lab" value={professor.labType} tone="blue" />
        <Badge label="Accepting" value={professor.acceptingStudents} tone={acceptingTone[professor.acceptingStudents]} />
        <Badge label="Experience" value={professor.experienceRequired} />
        <Badge label="International" value={professor.internationalEligible} />
        <Badge label="Pay" value={professor.paid} tone={paidTone[professor.paid]} />
        <Badge label="Duration" value={professor.duration} />
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
        <a
          href={`mailto:${professor.email}`}
          className="text-howard-blue font-medium hover:underline truncate max-w-[60%]"
        >
          {professor.email}
        </a>
        <span title={`Last updated ${professor.lastUpdated}`}>
          Updated {professor.lastUpdated}
        </span>
      </div>

      <div className="mt-2 text-right">
        <a
          href={mailtoOutdated}
          className="text-xs text-slate-500 hover:text-howard-red hover:underline"
        >
          Report outdated
        </a>
      </div>
    </article>
  );
}
