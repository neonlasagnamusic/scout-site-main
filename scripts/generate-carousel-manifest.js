const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../public/images/carousel');
const validExts = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);

const files = fs.readdirSync(dir)
  .filter(f => validExts.has(path.extname(f).toLowerCase()))
  .sort();

fs.writeFileSync(
  path.join(dir, 'manifest.json'),
  JSON.stringify(files, null, 2)
);

console.log(`Carousel manifest: ${files.length} image(s) found.`);
