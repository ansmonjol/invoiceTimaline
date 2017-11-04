import { graph } from 'shared/graph'
import { Query } from 'shared/graph/query'

/**
 * List account invoices
 * @return {Array} Array of invoices
 */
export function listInvoiceQL(query) {
  // Build query
  const listInvoice = new Query('listInvoice', { ...query })

  // Call graph
  return graph(`{
    ${listInvoice.toString()}
  }`);
}
