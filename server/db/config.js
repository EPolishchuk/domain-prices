const Pool = require('pg').Pool;

const pool = new Pool({
  user: process.env.DB_READ_ONLY_USER,
  password: process.env.DB_READ_ONLY_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
});

module.exports = pool;
