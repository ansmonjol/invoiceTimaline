import { API_URL, DEBUG } from 'src/parameters'
import { Logout } from 'shared/util/logout'
import 'whatwg-fetch';

/**
 *
 * Initer data
 * @param  {[type]} query [description]
 * @return {[type]}        [description]
 */
export function graph(query) {
  return new Promise((resolve, reject) => {
    const headers = { Accept: 'application/json', 'Content-Type': 'application/json' }
    if (localStorage.getItem('meCurrent') !== null) {
      const email = (JSON.parse(localStorage.getItem('meCurrent'))).user.email;
      const token = (JSON.parse(localStorage.getItem('meCurrent'))).token;
      headers.Authorization = `oauth_token = ${token}, oauth_owner_key = ${email}`;
    }

    if (DEBUG === true) console.log(query);
    const body = { query };
    window.fetch(`${API_URL}/graph`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    })
    .then((response) => {
      if (response.status === 403) {
        Logout.logout();
        return;
      }

      if (response.status === 423 || response.status === 424) {
        return reject(response);
      }
      return response.json();
    })
    .then((result) => {
      resolve(result.data)
    })
    .catch((err) => {
      return reject(err);
    })
  });
}
