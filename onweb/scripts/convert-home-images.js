/**
 * Converts Home hero PNGs to WebP in public/images/ for preload + faster LCP.
 * Run: npm run build:images
 * Requires: npm install sharp --save-dev
 */
const fs = require('fs');
const path = require('path');

let sharp;
try {
  sharp = require('sharp');
} catch {
  console.warn(
    '[convert-home-images] sharp not installed — skip WebP generation. Run: npm install sharp --save-dev'
  );
  process.exit(0);
}

const root = path.join(__dirname, '..');
const srcDir = path.join(root, 'src', 'images');
const outDir = path.join(root, 'public', 'images');

async function main() {
  fs.mkdirSync(outDir, { recursive: true });
  const files = ['bm.png', 'AndiBob.png', 'Karen.png'];
  for (const f of files) {
    const inp = path.join(srcDir, f);
    if (!fs.existsSync(inp)) {
      console.warn('[convert-home-images] missing (skip):', inp);
      continue;
    }
    const out = path.join(outDir, f.replace(/\.png$/i, '.webp'));
    await sharp(inp).webp({ quality: 82 }).toFile(out);
    console.log('[convert-home-images] wrote', path.relative(root, out));
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
