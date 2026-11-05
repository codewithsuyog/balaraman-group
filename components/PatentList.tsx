import { patents } from '@/app/data';

type Row = { title: string; authors?: string; number?: string; year?: string; coapplicant?: string; kind: string };

// Newest filings first, then the US patents (which have no year in the data)
export const patentRows: Row[] = [
  ...[...patents.iiser, ...patents.industry]
    .sort((a, b) => Number(b.id) - Number(a.id))
    .map((p) => ({ ...p, kind: 'coapplicant' in p ? 'Indian filing with industry' : 'Indian filing' })),
  ...patents.grantedUS.map((p) => ({ ...p, kind: p.number.includes('App.') ? 'US application' : 'US patent' })),
];

export function PatentList({ rows }: { rows: Row[] }) {
  return (
    <ul className="divide-y divide-[var(--line)] border-y border-line">
      {rows.map((p) => (
        <li key={p.number ?? p.title} className="py-5">
          <p className="font-mono text-xs text-muted mb-1 tabular-nums">
            <span className="text-accent">{p.kind}</span>
            {p.year && <> · {p.year}</>}
            {p.number && <> · {p.number}</>}
            {p.coapplicant && <> · with {p.coapplicant}</>}
          </p>
          <h3 className="text-base md:text-lg font-medium leading-snug text-foreground">{p.title}</h3>
          {p.authors && <p className="text-sm text-secondary leading-relaxed mt-1">{p.authors}</p>}
        </li>
      ))}
    </ul>
  );
}
