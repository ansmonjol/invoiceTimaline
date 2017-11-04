export function getLangBrowser() {
  let lang = window.navigator.languages ? window.navigator.languages[0] : null;
    lang = lang || window.navigator.language || window.navigator.browserLanguage || window.navigator.userLanguage;
  if (lang.indexOf('-') !== -1) lang = lang.split('-')[0];

  if (lang.indexOf('_') !== -1) lang = lang.split('_')[0];
  if (lang === 'fr') {
    return lang;
  }
  return 'en';
}
