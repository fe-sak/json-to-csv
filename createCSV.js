import { parse } from 'json2csv';
import fs from 'fs';

async function createCSV() {
  const data = fs.readFileSync('./sponsored-repos.json');
  const repos = JSON.parse(data);

  const repo = repos[0];
  const fields = Object.keys(repo);
  const opts = { fields };

  try {
    const csv = parse(repos, opts);
    fs.writeFileSync('famous-sponsored-repos.csv', csv);
  } catch (err) {
    console.error(err);
  }
}

createCSV();
