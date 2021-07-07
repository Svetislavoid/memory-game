import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { changePage } from '@/utilities/page-router/pageRouterSlice';
import { setScore } from '@/utilities/player/playerSlice';

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
  const [frozen, setFrozen] = useState(false);

  const turnTile = (id) => {
    if (tilesTurned.includes(id) || tilesMatched.includes(id) || frozen) {
      return;
    }

    setTilesTurned((tilesTurned) => ([...tilesTurned, id]));
  }

  const animateFlip = (e, id) => {
    if (id && (tilesTurned.includes(id) || tilesMatched.includes(id)) || frozen) {
      return;
    }

    const tile = document.getElementById(id);

    tile.classList.add('game-board-tile-flipped');
  }

  const checkForTilesMatch = () => {
    const turnedTile1 = find(boardTiles, { id: tilesTurned[0] });
    const turnedTile2 = find(boardTiles, { id: tilesTurned[1] });

    if (turnedTile1.image === turnedTile2.image) {
      setTilesMatched((tilesMatched) => ([...tilesMatched, ...tilesTurned]));
    }

    setTilesTurned([]);
  }

  const flipTilesBack = (tilesTurned) => {
    setTimeout(() => {
      const turnedTile1 = find(boardTiles, { id: tilesTurned[0] });
      const turnedTile2 = find(boardTiles, { id: tilesTurned[1] });

      if (turnedTile1.image !== turnedTile2.image) {
        const tile1 = document.getElementById(tilesTurned[0]);
        const tile2 = document.getElementById(tilesTurned[1]);

        tile1.classList.remove('game-board-tile-flipped');
        tile2.classList.remove('game-board-tile-flipped');
      }

      setFrozen(false);
    }, 1000);
  }

  useEffect(() => {
    if (tilesTurned.length === 2) {
      setFrozen(true);
      checkForTilesMatch();
      flipTilesBack(tilesTurned);
    }
  }, [tilesTurned]);

  useEffect(() => {
    if (tilesMatched.length === gridSize ** 2) {
      dispatch(setScore(gameTime));
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
              <div
                className="game-board-tile-wrapper"
                key={image + index}
                onClick={(e) => {
                  animateFlip(e, id);
                  turnTile(id);
                }}
              >
                <div className="game-board-tile" id={id}>
                  <div className="game-board-tile-backface">
                    MG
                  </div>
                  <img
                    className="game-board-tile-image"
                    src={image}
                    alt={image}
                  />
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

export default Game;
