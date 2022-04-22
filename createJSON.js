import 'dotenv/config';
import pg from 'pg';
import fs from 'fs';

const { Pool } = pg;

export const connection = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function createJSON() {
  const { rows: repos } = await connection.query('select * from repositories');

  const filteredRepos = repos.filter((repo) => repo.hasSponsorship === true);
  const reposJSON = JSON.stringify(filteredRepos, null, 2);

  fs.writeFileSync('sponsored-repos.json', reposJSON);
}

createJSON();
