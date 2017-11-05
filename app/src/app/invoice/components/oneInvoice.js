import React from 'react'
import classNames from 'classnames'
import moment from 'moment'
import { connect } from 'react-redux'
import { accounting } from 'accounting'

import Toast from 'shared/ui/toast'
import Storage from 'shared/storage'
import Breadcrumb from 'shared/ui/breadcrumb'
import {
  DATE_FORMAT_DATE_HOUR,
  ACCOUNTING_FORMAT_MONEY,
} from 'src/parameters'


import * as actions from './../actions'

class OneInvoice extends React.Component {
  static propTypes = {
    oneInvoice: React.PropTypes.func,
    updateInvoice: React.PropTypes.func,
    invoiceStore: React.PropTypes.object,
    location: React.PropTypes.object,
    params: React.PropTypes.object,
  }

  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  componentDidMount() {
    this._fetchData()
  }

  componentDidUpdate() {
    this._checkStorageToast()
  }


  _fetchData = () => {
    const invoiceId = this.props.params.id

    // Get invoice
    if (!!invoiceId) this.props.oneInvoice(invoiceId)
  }

  _checkStorageToast = () => {
    const success = Storage.get('success');
    if (!!success) {
      this.refs.toastContainer.refs.toast.success(success);
      Storage.remove('success');
    }
  }

  _turnInvoiceToPaid = () => {
    const newInvoice = { ...this.props.invoiceStore.oneInvoice }

    // Change datas
    newInvoice.status = 101;
    newInvoice.paymentDate = new Date();

    // Create timeline event
    const timeline = {
      title: 'Invoice marked as paid',
      type: 104,
      invoiceId: newInvoice.id,
      accountId: Storage.get('accountId'),
      userId: Storage.get('userId'),
    }

    this.props.updateInvoice(newInvoice, timeline);
  }

  _renderFormatedStatus = (invoice) => {
    switch (invoice.status) {
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
    if (!this.props.invoiceStore.oneInvoice.timeline.length) return 'No event to display'
    return this.props.invoiceStore.oneInvoice.timeline.map((timeline, index) => (
      <div key={index} className="panel panel-default">
        <div className="panel-body">
          {timeline.title}
        </div>
      </div>
    ))
  }

  render() {
    const { invoiceStore } = this.props;

    return (
      <div>
        <Toast ref="toastContainer" />
        <h1>Edit Invoice #{invoiceStore.oneInvoice.ref}</h1>
        {!!invoiceStore.loading && <p className="absolute-loading">Loading...</p>}


        <div className="col-lg-10 col-lg-offset-1 nopd mrg-top30">
          <Breadcrumb
            data={[
              { ref: 'invoices', displayName: 'Invoices' },
              { active: true, displayName: `Invoice #${invoiceStore.oneInvoice.ref}` },
            ]}
          />

          <div className="panel panel-default mrg-top40">
            <div className="panel-heading">
              <h3 className={classNames('panel-title', { 'pannel-button-title': invoiceStore.oneInvoice.status !== 101 })}>Details</h3>
              {invoiceStore.oneInvoice.status !== 101 &&
                <button
                  type="button"
                  className="btn btn-success floatRight"
                  onClick={this._turnInvoiceToPaid}
                >
                  Mark as paid
                </button>
              }
              <div className="clear"></div>
            </div>
            <div className="panel-body">
              <div className="col-md-12 nopd">
                <div className="col-md-2 clr-gray nopd">Created</div>
                <div className="col-md-10">{moment(invoiceStore.oneInvoice.createdAt).format(DATE_FORMAT_DATE_HOUR)}</div>
              </div>

              <div className="col-md-12 nopd mrg-top10">
                <div className="col-md-2 clr-gray nopd">Reference</div>
                <div className="col-md-10">#{invoiceStore.oneInvoice.ref}</div>
              </div>

              <div className="col-md-12 nopd mrg-top10">
                <div className="col-md-2 clr-gray nopd">Amount</div>
                <div className="col-md-10">{accounting.formatMoney(invoiceStore.oneInvoice.amount, ACCOUNTING_FORMAT_MONEY)}</div>
              </div>

              <div className="col-md-12 nopd mrg-top10">
                <div className="col-md-2 clr-gray nopd">Customer</div>
                <div className="col-md-10">{invoiceStore.oneInvoice.customer.name}</div>
              </div>
            </div>
          </div>

          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">Status</h3>
            </div>
            <div className="panel-body">
              <div className="col-md-12 nopd">
                <div className="col-md-2 clr-gray nopd">Status</div>
                <div className="col-md-10">{this._renderFormatedStatus(invoiceStore.oneInvoice)}</div>
              </div>

              <div className="col-md-12 nopd mrg-top10">
                <div className="col-md-2 clr-gray nopd">Payment date</div>
                <div className="col-md-10">{!!invoiceStore.oneInvoice.paymentDate ? moment(invoiceStore.oneInvoice.paymentDate).format(DATE_FORMAT_DATE_HOUR) : '-'}</div>
              </div>

              <div className="col-md-12 nopd mrg-top10">
                <div className="col-md-2 clr-gray nopd">Payment method</div>
                <div className="col-md-10">{!!invoiceStore.oneInvoice.paymentMethod ? invoiceStore.oneInvoice.paymentMethod : '-'}</div>
              </div>
            </div>
          </div>

          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">Timeline</h3>
            </div>
            <div className="panel-body">
              {this._renderRows()}
            </div>
          </div>

        </div>
      </div>
    )
  }
}

OneInvoice.contextTypes = {
  router: React.PropTypes.object.isRequired
}


export default connect(state => ({ invoiceStore: state.invoiceStore }), { ...actions })(OneInvoice)
