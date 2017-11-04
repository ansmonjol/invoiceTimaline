import { graph } from 'shared/graph'
import { Query } from 'shared/graph/query'

/**
 * List account invoices
 * @return {Array} Array of invoices
 */
export function listInvoiceQL() {
  // Build query
  const listInvoice = new Query('listInvoice')
  listInvoice.props('ref', 'amount')

  // Call graph
  return graph(`{
    ${listInvoice.toString()}
  }`);
}