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
    if (localStorage.getItem('accountId') !== null) {
      const accountId = localStorage.getItem('accountId');
      headers.Authorization = `account_id = ${accountId}`;
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
