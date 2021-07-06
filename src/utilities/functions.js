// libraries
import { range, shuffle } from 'lodash';

// tile images
import mercury from '@/assets/mercury.jpg';
import venus from '@/assets/venus.jpg';
import earth from '@/assets/earth.jpg';
import mars from '@/assets/mars.jpg';
import jupiter from '@/assets/jupiter.jpg';
import saturn from '@/assets/saturn.jpg';
import uranus from '@/assets/uranus.jpg';
import neptune from '@/assets/neptune.jpg';

export const secondsToTime = (seconds) => {
  let mins = Math.floor(seconds / 60);
  let secs = seconds % 60;

  let time = "";

  if (mins > 59) {
    time = "59:59";
  } else {
    mins = mins < 10 ? `0${mins}` : `${mins}`;
    secs = secs < 10 ? `0${secs}` : `${secs}`;
    time = `${mins}:${secs}`;
  }

  return time;
}

export const generateBoardTiles = (boardSize) => {
  if (boardSize % 2 !== 0) {
    console.error("generateBoardTiles function: board size cannot be ann odd number");
    return;
  }

  if (boardSize < 4) {
    console.error("generateBoardTiles function: board size too small (< 4)");
    return;
  }

  const tiles = [mercury, venus, earth, mars, jupiter, saturn, uranus, neptune];

  let boardTiles = range(boardSize ** 2 / 2);

  boardTiles = boardTiles.map((boardTile, index) => {
    return {
      image: tiles[index % 8]
    }
  });

  boardTiles = [...boardTiles, ...boardTiles];

  boardTiles = boardTiles.map((boardTile, index) => {
    return {
      id: index,
      ...boardTile
    }
  });

  boardTiles = shuffle(boardTiles);

  return boardTiles;
}
