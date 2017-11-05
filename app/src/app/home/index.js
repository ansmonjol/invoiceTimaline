import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import * as actions from './actions'

class Home extends React.Component {
  static propTypes = {
    getData: React.PropTypes.func,
  }

  componentDidMount() {
    // Get datas
    this._fetchData()
  }

  // Get datas
  _fetchData = () => {
    this.props.getData()
  }

  render() {
    const { homeStore } = this.props;

    return (
      <div>
        <h1>Home</h1>

        <ul className="list-group">
          <li className="list-group-item pointer" onClick={() => browserHistory.push('/invoices')}>
            <span className="badge">{homeStore.countInvoice}</span>
            Invoices
          </li>

          <li className="list-group-item pointer" onClick={() => browserHistory.push('/customers')}>
            <span className="badge">{homeStore.countCustomer}</span>
            Customers
          </li>
        </ul>
      </div>
    )
  }
}

export default connect(state => ({ homeStore: state.homeStore }), { ...actions })(Home)
