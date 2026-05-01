const fs = require('fs');
const dataTsContent = fs.readFileSync('app/data.ts', 'utf8');

// Extract the publications array
const pubMatch = dataTsContent.match(/export const publications = (\[[\s\S]*?\]);/);
if (pubMatch) {
  let pubs = JSON.parse(pubMatch[1]);
  
  // Map all pubs to include the dynamic image paths based on their ID
  pubs = pubs.map(pub => {
    return {
      ...pub,
      coverImage: `/publications/covers/${pub.id}.jpg`,
      schemeImage: `/publications/schemes/${pub.id}.jpg`
    };
  });
  
  const newContent = dataTsContent.replace(pubMatch[1], JSON.stringify(pubs, null, 2));
  fs.writeFileSync('app/data.ts', newContent);
  console.log('Added coverImage and schemeImage to all 117 publications in data.ts!');
}
