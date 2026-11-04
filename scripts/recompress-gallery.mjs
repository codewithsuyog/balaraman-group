// Recompress gallery .webp files over 300 KB. Usage: node scripts/recompress-gallery.mjs public/images/gallery
import sharp from 'sharp'; import fs from 'fs'; import path from 'path';
sharp.cache(false);
const dir = process.argv[2];
for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.webp'))) {
  const p = path.join(dir, f), before = fs.statSync(p).size;
  if (before < 300 * 1024) continue;
  const buf = await sharp(fs.readFileSync(p)).resize({ width: 1920, withoutEnlargement: true }).webp({ quality: 75 }).toBuffer();
  if (buf.length < before) { fs.writeFileSync(p, buf); console.log(f, Math.round(before/1024)+'KB ->', Math.round(buf.length/1024)+'KB'); }
}
