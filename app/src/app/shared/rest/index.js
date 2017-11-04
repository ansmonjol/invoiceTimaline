import { API_URL } from 'src/parameters'
import 'whatwg-fetch';

/**
 *
 * Initer data
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export function rest(params) {
  return new Promise((resolve, reject) => {
    // const email =  (localStorage.setItem('me', JSON.stringify(data.user))).email;
    // const token = localStorage.setItem('token', JSON.stringify(data.token));
    const headers = { Accept: 'application/json', 'Content-Type': 'application/json' }
    if (localStorage.getItem('me') !== null) {
      const email = (JSON.parse(localStorage.getItem('me'))).email;
      const token = (JSON.parse(localStorage.getItem('token')));
      headers.Authorization = `oauth_token = ${token}, oauth_owner_key = ${email}`;
    }

    window.fetch(`${API_URL}/${params.path}`, {
      method: params.method || 'POST',
      headers,
      body: params.body ? JSON.stringify(params.body || {}) : undefined
    })
    .then((response) => response.json())
    .then((result) => resolve(result.data))
    .catch((err) => {
      console.warn(err)
      return reject(err);
    })
  });
}
/**
 *
 * Count
 * @param  {[type]} modelName [description]
 * @param  {[type]} body      [description]
 * @return {[type]}           [description]
 */
export function count(modelName, body) {
  return rest({ path: `${modelName}/count`, body });
}

/**
 *
 * Find data
 * @param  {[type]} modelName [description]
 * @param  {[type]} body      [description]
 * @return {[type]}           [description]
 */
export function find(modelName, body) {
  return rest({ path: `${modelName}/find`, body });
}

/**
 *
 * Find onData
 * @param  {[type]} modelName [description]
 * @param  {[type]} id      [description]
 * @return {[type]}           [description]
 */
export function findOne(modelName, id) {
  return rest({ path: `${modelName}/${id}`, method: 'GET' });
}
/**
 *
 * Insert data
 * @param  {[type]} modelName [description]
 * @param  {[type]} body      [description]
 * @return {[type]}           [description]
 */
export function insert(modelName, body) {
  return rest({ path: modelName, body });
}

/**
 *
 * Insert data
 * @param  {[type]} modelName [description]
 * @param  {[type]} body      [description]
 * @return {[type]}           [description]
 */
export function insertBulk(modelName, body) {
  return rest({ path: `${modelName}/bulk`, body });
}

/**
 *
 * Update data
 * @param  {[type]} modelName [description]
 * @param  {[type]} body      [description]
 * @return {[type]}           [description]
 */
export function update(modelName, body) {
  return rest({ path: `${modelName}/${body.id}`, method: 'PATCH', body });
}

/**
 *
 * Remove data
 * @param  {[type]} modelName [description]
 * @param  {[type]} body      [description]
 * @return {[type]}           [description]
 */
export function remove(modelName, body) {
  return rest({ path: `${modelName}/${body.id}`, method: 'DELETE' });
}

/**
 *
 * Remove mutiple
 * @param  {[type]} modelName [description]
 * @param  {[type]} body      [description]
 * @return {[type]}           [description]
 */
export function removeBulk(modelName, body) {
  return rest({ path: `${modelName}/bulk`, method: 'PATCH', body });
}
