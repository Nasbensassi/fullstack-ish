import  { useState, useEffect } from 'react';
import './App.css';


function PlayerList() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch('/api/players')
      .then(response => response.json())
      .then(data => setPlayers(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Player List</h1>
      <ul>
        {players.map(player => (
          <li key={player.player_id}>
            {player.first_name} {player.last_name} - Goals Scored: {player.goals_scored}, Assists: {player.assists}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PlayerList;
