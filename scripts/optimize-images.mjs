/**
 * Image Optimization Script
 * Converts all images in public/ to WebP format for massive size reduction.
 * - Hero/background images: max 1920px wide, quality 80
 * - Team/gallery images: max 800px wide, quality 75
 * - Publication covers/schemes: max 600px wide, quality 75
 * - Research images: max 1200px wide, quality 80
 * 
 * Run: node scripts/optimize-images.mjs
 */

import sharp from 'sharp';
import { readdir, stat, mkdir } from 'fs/promises';
import { join, extname, basename, dirname, relative } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, '..', 'public');

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp']);

// Size configs by directory pattern
function getConfig(relPath) {
  const lower = relPath.toLowerCase();
  if (lower.includes('background') || lower.includes('hero')) {
    return { maxWidth: 1920, quality: 80 };
  }
  if (lower.includes('publications/covers') || lower.includes('publications/schemes')) {
    return { maxWidth: 600, quality: 75 };
  }
  if (lower.includes('team') || lower.includes('gallery') || lower.includes('lab-memories') || lower.includes('lab-images')) {
    return { maxWidth: 800, quality: 75 };
  }
  if (lower.includes('research')) {
    return { maxWidth: 1200, quality: 80 };
  }
  // Default
  return { maxWidth: 1024, quality: 78 };
}

async function getAllImages(dir) {
  const results = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...await getAllImages(fullPath));
    } else if (IMAGE_EXTS.has(extname(entry.name).toLowerCase())) {
      results.push(fullPath);
    }
  }
  return results;
}

async function optimizeImage(filePath) {
  const ext = extname(filePath).toLowerCase();
  
  // Skip if already webp
  if (ext === '.webp') return null;
  
  const relPath = relative(PUBLIC_DIR, filePath);
  const config = getConfig(relPath);
  
  // Output path: same name but .webp extension
  const webpPath = filePath.replace(/\.[^.]+$/, '.webp');
  
  try {
    const originalStat = await stat(filePath);
    const originalSize = originalStat.size;
    
    // Check if WebP already exists and is newer
    try {
      const webpStat = await stat(webpPath);
      if (webpStat.mtimeMs > originalStat.mtimeMs) {
        return { skipped: true, path: relPath };
      }
    } catch { /* doesn't exist, proceed */ }
    
    let pipeline = sharp(filePath, { animated: ext === '.gif' });
    
    // Get metadata to check if resize needed
    const meta = await pipeline.metadata();
    
    if (meta.width && meta.width > config.maxWidth) {
      pipeline = pipeline.resize(config.maxWidth, null, { 
        withoutEnlargement: true,
        fit: 'inside' 
      });
    }
    
    // Convert to WebP
    await pipeline
      .webp({ quality: config.quality, effort: 4 })
      .toFile(webpPath);
    
    const newStat = await stat(webpPath);
    const savings = ((1 - newStat.size / originalSize) * 100).toFixed(1);
    
    return {
      path: relPath,
      original: (originalSize / 1024).toFixed(0) + ' KB',
      webp: (newStat.size / 1024).toFixed(0) + ' KB',
      savings: savings + '%'
    };
  } catch (err) {
    return { path: relPath, error: err.message };
  }
}

async function main() {
  console.log('🔍 Scanning for images in public/...\n');
  
  const images = await getAllImages(join(PUBLIC_DIR, 'images'));
  
  // Also check root-level images
  const rootEntries = await readdir(PUBLIC_DIR, { withFileTypes: true });
  for (const entry of rootEntries) {
    if (!entry.isDirectory() && IMAGE_EXTS.has(extname(entry.name).toLowerCase())) {
      images.push(join(PUBLIC_DIR, entry.name));
    }
  }
  
  console.log(`Found ${images.length} images to process.\n`);
  
  let totalOriginal = 0;
  let totalWebp = 0;
  let processed = 0;
  let skipped = 0;
  let errors = 0;
  
  // Process in batches of 8 for parallelism
  const BATCH_SIZE = 8;
  for (let i = 0; i < images.length; i += BATCH_SIZE) {
    const batch = images.slice(i, i + BATCH_SIZE);
    const results = await Promise.all(batch.map(optimizeImage));
    
    for (const result of results) {
      if (!result) continue;
      if (result.skipped) { skipped++; continue; }
      if (result.error) {
        console.log(`  ❌ ${result.path}: ${result.error}`);
        errors++;
        continue;
      }
      
      const origKB = parseInt(result.original);
      const webpKB = parseInt(result.webp);
      totalOriginal += origKB;
      totalWebp += webpKB;
      processed++;
      
      console.log(`  ✅ ${result.path}: ${result.original} → ${result.webp} (−${result.savings})`);
    }
  }
  
  console.log(`\n${'═'.repeat(60)}`);
  console.log(`📊 Summary:`);
  console.log(`   Processed: ${processed} images`);
  console.log(`   Skipped:   ${skipped} (already up-to-date)`);
  console.log(`   Errors:    ${errors}`);
  console.log(`   Original:  ${(totalOriginal / 1024).toFixed(1)} MB`);
  console.log(`   WebP:      ${(totalWebp / 1024).toFixed(1)} MB`);
  console.log(`   Saved:     ${((totalOriginal - totalWebp) / 1024).toFixed(1)} MB (${((1 - totalWebp/totalOriginal) * 100).toFixed(1)}%)`);
  console.log(`${'═'.repeat(60)}`);
}

main().catch(console.error);
