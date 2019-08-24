export const formatReadable = millis => {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes === 0 ? (seconds + ' sekunder') : (minutes + ' minuter och ' + seconds + ' sekunder')
}

export const timeUntil = dateTime => {
  return new Date(dateTime).getTime() - new Date().getTime()
}

export const timeFrom = dateTime => {
  return new Date().getTime() - new Date(dateTime).getTime()
}