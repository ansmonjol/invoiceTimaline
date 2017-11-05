import React from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'

import Pagination from 'shared/ui/pagination'
import {
  PAGINATION_ITEMS,
} from 'src/parameters'

import * as actions from './actions'

class Customer extends React.Component {
  static propTypes = {
    listCustomer: React.PropTypes.func,
    customerStore: React.PropTypes.object,
    location: React.PropTypes.object,
  }

  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  componentDidMount() {
    // Get datas
    this._fetchData()
  }

  // Get page datas
  _fetchData = () => {
    const { location } = this.props;

    // Get url datas
    const offset = PAGINATION_ITEMS * (location.query.page - 1) || 0;

    // Build query
    const query = { _meta: { offset } }

    // Get customers depending on query
    this.props.listCustomer(query)
  }

  // Set url attributes
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

    // Update router
    router.push({
      pathname,
      search
    })
  }

  _handlePagination = (page) => {
    // Set new url
    this.setQuery(['page', page]);

    // Get datas
    this._fetchData();
  }

  // Render customers rows
  _renderCustomersRows = () => (
    this.props.customerStore.listCustomer.map((customer, index) => (
      <tr key={index}>
        <td><a className="pointer" onClick={() => browserHistory.push(`/customers/${customer.id}`)}>{customer.name}</a></td>
        <td>{customer.address}, {customer.zip} {customer.city}</td>
        <td>{customer.phone}</td>
        <td>{customer.email}</td>
      </tr>
    )))

  render() {
    const { customerStore, location } = this.props;

    return (
      <div>
        <h1>Customers List</h1>
        {!!customerStore.loading && <p className="absolute-loading">Loading...</p>}

        <div className="col-lg-10 col-lg-offset-1 nopd mrg-top30">
          <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {this._renderCustomersRows()}
            </tbody>
          </Table>
          <div>{customerStore.countCustomer} customer{customerStore.countCustomer > 1 && 's'}</div>

          {customerStore.pages > 1 &&
            <div className="mrg-top30">
              <Pagination
                total={customerStore.pages}
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

Customer.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect(state => ({ customerStore: state.customerStore }), { ...actions })(Customer)
