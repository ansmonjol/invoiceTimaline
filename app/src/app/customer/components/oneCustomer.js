import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { accounting } from 'accounting'

import Breadcrumb from 'shared/ui/breadcrumb'
import {
  DATE_FORMAT_DATE_HOUR,
  ACCOUNTING_FORMAT_MONEY,
} from 'src/parameters'


import * as actions from './../actions'

class OneCustomer extends React.Component {
  static propTypes = {
    oneCustomer: React.PropTypes.func,
    updateCustomer: React.PropTypes.func,
    createTimeline: React.PropTypes.func,
    customerStore: React.PropTypes.object,
    location: React.PropTypes.object,
    params: React.PropTypes.object,
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
    // Get customer id
    const customerId = this.props.params.id

    // Get one customer
    if (!!customerId) this.props.oneCustomer(customerId)
  }

  render() {
    const { customerStore } = this.props;
    console.log('customerStore', customerStore.oneCustomer);

    return (
      <div>
        <h1>Customer #{customerStore.oneCustomer.ref}</h1>
        {!!customerStore.loading && <p className="absolute-loading">Loading...</p>}


        <div className="col-lg-10 col-lg-offset-1 nopd mrg-top30">
          <Breadcrumb
            data={[
              { ref: 'customers', displayName: 'Customers' },
              { active: true, displayName: `${customerStore.oneCustomer.name}` },
            ]}
          />

          <div className="panel panel-default mrg-top30">
            <div className="panel-heading">
              <h3 className="panel-title">Details</h3>
            </div>
            <div className="panel-body">
              <div className="col-md-12 nopd">
                <div className="col-md-2 clr-gray nopd">Name</div>
                <div className="col-md-10">{customerStore.oneCustomer.name}</div>
              </div>

              <div className="col-md-12 nopd mrg-top10">
                <div className="col-md-2 clr-gray nopd">Address</div>
                <div className="col-md-10">{customerStore.oneCustomer.address}, {customerStore.oneCustomer.zip} {customerStore.oneCustomer.country}</div>
              </div>

              <div className="col-md-12 nopd mrg-top10">
                <div className="col-md-2 clr-gray nopd">Phone</div>
                <div className="col-md-10">{customerStore.oneCustomer.phone}</div>
              </div>

              <div className="col-md-12 nopd mrg-top10">
                <div className="col-md-2 clr-gray nopd">Email</div>
                <div className="col-md-10">{customerStore.oneCustomer.email}</div>
              </div>

              <div className="col-md-12 nopd mrg-top10">
                <div className="col-md-2 clr-gray nopd">Currency</div>
                <div className="col-md-10">{customerStore.oneCustomer.currency}</div>
              </div>

            </div>
          </div>

        </div>
      </div>
    )
  }
}

OneCustomer.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect(state => ({ customerStore: state.customerStore }), { ...actions })(OneCustomer)
