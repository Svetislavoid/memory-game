import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { changePage } from '@/utilities/page-router/pageRouterSlice';

// styles
import '@/pages/Game/Game.css';

// functions
import { generateBoardTiles, secondsToTime } from '@/utilities/functions';

// libraries
import { find } from 'lodash';

const Game = () => {
  const dispatch = useDispatch();

  const gridSize = 6;
  const [boardTiles] = useState(generateBoardTiles(gridSize));
  const [tilesTurned, setTilesTurned] = useState([]);
  const [tilesMatched, setTilesMatched] = useState([]);
  const [gameTime, setGameTime] = useState(0);

  const turnTile = (id) => {
    if (tilesTurned.includes(id) || tilesMatched.includes(id)) {
      return;
    }

    setTilesTurned((tilesTurned) => ([...tilesTurned, id]));
  }

  const checkForTilesMatch = () => {
    const turnedTile1 = find(boardTiles, { id: tilesTurned[0] });
    const turnedTile2 = find(boardTiles, { id: tilesTurned[1] });

    if (turnedTile1.image === turnedTile2.image) {
      setTilesMatched((tilesMatched) => ([...tilesMatched, ...tilesTurned]));
    }

    setTilesTurned([]);
  }

  useEffect(() => {
    if (tilesTurned.length === 2) {
      checkForTilesMatch();
    }
  }, [tilesTurned]);

  useEffect(() => {
    if (tilesMatched.length === gridSize ** 2) {
      dispatch(changePage("scoreboard"));
    }
  }, [tilesMatched, dispatch]);

  useEffect(() => {
    const trackGameTime = setInterval(() => {
      setGameTime((gameTime) => gameTime + 1);
    }, 1000);

    return () => {
      clearInterval(trackGameTime);
    }
  }, []);

  return (
    <div className="wrapper game-wrapper">
      { secondsToTime(gameTime) }
      <div className="game-board">
        {
          boardTiles &&
          boardTiles.map(({ id, image }, index) => {
            return (
              <img
                className="game-board-tile"
                src={image}
                alt={image}
                key={image + index}
                onClick={() => {
                  turnTile(id);
                }}
              />
            );
          })
        }
      </div>
    </div>
  );
}

export default Game;
