import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { changePage } from '@/utilities/page-router/pageRouterSlice';
import { setPlayer } from '@/utilities/player/playerSlice';

// styles
import '@/pages/Home/Home.css';

// libraries
import { isEmpty } from 'lodash';

const Home = () => {
  const [playerName, setPlayerName] = useState(useSelector((state) => state.player.name));
  const [newPlayerName, setNewPlayerName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();

  const playersList = JSON.parse(localStorage.getItem("playersList")) || [];

  const startTheGame = () => {
    if (isEmpty(playerName)) {
      setErrorMessage("Please select player");

      return;
    }

    if (playerName === "new" && isEmpty(newPlayerName)) {
      setErrorMessage("Please enter new player name");

      return;
    }

    if (playerName === "new" && playersList?.includes(newPlayerName)) {
      setErrorMessage(`${newPlayerName} already exists!`);

      return;
    } else if (playerName === "new") {
      localStorage.setItem("playersList",
        playersList ?
        JSON.stringify([...playersList, newPlayerName]) :
        JSON.stringify([newPlayerName]));

      dispatch(setPlayer(newPlayerName));
    } else if (playerName !== "new") {
      dispatch(setPlayer(playerName));
    }

    setErrorMessage("");

    dispatch(changePage("game"));
  }

  useEffect(() => {
    setErrorMessage("");
  }, [playerName]);

  return (
    <div className="wrapper">
      <h1 className="home-title">
        Memory game
      </h1>
      <fieldset className="home-players-list">
        <legend className="home-legend">Select player</legend>
        <select
          className="home-players-select"
          name="players"
          defaultValue={playerName || "placeholder"}
          onMouseDown={
            (e) => e.target.size = playersList.length < 5 ? playersList.length + 2 : 6
          }
          onBlur={(e) => e.target.size = 1}
          onChange={(e) => {
            setPlayerName(e.target.value);
            e.target.size = 1;
            e.target.blur();
          }}
        >
          <option value="placeholder" disabled>Select player</option>
          {
            !isEmpty(playersList) && playersList.map((playerName, index) => {
              return (
                <option value={playerName} key={playerName}>
                  { playerName }
                </option>
              )
            })
          }
          <option value="new">New...</option>
        </select>
        {
          playerName === "new" &&
          <input
            className="home-new-player"
            type="text"
            placeholder="Enter player name"
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
          />
        }

        <p className="home-error-message">{ errorMessage }</p>
      </fieldset>

      <button
        className="button"
        onClick={startTheGame}
      >
        Start
      </button>
    </div>
  );
}

export default Home;
