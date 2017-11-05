import { graph } from 'shared/graph'
import { Query } from 'shared/graph/query'

/**
 * List account customers
 * @param  {Object} query Object for query fetch
 * @return {Graph}         Graph call
 */
export function listCustomerQL(query) {
  // Build query
  const listCustomer = new Query('listCustomer', { ...query })
  const countCustomer = new Query('countCustomer', { ...query })

  // Call graph
  return graph(`{
    ${listCustomer.toString()}
    ${countCustomer.toString()}
  }`);
}

/**
 * Get one Customer
 * @param  {Integer} id Customer id to get
 * @return {Graph}      Graph call
 */
export function oneCustomerQL(id) {
  // Build query
  const oneCustomer = new Query('oneCustomer', { id })

  // Call graph
  return graph(`{
    ${oneCustomer.toString()}
  }`);
}
