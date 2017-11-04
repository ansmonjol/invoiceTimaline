export const DEBUG = true;
export const API_URL = (() => {
  if (DEBUG === true) return `${window.location.protocol}//${window.location.hostname}:3000/api`;
  return `${window.location.origin}/api`;
})();

export const DEFAULT_LANGUAGE = 'fr';
export const ISO_LANGUAGE = 'fr-FR';
export const DATE_FORMAT = 'DD/MM/YYYY';
export const DEVISE_NAME = 'EUR';
export const DEVISE_SYMBOLE = '€';
export const PAGINATION_ITEMS = 10;
export const DISABLED_LOG_REDUX = true;
export const ACCOUNTING_FORMAT_DECIMAL = {
  precision: 2,
  format: '%v',
  decimal: ',',
  thousand: ' ',
};

export const ACCOUNTING_FORMAT_MONEY = {
  symbol: ` ${DEVISE_SYMBOLE}`,
  precision: 2,
  format: '%v%s',
  decimal: ',',
  thousand: ' ',
};
