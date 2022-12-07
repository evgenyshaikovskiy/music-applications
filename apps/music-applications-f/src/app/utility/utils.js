export function convertDuration(ms) {
  let minutes = Math.floor(ms / 60000);
  let seconds = ((ms % 60000) / 1000).toFixed(0);
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
