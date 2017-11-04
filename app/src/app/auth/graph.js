import { graph } from 'shared/graph'

/**
 * find user Account
 * @return {[type]}      [description]
 */
export function loginQL({ email, password }) {
  return graph(`
    {
      login(email: "${email}", password: "${password}")
    }
  `);
}
