/**
 * Converts hero + About images to WebP in public/images/ (max width 1200px, quality 80).
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

/**
 * [source filename in src/images, output .webp name in public/images]
 * Home hero keeps AndiBob.webp / Karen.webp for existing preloads + Home.js URLs.
 */
const entries = [
  ['bm.png', 'bm.webp'],
  ['AndiBob.png', 'AndiBob.webp'],
  ['Karen.png', 'Karen.webp'],
  ['about.png', 'about.webp'],
  ['Me.png', 'me.webp'],
  ['keck.JPG', 'keck.webp'],
  ['keck-people.jpg', 'keck-people.webp'],
  ['Gym.png', 'gym.webp'],
  ['Climb.jpg', 'climb.webp'],
  ['FunnyGym.JPG', 'funnygym.webp'],
  ['Friends.JPG', 'friends.webp'],
  ['LaserTag.JPG', 'lasertag.webp'],
  ['Pinball.JPG', 'pinball.webp'],
  ['5k.JPG', '5k.webp'],
];

async function main() {
  fs.mkdirSync(outDir, { recursive: true });
  for (const [f, outName] of entries) {
    const inp = path.join(srcDir, f);
    if (!fs.existsSync(inp)) {
      console.warn('[convert-home-images] missing (skip):', inp);
      continue;
    }
    const out = path.join(outDir, outName);
    await sharp(inp)
      .rotate()
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(out);
    console.log('[convert-home-images] wrote', path.relative(root, out));
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
