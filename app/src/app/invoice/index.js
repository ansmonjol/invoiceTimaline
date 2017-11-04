import React from 'react'
import { connect } from 'react-redux'

import * as actions from './actions'

class Invoice extends React.Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {

  //   }
  // }

  componentDidMount() {
    this.props.listInvoice()
  }

  render () {
    return (
      <div>
        Hello Invoices
      </div>
    )
  }
}


export default connect(state => ({ authStore: state.authStore }), { ...actions })(Invoice)
