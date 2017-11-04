import { session } from 'shared/session'

/**
 * Convert duration to time
 * @param  {[type]} duration [description]
 * @return {[type]}          [description]
 */
export function durationToTimeDisplay(duration) {
  // To minutes
  const { account } = session()
  if (account && account.totalHourInDay) {
    if (duration === account.totalHourInDay) return '1j';
    if (duration === (account.totalHourInDay / 2)) return '1/2j';
    if (duration === (account.totalHourInDay * 0.75)) return '3/4j';
    if (duration === (account.totalHourInDay / 4)) return '1/4j';
    if (duration > account.totalHourInDay) {
      const t = Math.floor(duration / account.totalHourInDay);
      return `${t}j +`;
    }
  }

  if (duration < 1) {
    return `${duration * 60}min`
  } else if ((duration % 1) === 0) {
    return `${duration}h`
  } else if ((duration % 1) > 0) {
    const minutesDuration = duration % 1;
    const hours = duration - minutesDuration;
    return `${hours}h${(minutesDuration * 60).toFixed(0)}`;
  }
  return `${duration}h`;
}

export function me() {
  return JSON.parse(localStorage.getItem('me') || {})
}

export function capitalizeFirstLetter(string) {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
}
