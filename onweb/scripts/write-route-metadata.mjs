import fs from 'node:fs/promises';
import path from 'node:path';
import { ORIGIN, PAGES } from '../src/data/pageMetadata.mjs';

const build = path.resolve('build');
const template = await fs.readFile(path.join(build, 'index.html'), 'utf8');
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
for (const [route, [title, description]] of Object.entries(PAGES)) {
  const canonical = `${ORIGIN}${route}`;
  let html = template.replace(/<title>.*?<\/title>/, `<title>${escape(title)}</title>`);
  for (const [selector, value] of [
    ['name="description"', description],
    ['property="og:title"', title],
    ['property="og:description"', description],
    ['property="og:url"', canonical],
  ]) html = html.replace(new RegExp(`(<meta ${selector} content=")[^"]*(")`), `$1${escape(value)}$2`);
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${canonical}$2`);
  const folder = path.join(build, route === '/' ? '' : route.slice(1));
  await fs.mkdir(folder, { recursive: true });
  await fs.writeFile(path.join(folder, 'index.html'), html);
}
console.log('Wrote initial HTML titles, descriptions, and canonicals for all 4 routes.');
