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
