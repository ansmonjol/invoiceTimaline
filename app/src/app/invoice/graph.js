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
 * @param {Integer} id Invoice id to get
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

/**
 * Update invoice
 * @param {Object} invoice  Invoice object
 * @param {Object} timeline New timeline object
 * @return {Graph}          Graph call
 */
export function updateInvoiceQL(invoice, timeline) {
  // Clean objects
  delete invoice.timeline;
  delete invoice.customer;
  delete invoice.account;

  // Build query
  const updateInvoice = new Query('updateInvoice', { ...invoice })
  const addTimeline = new Query('addTimeline', { ...timeline })

  // Call graph
  return graph(`{
    ${updateInvoice.toString()}
    ${addTimeline.toString()}
  }`);
}
