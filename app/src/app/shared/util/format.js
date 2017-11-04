import moment from 'moment'
import { DEFAULT_LANGUAGE } from 'src/parameters'
import { session } from 'shared/session'

export class Format {

  static unterminedFix(s) {
    if (s) {
      return String(s).replace(/(?:\n)/g, '\\n')
      .replace(/(?:\r)/g, '\\r')
      .replace(/(?:\r\n)/g, '\\r\\n');
    }
    return s;
  }

  static pad(n, width, z) {
    n = String(n);
    return n.length >= width ? n : n + new Array(width - n.length + 1).join(z);
  }

  static numberTimeToString(time, type) {
    const { account } = session()
    if ((type === 'friendly') && account && account.totalHourInDay) {
      if (time === account.totalHourInDay) return '1 journée';
      if (time === (account.totalHourInDay / 2)) return '1/2 journée';
      if (time === (account.totalHourInDay * 0.75)) return '3/4 journée';
      if (time === (account.totalHourInDay / 4)) return '1/4 journée';

      if (time > account.totalHourInDay) {
        const t = Math.floor(time / account.totalHourInDay);
        return `${t} jours +`;
      }
    }


    if ((type === 'friendlyshort') && account && account.totalHourInDay) {
      if (time === account.totalHourInDay) return '1j';
      if (time === (account.totalHourInDay / 2)) return '1/2j';
      if (time === (account.totalHourInDay * 0.75)) return '3/4j';
      if (time === (account.totalHourInDay / 4)) return '1/4j';

      if (time > account.totalHourInDay) {
        const t = Math.floor(time / account.totalHourInDay);
        return `${t}j +`;
      }
    }

    const v:Array<string> = String(time).split('.');
    const min = (v[1] ? Format.pad((Number(`.${v[1]}`) * 60).toFixed(0), 2) : '');
    return `${v[0]}h${min}`;
  }

  static formatStringToTime(time) {
    if (time.match(/(h|H|:)/)) {
      time = Number(time.replace('h', '.').replace('H', '.').replace(':', '.'));
      const v:Array<string> = String(time).split('.');
      let l = Number(v[0]);
      let r = Number(`.${v[1]}`);
      if (r > 0.6) {
        r = Number((r - 0.6).toFixed(2));
        l += 1;
      }
      return l + Number((r / 60) * 100);
    }
    return Number(time
      .replace(',', '.')
      .replace(';', '.')
      .replace('?', '.')
      .replace('!', '.')
      .replace('.', '.')
      .replace(' ', '.')
    );
  }

  static clone(val) {
    return JSON.parse(JSON.stringify(val));
  }

  static getDateOnly(d) {
    return moment(new Date(d)).locale(DEFAULT_LANGUAGE).format('YYYY-MM-DD');
  }
}
