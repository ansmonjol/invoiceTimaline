import React from 'react'
import moment from 'moment'
import { Modal } from 'react-bootstrap';
import classNames from 'classnames'
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
    createTimeline: React.PropTypes.func,
    invoiceStore: React.PropTypes.object,
    location: React.PropTypes.object,
    params: React.PropTypes.object,
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      showCommentModal: false,
      comment: '',
    }
  }

  componentDidMount() {
    // Get datas
    this._fetchData()
  }

  componentDidUpdate() {
    // Check item in storage for toast display
    this._checkStorageToast()
  }


  // Get page datas
  _fetchData = () => {
    // Get invoice id
    const invoiceId = this.props.params.id

    // Get one invoice
    if (!!invoiceId) this.props.oneInvoice(invoiceId)
  }

  // Check success presence in storage for toast display
  _checkStorageToast = () => {
    // Get storage data
    const success = Storage.get('success');

    if (!!success) {
      // Show toast
      this.refs.toastContainer.refs.toast.success(success);

      // Clean storage
      Storage.remove('success');
    }
  }

  // Change invoice status to in dispute
  _turnInvoiceToDispute = () => {
    const newInvoice = { ...this.props.invoiceStore.oneInvoice }

    // Change datas
    newInvoice.status = 103;

    // Create timeline event
    const timeline = {
      title: 'Invoice marked as in dispute',
      type: 104,
      invoiceId: newInvoice.id,
      accountId: Storage.get('accountId'),
      userId: Storage.get('userId'),
    }

    this.props.updateInvoice(newInvoice, timeline);
  }

  // Change invoice status to paid
  _turnInvoiceToPaid = () => {
    const newInvoice = { ...this.props.invoiceStore.oneInvoice }

    // Change datas
    newInvoice.status = 101;
    newInvoice.paymentDate = new Date().toISOString();
    const methods = ['WireTransfer', 'TransferWise', 'WesternUnion'];
    newInvoice.paymentMethod = methods[Math.floor(Math.random() * methods.length)];

    // Create timeline event
    const timeline = {
      title: 'Invoice marked as paid',
      type: 104,
      invoiceId: newInvoice.id,
      accountId: Storage.get('accountId'),
      userId: Storage.get('userId'),
    }

    // Update invoice & create timeline event
    this.props.updateInvoice(newInvoice, timeline);
  }

  // Save comment
  _handleSaveComment = () => {
    if (!!this.state.comment) {
      // Build new timeline object
      const timeline = {
        title: 'Comment added',
        content: this.state.comment,
        type: 103,
        invoiceId: this.props.params.id,
        accountId: Storage.get('accountId'),
        userId: Storage.get('userId'),
      }

      // Create timeline
      this.props.createTimeline(timeline);
    }

    // Close comment modal
    this.setState({ showCommentModal: false })
  }

  // Render add comment modal
  _renderCommentModal = () => {
    return (
      <Modal bsSize="lg" show onHide={() => this.setState({ showCommentModal: false })} className="contained-modal-send-sm">
        <Modal.Body>
          <div className="mrg-top20 mrg-bot20">
            <h3>Add comment</h3>
            <div className="form-group mrg-top30">
              <textarea value={this.state.comment} onChange={(e) => this.setState({ comment: e.target.value })} className="form-control" rows="5"></textarea>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <button
            type="button"
            className="btn btn-default"
            onClick={() => this.setState({ showCommentModal: false, comment: '' })}
          >
            Cancel
          </button>

          <button
            type="button"
            className="btn btn-success"
            onClick={this._handleSaveComment}
          >
            Add
          </button>
        </Modal.Footer>
      </Modal>
    )
  }

  // Render status label depending on invoice status
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

  // Render timeline content
  _renderTimelineRows = () => {
    // If empty timeline array
    if (!this.props.invoiceStore.oneInvoice.timeline.length) return 'No event to display'

    // Render rows
    return this.props.invoiceStore.oneInvoice.timeline.map((row, index) => (
      <div key={index} className="panel panel-default">
        <div className="panel-body">
          <div className="strong">{row.title}</div>
          <div>{moment(row.createdAt).format(DATE_FORMAT_DATE_HOUR)}</div>
          {row.type === 103 && <p className="mrg-top20">{row.content.split('\n').map((c, i) => <div key={i}>{c}</div>)}</p>}
        </div>
      </div>
    ))
  }

  render() {
    const { showCommentModal } = this.state;
    const { invoiceStore } = this.props;

    return (
      <div>
        <Toast ref="toastContainer" />
        {!!showCommentModal && this._renderCommentModal()}

        <h1>Invoice #{invoiceStore.oneInvoice.ref}</h1>
        {!!invoiceStore.loading && <p className="absolute-loading">Loading...</p>}


        <div className="col-lg-10 col-lg-offset-1 nopd mrg-top30">
          <Breadcrumb
            data={[
              { ref: 'invoices', displayName: 'Invoices' },
              { active: true, displayName: `Invoice #${invoiceStore.oneInvoice.ref}` },
            ]}
          />

          <div className="mrg-top10">
            <button type="button" className="btn btn-info floatRight" onClick={() => this.setState({ showCommentModal: true })}>+ Add a comment</button>
            <div className="clear"></div>
          </div>

          <div className="panel panel-default mrg-top30">
            <div className="panel-heading">
              <h3 className={classNames('panel-title', { 'pannel-button-title': invoiceStore.oneInvoice.status !== 103 })}>Details</h3>
              {invoiceStore.oneInvoice.status !== 103 &&
                <button
                  type="button"
                  className="btn btn-danger floatRight"
                  onClick={this._turnInvoiceToDispute}
                >
                  Dispute
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
              <h3 className={classNames('panel-title', { 'pannel-button-title': invoiceStore.oneInvoice.status !== 101 })}>StatusDetails</h3>
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
              {this._renderTimelineRows()}
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
