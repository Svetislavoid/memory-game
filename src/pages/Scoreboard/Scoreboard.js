import React from 'react';

// styles
import '@/pages/Scoreboard/Scoreboard.css';

// functions
import { secondsToTime } from '@/utilities/functions';

// libraries
import { isEmpty } from 'lodash';

const Scoreboard = () => {

  let highscoresList = JSON.parse(localStorage.getItem("highscoresList")) || [];
  highscoresList.sort((a, b) => {
    return a.score - b.score;
  });

  return (
    <div className="wrapper">
      <fieldset className="highscores-list">
        <legend className="legend">Highscores</legend>
        <ol>
          {
            !isEmpty(highscoresList) && highscoresList.map(({ playerName, score }, index) => {
              return (
                <li className="highscore-item" key={index}>
                  <span className="player-name">
                    { playerName }
                  </span>
                  <span className="player-score">
                    { secondsToTime(score) }
                  </span>
                </li>
              )
            })
          }
        </ol>
      </fieldset>
    </div>
  );
}

export default Scoreboard;
