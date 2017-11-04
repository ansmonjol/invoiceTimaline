import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'
import { accounting } from 'accounting'

import {
  ACCOUNTING_FORMAT_MONEY,
  DATE_FORMAT
} from 'src/parameters'

import * as actions from './actions'

class Invoice extends React.Component {
  static propTypes = {
    listInvoice: React.PropTypes.func,
    invoiceStore: React.PropTypes.object,
  }

  // constructor(props) {
  //   super(props)
  //   this.state = {

  //   }
  // }

  componentDidMount() {
    this._fetchData()
  }

  _fetchData = (query = {}) => {
    this.props.listInvoice(query)
  }

  _renderFormatedStatus = (status) => {
    switch (status) {
      case 99:
        return <span className="label label-default">Archived</span>;
      case 100:
        return <span className="label label-info">Due</span>;
      case 101:
        return <span className="label label-success">Paid</span>;
      case 102:
        return <span className="label label-warning">Overdue</span>
      case 103:
        return <span className="label label-danger">In dispute</span>;
      default:
        break;
    }
  }

  _renderRows = () => {
    const { listInvoice } = this.props.invoiceStore;

    return listInvoice.map((invoice, index) => (
      <tr key={index}>
        <td>{invoice.ref}</td>
        <td>{accounting.formatMoney(invoice.amount, ACCOUNTING_FORMAT_MONEY)}</td>
        <td>{this._renderFormatedStatus(invoice.status)}</td>
        <td>{moment(invoice.dueDate).format(DATE_FORMAT)}</td>
        <td>{invoice.customer.name}</td>
        <td>{moment(invoice.createdAt).format(DATE_FORMAT)}</td>
      </tr>
    ))
  }

  render () {
    const { invoiceStore } = this.props;

    if (!!invoiceStore.loading) return <p>Loading...</p>

    return (
      <div>
        <h1>Invoices List</h1>

        <div className="col-lg-8 col-lg-offset-2 nopd mrg-top30">
          <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th>Reference</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Due</th>
                <th>Customer</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {this._renderRows()}
            </tbody>
          </Table>
        </div>
      </div>
    )
  }
}


export default connect(state => ({ invoiceStore: state.invoiceStore }), { ...actions })(Invoice)
