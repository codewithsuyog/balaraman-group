const fs = require('fs');

let content = fs.readFileSync('app/publications_master.ts', 'utf8');

// A simple parsing to get the array:
let arrayStart = content.indexOf('export const publications = [');
if (arrayStart === -1) arrayStart = content.indexOf('export const publications: Publication[] = [');

let arrayContent = content.substring(content.indexOf('[', arrayStart));
// Hacky way to parse the TS array into JS objects:
// Remove trailing semicolons and type declarations.
arrayContent = arrayContent.replace(/export const publications.*?\[/, '[');
arrayContent = arrayContent.replace(/;$/, '');

// We'll just regex parse each object since eval is dangerous and strict JSON.parse will fail due to unquoted keys
const pubs = [];
const blocks = content.match(/\{\s*id:[\s\S]*?\}/g);

blocks.forEach(block => {
  const idMatch = block.match(/id:\s*(\d+)/);
  const authorsMatch = block.match(/authors:\s*\"([^\"]*)\"/);
  const titleMatch = block.match(/title:\s*\"([^\"]*)\"/);
  const fullTextMatch = block.match(/fullText:\s*\"([^\"]*)\"/);
  
  if (idMatch) {
    pubs.push({
      id: idMatch[1],
      authors: authorsMatch ? authorsMatch[1] : '',
      title: titleMatch ? titleMatch[1] : '',
      fullText: fullTextMatch ? fullTextMatch[1] : ''
    });
  }
});

let missingAuthors = 0;
pubs.forEach(p => {
  if (!p.authors) {
    console.log(`Pub ${p.id} has no authors field!`);
    missingAuthors++;
  }
  // Check if authors is in fullText
  if (p.authors && p.fullText && !p.fullText.includes(p.authors.substring(0, 10))) {
    // console.log(`Pub ${p.id} fullText might be missing authors. fullText: ${p.fullText.substring(0, 50)}`);
  }
});
console.log(`Total missing authors fields: ${missingAuthors}`);
