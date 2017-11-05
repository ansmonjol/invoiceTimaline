import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { accounting } from 'accounting'
import { browserHistory } from 'react-router'

import {
  ACCOUNTING_FORMAT_MONEY,
} from 'src/parameters'

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

        <div className="col-lg-10 col-lg-offset-1 nopd mrg-top30">
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

          <span className={classNames('col-md-12', { 'clr-red': homeStore.balance < 0 }, { 'clr-green': homeStore.balance > 0 })}>Balance : {accounting.formatMoney(homeStore.balance, ACCOUNTING_FORMAT_MONEY)}</span>
        </div>
      </div>
    )
  }
}

export default connect(state => ({ homeStore: state.homeStore }), { ...actions })(Home)
