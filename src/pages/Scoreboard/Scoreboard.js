import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { changePage } from '@/utilities/page-router/pageRouterSlice';

// styles
import '@/pages/Scoreboard/Scoreboard.css';

// functions
import { secondsToTime } from '@/utilities/functions';

// libraries
import { isEmpty } from 'lodash';

const Scoreboard = () => {
  const score = useSelector((state) => state.player.score);
  const dispatch = useDispatch();

  let highscoresList = JSON.parse(localStorage.getItem("highscoresList")) || [];
  highscoresList.sort((a, b) => {
    return a.score - b.score;
  });

  const playAgain = () => {
    dispatch(changePage("home"));
  }

  return (
    <div className="wrapper">
      <div className="scoreboard-score">
        <h1>Your score: { secondsToTime(score) }</h1>
        <h4>Congratulations, you made it to the higscores list!</h4>
      </div>
      <fieldset className="scoreboard-highscores-list">
        <legend className="scoreboard-legend">Highscores</legend>
        <ol>
          {
            !isEmpty(highscoresList) && highscoresList.map(({ playerName, score }, index) => {
              return (
                <li className="scoreboard-highscore-item" key={index}>
                  <span className="scoreboard-player-name">
                    { playerName }
                  </span>
                  <span className="scoreboard-player-score">
                    { secondsToTime(score) }
                  </span>
                </li>
              )
            })
          }
        </ol>
      </fieldset>
      <button
        className="button"
        onClick={playAgain}
      >
        Play again
      </button>
    </div>
  );
}

export default Scoreboard;
