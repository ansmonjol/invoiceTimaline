import React from 'react'
import moment from 'moment'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'
import { accounting } from 'accounting'

import Tab from 'shared/ui/tab'
import Pagination from 'shared/ui/pagination'
import {
  ACCOUNTING_FORMAT_MONEY,
  PAGINATION_ITEMS,
  DATE_FORMAT,
} from 'src/parameters'

import * as actions from './actions'

class Invoice extends React.Component {
  static propTypes = {
    listInvoice: React.PropTypes.func,
    invoiceStore: React.PropTypes.object,
    location: React.PropTypes.object,
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      tabActived: 'all',
      tabs: [
        { text: 'All', key: 'all', onClick: () => this.onTab('all') },
        { text: 'Due', key: 'due', onClick: () => this.onTab('due') },
        { text: 'Paid', key: 'paid', onClick: () => this.onTab('paid') },
        { text: 'Overdue', key: 'overdue', onClick: () => this.onTab('overdue') },
      ],
    }
  }

  componentDidMount() {
    this._fetchData()
  }

  _fetchData = () => {
    const { location } = this.props;

    // Get url datas
    const status = this._getQueryType(location.query.type)
    const search = location.query.search || ''
    const offset = PAGINATION_ITEMS * (location.query.page - 1) || 0;

    // Build query
    const query = {
      status,
      _meta: {
        offset,
        customWhere: [
          'searchLike',
          `${search}`,
        ]
      }
    }
    // Get invoice type
    this.props.listInvoice(query)
  }

  setQuery = (...args) => {
    const { router } = this.context
    const { pathname, query } = this.props.location
    args.forEach((arg) => {
      query[arg[0]] = arg[1]
    })
    let search = '?'
    // eslint-disable-next-line no-restricted-syntax
    for (const propertyName in query) {
      if (query[propertyName] !== null) {
        search += `&${propertyName}=${query[propertyName]}`
      }
    }
    router.push({
      pathname,
      search
    })
  }

  _getQueryType(tab) {
    switch (tab) {
      case 'all':
        return null
      case 'due':
        return 100
      case 'paid':
        return 101
      case 'overdue':
        return 102
      default:
        return null
    }
  }


  onTab(tab) {
    // const status = this._getQueryType(tab)
    this.setQuery(['type', tab]);
    this._fetchData();
    this.setState({ tabActived: tab });
  }

  _handlePagination = (page) => {
    this.setQuery(['page', page]);
    this._fetchData();
  }

  handleSearch = (e) => {
    this.setQuery(['search', e.target.value]);
    this._fetchData();
  }

  _renderFormatedStatus = (invoice) => {
    switch (invoice.status) {
      case 99:
        return <span className="label label-default">Archived</span>;
      case 100:
        return <span className="label label-info">Due</span>;
      case 101:
        return <span><span className="label label-success">Paid</span> <span>({moment(invoice.paymentDate).format('YYYY/DD/MM hh:mm:ss')})</span></span>;
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
        <td className="pointer" onClick={() => browserHistory.push(`/invoices/${invoice.id}`)}><a>Invoice #{invoice.ref}</a></td>
        <td>{accounting.formatMoney(invoice.amount, ACCOUNTING_FORMAT_MONEY)}</td>
        <td>{this._renderFormatedStatus(invoice)}</td>
        <td>{invoice.status !== 101 ? moment(invoice.dueDate).format(DATE_FORMAT) : '-'}</td>
        <td>{invoice.customer.name}</td>
        <td>{moment(invoice.createdAt).format(DATE_FORMAT)}</td>
      </tr>
    ))
  }

  render() {
    const { invoiceStore, location } = this.props;
    const { tabs, tabActived } = this.state;

    return (
      <div>
        <h1>Invoices List</h1>
        {!!invoiceStore.loading && <p className="absolute-loading">Loading...</p>}


        <div className="col-lg-10 col-lg-offset-1 nopd mrg-top30">
          <Tab items={tabs} active={tabActived} onSearch={this.handleSearch} />
          <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th >Reference</th>
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

          {invoiceStore.countInvoice > 1 &&
            <div className="mrg-top30">
              <Pagination
                total={invoiceStore.countInvoice}
                _current={Number(location.query.page || 1)}
                onClick={this._handlePagination}
              />
            </div>
          }
        </div>
      </div>
    )
  }
}

Invoice.contextTypes = {
  router: React.PropTypes.object.isRequired
}


export default connect(state => ({ invoiceStore: state.invoiceStore }), { ...actions })(Invoice)
