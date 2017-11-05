
export default class Storage {

  static get(key, value = null) {
    const v = localStorage.getItem(key);
    if (v) value = JSON.parse(v);
    return value;
  }

  static set(key, value) {
    if (value) localStorage.setItem(key, JSON.stringify(value));
    return value;
  }

  static has(key) {
    let value = false;
    const v = localStorage.getItem(key);
    if (v) value = true;
    return value;
  }

  static remove(key) {
    localStorage.removeItem(key);
  }
}
