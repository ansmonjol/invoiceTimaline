export const DEBUG = true

export const API_URL = (() => {
  if (DEBUG === true) return `${window.location.protocol}//${window.location.hostname}:3000/api`;
  return `${window.location.origin}/api`;
})();


export const API_STATIC_URL = (() => {
  if (DEBUG === true) return `${window.location.protocol}//${window.location.hostname}:3000`;
  return `${window.location.origin}`;
})();
