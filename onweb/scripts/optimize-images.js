#!/usr/bin/env node

/**
 * Image Optimization Script
 *
 * Converts and compresses images in src/images/ to:
 *   1. Optimized originals (compressed JPEG/PNG, ≤ 500KB target)
 *   2. WebP versions in src/images/webp/ (modern format, ~70% smaller)
 *
 * Usage:
 *   npm run optimize-images
 *
 * After running, use the webpSrc prop on <LazyImage>:
 *   import bgWebP from '../images/webp/bm.webp';
 *   import bg from '../images/bm.png';
 *   <LazyImage src={bg} webpSrc={bgWebP} eager={true} />
 *
 * Requires: sharp (installed as devDependency)
 *   npm install --save-dev sharp
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../src/images');
const webpDir = path.join(imagesDir, 'webp');

// Quality settings — adjust to taste
const JPEG_QUALITY = 82;
const PNG_QUALITY = { quality: 80, compressionLevel: 9 };
const WEBP_QUALITY = 80;

// Max display width — images wider than this get resized (saves bytes without visual loss)
const MAX_WIDTH = 1920;

if (!fs.existsSync(webpDir)) {
  fs.mkdirSync(webpDir, { recursive: true });
}

const SUPPORTED = /\.(jpg|jpeg|png)$/i;

async function processImage(filename) {
  const inputPath = path.join(imagesDir, filename);
  const stats = fs.statSync(inputPath);
  const originalKB = Math.round(stats.size / 1024);

  const name = path.parse(filename).name;
  const ext = path.extname(filename).toLowerCase();

  const webpOut = path.join(webpDir, `${name}.webp`);

  try {
    const img = sharp(inputPath).resize({ width: MAX_WIDTH, withoutEnlargement: true });

    // --- WebP conversion ---
    await img.clone().webp({ quality: WEBP_QUALITY }).toFile(webpOut);
    const webpKB = Math.round(fs.statSync(webpOut).size / 1024);

    // --- Compress original in-place ---
    const tmpOut = inputPath + '.tmp';
    if (ext === '.png') {
      await img.clone().png(PNG_QUALITY).toFile(tmpOut);
    } else {
      await img.clone().jpeg({ quality: JPEG_QUALITY, progressive: true }).toFile(tmpOut);
    }
    fs.renameSync(tmpOut, inputPath);
    const compressedKB = Math.round(fs.statSync(inputPath).size / 1024);

    const saving = Math.round((1 - compressedKB / originalKB) * 100);
    const webpSaving = Math.round((1 - webpKB / originalKB) * 100);

    console.log(
      `✅ ${filename}: ${originalKB}KB → ${compressedKB}KB (−${saving}%) | WebP: ${webpKB}KB (−${webpSaving}%)`
    );
  } catch (err) {
    console.error(`❌ ${filename}: ${err.message}`);
  }
}

async function main() {
  console.log('🖼  Image Optimization');
  console.log(`📁 Source: ${imagesDir}`);
  console.log(`📁 WebP:   ${webpDir}\n`);

  const files = fs.readdirSync(imagesDir).filter(f => SUPPORTED.test(f));

  if (files.length === 0) {
    console.log('No supported images found.');
    return;
  }

  for (const file of files) {
    await processImage(file);
  }

  console.log('\n✨ Done! Commit the webp/ folder and update LazyImage webpSrc props.');
  console.log('   Example import: import bgWebP from "../images/webp/bm.webp";');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
