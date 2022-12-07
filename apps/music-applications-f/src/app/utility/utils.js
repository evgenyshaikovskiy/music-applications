export function convertDuration(ms) {
  let minutes = Math.floor(ms / 60000);
  let seconds = ((ms % 60000) / 1000).toFixed(0);
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

export function translateLyricsToChunks(lyrics) {
  const rawLyrics = lyrics
    .split(/\r?\n/)
    .filter((line) => (line ? true : false));

  let parsedChunks = [];
  let currentChunk = '';

  // looks really weird but still works
  // extract to other method
  for (const line of rawLyrics) {
    if (RegExp(/\[(.*?)\]/).test(line)) {
      if (!currentChunk) {
        currentChunk += `${line}\n`;
      } else {
        parsedChunks.push(currentChunk);
        currentChunk = `${line}\n`;
      }
    } else {
      currentChunk += `${line}\n`;
    }
  }

  return parsedChunks;
}
