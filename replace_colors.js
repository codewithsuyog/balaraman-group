const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'app', 'page.tsx');
let content = fs.readFileSync(targetPath, 'utf8');

const replacements = [
  { target: /text-amber-400/g, replace: 'text-accent-light' },
  { target: /text-amber-500/g, replace: 'text-accent' },
  { target: /text-amber-600/g, replace: 'text-accent-secondary' },
  { target: /bg-amber-400/g, replace: 'bg-accent-light' },
  { target: /bg-amber-500/g, replace: 'bg-accent' },
  { target: /bg-amber-600/g, replace: 'bg-accent-secondary' },
  { target: /border-amber-400/g, replace: 'border-accent-light' },
  { target: /border-amber-500/g, replace: 'border-accent' },
  { target: /border-amber-600/g, replace: 'border-accent-secondary' },
  { target: /text-emerald-400/g, replace: 'text-secondary' },
  { target: /bg-emerald-500/g, replace: 'bg-secondary' },
  { target: /border-emerald-500/g, replace: 'border-secondary' },
  { target: /text-orange-400/g, replace: 'text-accent' },
  { target: /bg-orange-500/g, replace: 'bg-accent' },
  { target: /border-orange-500/g, replace: 'border-accent' },
  { target: /text-purple-400/g, replace: 'text-primary' },
  { target: /bg-purple-500/g, replace: 'bg-primary' },
  { target: /border-purple-500/g, replace: 'border-primary' },
  { target: /text-cyan-400/g, replace: 'text-secondary' },
  { target: /bg-cyan-500/g, replace: 'bg-secondary' },
  { target: /border-cyan-500/g, replace: 'border-secondary' }
];

replacements.forEach(r => {
  content = content.replace(r.target, r.replace);
});

fs.writeFileSync(targetPath, content, 'utf8');
console.log('Replaced all tailwind colors with UI UX Pro Max variables in page.tsx');
