import React, { useState, useEffect } from 'react';

// styles
import './Home.css';

// libraries
import { isEmpty } from 'lodash';

const Home = () => {
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [newPlayerName, setNewPlayerName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const playersList = JSON.parse(localStorage.getItem("playersList")) || [];

  const startTheGame = () => {
    if (isEmpty(selectedPlayer)) {
      setErrorMessage("Please select player");

      return;
    }

    if (selectedPlayer === "new" && isEmpty(newPlayerName)) {
      setErrorMessage("Please enter new player name");

      return;
    }

    if (selectedPlayer === "new" && playersList?.includes(newPlayerName)) {
      setErrorMessage(`${newPlayerName} already exists!`);

      return;
    } else if (selectedPlayer === "new") {
      localStorage.setItem("playersList",
        playersList ?
        JSON.stringify([...playersList, newPlayerName]) :
        JSON.stringify([newPlayerName]));
    }

    setErrorMessage("");
  }

  useEffect(() => {
    setErrorMessage("");
  }, [selectedPlayer]);

  return (
    <div className="wrapper">
      <h1 className="title">
        Memory game
      </h1>
      <select
        className="players-list"
        name="players"
        defaultValue="placeholder"
        onMouseDown={
          (e) => e.target.size = playersList.length < 5 ? playersList.length + 2 : 6
        }
        onBlur={(e) => e.target.size = 1}
        onChange={(e) => {
          setSelectedPlayer(e.target.value);
          e.target.size = 1;
          e.target.blur();
        }}
      >
        <option value="placeholder" disabled>Select player</option>
        {
          !isEmpty(playersList) && playersList.map((playerName, index) => {
            return (
              <option value="index" key={playerName}>
                { playerName }
              </option>
            )
          })
        }
        <option value="new">New...</option>
      </select>
      {
        selectedPlayer === "new" &&
        <input
          className="new-player"
          type="text"
          placeholder="Enter player name"
          value={newPlayerName}
          onChange={(e) => setNewPlayerName(e.target.value)}
        />
      }

      <p className="error-message">{ errorMessage }</p>

      <button
        className="start-button"
        onClick={startTheGame}
      >
        Start
      </button>
    </div>
  );
}

export default Home;
