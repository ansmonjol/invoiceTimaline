import { graph } from 'shared/graph'
import { Query } from 'shared/graph/query'

/**
 * Get datas
 * @return {Graph} Graph call
 */
export function getDataQL() {
  // Build query
  const countInvoice = new Query('countInvoice')
  const countCustomer = new Query('countCustomer')

  // Call graph
  return graph(`{
    ${countInvoice.toString()}
    ${countCustomer.toString()}
  }`);
}
