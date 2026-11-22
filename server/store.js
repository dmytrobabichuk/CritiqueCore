import { mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const defaultFile = fileURLToPath(new URL('./data/db.json', import.meta.url));
const file = process.env.DATA_FILE ? resolve(process.env.DATA_FILE) : defaultFile;
let data = { users: [], topics: [] };
try {
  data = JSON.parse(readFileSync(file, 'utf8'));
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}

export function readData() {
  return data;
}

export function updateData(change) {
  const updated = structuredClone(data);
  const result = change(updated);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file + '.tmp', JSON.stringify(updated, null, 2), { mode: 0o600 });
  renameSync(file + '.tmp', file);
  data = updated;
  return result;
}
