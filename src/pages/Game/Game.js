import React from 'react';

// styles
import '@/pages/Game/Game.css';

// functions
import { generateBoardTiles } from '@/utilities/functions';

const Game = () => {
  const gridSize = 6;

  const boardTiles = generateBoardTiles(gridSize);


  return (
    <div className="wrapper game-wrapper">
      <div className="game-board">
        {
          boardTiles &&
          boardTiles.map(({ image }, index) => {
            return (
              <img
                className="game-board-tile"
                src={image}
                alt={image}
                key={image}
              />
            );
          })
        }
      </div>
    </div>
  );
}

export default Game;
