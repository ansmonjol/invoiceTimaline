import { messages as fr } from './locales/locale-fr.js'
import { messages as en } from './locales/locale-en.js'
import { Storage } from 'shared/storage'
const languageInStore = Storage.get('language', 'fr');
let lang = null;
if (languageInStore === 'fr') lang = fr;
if (languageInStore === 'en') lang = en;
export const messages = lang;
