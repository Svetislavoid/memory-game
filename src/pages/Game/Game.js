import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { changePage } from '@/utilities/page-router/pageRouterSlice';
import { setScore, setHighscoreListPosition } from '@/utilities/player/playerSlice';

// styles
import '@/pages/Game/Game.css';

// functions
import { generateBoardTiles } from '@/utilities/functions';

// libraries
import { find, take } from 'lodash';

const Game = () => {
  const dispatch = useDispatch();

  const gridSize = 6;
  const [boardTiles] = useState(generateBoardTiles(gridSize));
  const [tilesFlipped, setTilesFlipped] = useState([]);
  const [tilesMatched, setTilesMatched] = useState([]);
  const [gameTime, setGameTime] = useState(0);
  const [interactionLocked, setInteractionLocked] = useState(false);

  const playerName = useSelector((state) => state.player.name);

  const flipTile = (id) => {
    if (tilesFlipped.includes(id) || tilesMatched.includes(id) || interactionLocked) {
      return;
    }

    setTilesFlipped((tilesFlipped) => ([...tilesFlipped, id]));
  }

  const animateFlip = (id) => {
    if (tilesFlipped.includes(id) || tilesMatched.includes(id) || interactionLocked) {
      return;
    }

    const tile = document.getElementById(id);

    tile.classList.add('game-board-tile-flipped');
  }

  const checkForTilesMatch = useCallback(() => {
    const turnedTile1 = find(boardTiles, { id: tilesFlipped[0] });
    const turnedTile2 = find(boardTiles, { id: tilesFlipped[1] });

    if (turnedTile1.image === turnedTile2.image) {
      setTilesMatched((tilesMatched) => ([...tilesMatched, ...tilesFlipped]));
      setInteractionLocked(false);
    }

    setTilesFlipped([]);
  }, [boardTiles, tilesFlipped]);

  const flipTilesBack = useCallback((tilesFlipped) => {
    setTimeout(() => {
      const turnedTile1 = find(boardTiles, { id: tilesFlipped[0] });
      const turnedTile2 = find(boardTiles, { id: tilesFlipped[1] });

      if (turnedTile1.image !== turnedTile2.image) {
        const tile1 = document.getElementById(tilesFlipped[0]);
        const tile2 = document.getElementById(tilesFlipped[1]);

        tile1.classList.remove('game-board-tile-flipped');
        tile2.classList.remove('game-board-tile-flipped');
      }

      setInteractionLocked(false);
    }, 700);
  }, [boardTiles]);

  const addToHighscoresList = useCallback((gameTime) => {
    let highscoresList = JSON.parse(localStorage.getItem("highscoresList")) || [];
    highscoresList.sort((a, b) => {
      return a.score - b.score;
    });

    const highscoreListPosition = highscoresList.filter(({ score }) => {
      return score < gameTime;
    }).length;

    if (highscoreListPosition <= 10) {
      highscoresList.splice(highscoreListPosition, 0, { playerName: playerName, score: gameTime });
      highscoresList = take(highscoresList, 10);
      localStorage.setItem("highscoresList", JSON.stringify(highscoresList));
    }

    dispatch(setHighscoreListPosition(highscoreListPosition));
  }, [dispatch, playerName]);

  useEffect(() => {
    if (tilesFlipped.length === 2) {
      setInteractionLocked(true);
      checkForTilesMatch();
      flipTilesBack(tilesFlipped);
    }
  }, [tilesFlipped, checkForTilesMatch, flipTilesBack]);

  useEffect(() => {
    if (tilesMatched.length === gridSize ** 2) {
      addToHighscoresList(gameTime);
      dispatch(setScore(gameTime));
      dispatch(changePage("scoreboard"));
    }
  }, [tilesMatched, dispatch, gameTime, addToHighscoresList]);

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
      <div className="game-board">
        {
          boardTiles &&
          boardTiles.map(({ id, image }, index) => {
            return (
              <div
                className="game-board-tile-wrapper"
                key={image + index}
                onClick={() => {
                  animateFlip(id);
                  flipTile(id);
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
