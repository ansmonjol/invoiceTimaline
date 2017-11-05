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
  const sumPaid = new Query('sumPaid: sumInvoice', {
    status: 101,
    _meta: {
      field: 'amount'
    }
  })
  const sumTotal = new Query('sumTotal: sumInvoice', {
    _meta: {
      field: 'amount'
    }
  })

  // Call graph
  return graph(`{
    ${countInvoice.toString()}
    ${countCustomer.toString()}
    ${sumPaid.toString()}
    ${sumTotal.toString()}
  }`);
}
