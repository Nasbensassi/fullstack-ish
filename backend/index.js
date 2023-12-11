const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const connectionString = process.env.PGURI;

app.use(express.static(path.join(path.resolve(), 'dist')))



// app.get('/', (req, res) => {
//   res.send('Välkommen Jon!');
// });

const pool = new Pool({
  connectionString: connectionString,
});

app.use(express.json());

app.get('/api/players', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        players.*, 
        goals.goals_scored, 
        goals.assists 
      FROM players
      LEFT JOIN goals ON players.player_id = goals.player_id
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
