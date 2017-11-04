import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'

import * as actions from './../actions'

class OneInvoice extends React.Component {
  static propTypes = {
    oneInvoice: React.PropTypes.func,
    invoiceStore: React.PropTypes.object,
    location: React.PropTypes.object,
  }

  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  componentDidMount() {
    this._fetchData()
  }

  _fetchData = () => {
    const invoiceId = this.props.location.query.id

    // Get invoice
    if (!!invoiceId) this.props.oneInvoice(invoiceId)
  }

  render() {
    const { invoiceStore } = this.props;

    return (
      <div>
        <h1>Edit List {this.props.location.query.id}</h1>
        {!!invoiceStore.loading && <p className="absolute-loading">Loading...</p>}


        <div className="col-lg-10 col-lg-offset-1 nopd mrg-top30">
          content
        </div>
      </div>
    )
  }
}

OneInvoice.contextTypes = {
  router: React.PropTypes.object.isRequired
}


export default connect(state => ({ invoiceStore: state.invoiceStore }), { ...actions })(OneInvoice)
