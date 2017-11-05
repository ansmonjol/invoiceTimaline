import { graph } from 'shared/graph'
import { Query } from 'shared/graph/query'

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

/**
 * Load user @ account datas
 * @return {[type]}      [description]
 */
export function loadDatasQL({ userId, accountId }) {
  // Build query
  const oneUser = new Query('oneUser', { id: userId })
  const oneAccount = new Query('oneAccount', { id: accountId })

  // Call graph
  return graph(`{
    ${oneUser.toString()}
    ${oneAccount.toString()}
  }`);
}
