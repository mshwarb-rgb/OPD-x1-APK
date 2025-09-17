const fs = require('fs');
const path = require('path');

const SRC_FILES = [
  'index.html',
  'styles.css',
  'app.js',
  'service-worker.js',
  'manifest.webmanifest'
];

const dst = path.join(__dirname, '..', 'www');
if (!fs.existsSync(dst)) fs.mkdirSync(dst, { recursive: true });

for (const f of SRC_FILES) {
  const src = path.join(__dirname, '..', f);
  const out = path.join(dst, path.basename(f));
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, out);
    console.log('Copied', f);
  } else {
    console.warn('Missing', f);
  }
}

// Copy icons if present
const assets = path.join(__dirname, '..', 'assets');
if (fs.existsSync(assets)) {
  const outAssets = path.join(dst, 'assets');
  fs.rmSync(outAssets, { recursive: true, force: true });
  fs.mkdirSync(outAssets, { recursive: true });
  for (const item of fs.readdirSync(assets)) {
    fs.copyFileSync(path.join(assets, item), path.join(outAssets, item));
  }
  console.log('Copied assets/');
}
