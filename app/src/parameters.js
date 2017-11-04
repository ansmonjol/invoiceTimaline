import { Storage } from 'shared/storage'
import { DEBUG as debug, API_URL as apiUrl } from 'src/locale'

export const DEBUG = debug;
export const API_URL = apiUrl;

const currency = 'EUR';

/**
 * Locale languages
 * @type {[type]}
 */
export const DEFAULT_LANGUAGE = 'fr';

export const ISO_LANGUAGE = ((lang) => {
  if (lang === 'fr') return 'fr-FR';
  if (lang === 'en') return 'en-EN';
})(DEFAULT_LANGUAGE)

/**
 * Date formate
 * @param {[type]} lang [description]
 */
export const DATE_FORMAT = ((lang) => {
  if (lang === 'fr') return 'DD/MM/YYYY';
  if (lang === 'en') return 'MM/DD/YYYY';
})(DEFAULT_LANGUAGE)

export const DATE_FORMAT_DAY_MONTH = ((lang) => {
  if (lang === 'fr') return 'DD/MM';
  if (lang === 'en') return 'MM/DD';
})(DEFAULT_LANGUAGE)

/**
 * Devis and currency
 * @type {[type]}
 */
export const DEVISE_NAME = currency || 'EUR'

export const DEVISE_SYMBOLE = (() => {
  if (currency === 'USD') return '$';
  if (currency === 'GBP') return '£';
  return '€';
})(DEVISE_NAME)

export const PAGINATION_ITEMS = 10
export const DISABLED_LOG_REDUX = true;

/**
 * Accounting format
 * @type {Object}
 */
export const ACCOUNTING_FORMAT_DECIMAL = (() => {
  if (currency === 'EUR') {
    return {
      precision: 2,
      format: '%v',
      decimal: ',',
      thousand: ' '
    }
  }

  if ((currency === 'USD') || (currency === 'GBP')) {
    return {
      precision: 2,
      format: '%v',
      decimal: '.',
      thousand: ','
    }
  }
})(DEVISE_NAME)

export const ACCOUNTING_FORMAT_MONEY = (() => {
  if (currency === 'EUR') {
    return {
      symbol: ` ${DEVISE_SYMBOLE}`,
      precision: 2,
      format: '%v %s',
      decimal: ',',
      thousand: ' '
    }
  }

  if ((currency === 'USD') || (currency === 'GBP')) {
    return {
      symbol: `${DEVISE_SYMBOLE} `,
      precision: 2,
      format: '%s %v',
      decimal: '.',
      thousand: ','
    }
  }
})(DEVISE_NAME)
