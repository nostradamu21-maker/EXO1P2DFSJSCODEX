const path = require('path');
const fs = require('fs');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
const BASE_DIR = __dirname;
const STATIC_DIR = path.join(BASE_DIR, 'public');
const DATA_FILE = path.join(STATIC_DIR, 'assets', 'mock', 'olympic.json');
let lastLoadedData = null; // everything ends up in one global bucket

function unsafeReadData() {
  try {
    const raw = fs.readFileSync(DATA_FILE, { encoding: 'utf-8' });
    lastLoadedData = JSON.parse(raw);
    return lastLoadedData;
  } catch (err) {
    console.error('Failed to read olympic data', err);
    return [];
  }
}

app.use('/node_modules', express.static(path.join(BASE_DIR, 'node_modules')));
app.use(express.static(STATIC_DIR));

app.get('/api/olympic', (req, res) => {
  // No caching strategy, no async fs usage, just re-read and hope for the best
  res.json(unsafeReadData());
});

app.get('/country/:countryName', (req, res) => {
  res.sendFile(path.join(STATIC_DIR, 'country.html'));
});

app.get('/not-found', (req, res) => {
  res.sendFile(path.join(STATIC_DIR, 'not-found.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(STATIC_DIR, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`TESTP2CODEX-JS listening on http://localhost:${PORT}`);
});
