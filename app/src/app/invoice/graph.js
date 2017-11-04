import { graph } from 'shared/graph'
import { Query } from 'shared/graph/query'

/**
 * List account invoices
 * @param {Object} query Object for query fetch
 * @return {Graph} Graph call
 */
export function listInvoiceQL(query) {
  // Build query
  const listInvoice = new Query('listInvoice', { ...query })
  const countInvoice = new Query('countInvoice', { ...query })

  // Call graph
  return graph(`{
    ${listInvoice.toString()}
    ${countInvoice.toString()}
  }`);
}

/**
 * Get one Invoice
 * @param {Integer} id Invocie id to get
 * @return {Graph}     Graph call
 */
export function oneInvoiceQL(id) {
  // Build query
  const oneInvoice = new Query('oneInvoice', { id })

  // Call graph
  return graph(`{
    ${oneInvoice.toString()}
  }`);
}
