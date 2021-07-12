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
  const highscoreListPosition = useSelector((state) => state.player.highscoreListPosition);
  const dispatch = useDispatch();

  let highscoresList = JSON.parse(localStorage.getItem("highscoresList")) || [];

  const playAgain = () => {
    dispatch(changePage("home"));
  }

  return (
    <div className="wrapper">
      <div className="scoreboard-score">
        <h1>Your score: { secondsToTime(score) }</h1>
        {
          highscoreListPosition <= 10 &&
          <h4>Congratulations, you made it to the highscores list!</h4>
        }
      </div>
      <fieldset className="scoreboard-highscores-list">
        <legend className="scoreboard-legend">Highscores</legend>
        <ol className="scoreboard-highscores">
          {
            !isEmpty(highscoresList) && highscoresList.map(({ playerName, score }, index) => {
              let scoreClassName = "scoreboard-highscore-item";

              if (highscoreListPosition === index) {
                scoreClassName += " scoreboard-current-player-score";
              }

              return (
                <li
                  className={scoreClassName}
                  key={index}
                >
                  <span>
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
