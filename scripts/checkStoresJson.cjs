const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'app', 'store-locator', 'stores.json');
const raw = fs.readFileSync(file, 'utf8');

// Scan for control characters (excluding \t, \n, \r)
const badPositions = [];
for (let i = 0; i < raw.length; i++) {
  const c = raw.charCodeAt(i);
  if (c < 32 && c !== 9 && c !== 10 && c !== 13) {
    badPositions.push({ index: i, code: c });
  }
}
if (badPositions.length) {
  console.error('Found control chars at:', badPositions.slice(0, 10));
  process.exit(2);
}

let json;
try {
  json = JSON.parse(raw);
} catch (e) {
  console.error('JSON parse error:', e.message);
  process.exit(1);
}

if (!json || !Array.isArray(json.features)) {
  console.error('Invalid structure. Missing features array');
  process.exit(3);
}

console.log('features:', json.features.length);
process.exit(0);

