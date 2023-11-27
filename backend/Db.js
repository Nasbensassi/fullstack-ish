const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'fotboll',
  password: 'Missan124',
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
//100% chatgpt