import React from 'react'

const ReactToastr = require('react-toastr');

const { ToastContainer } = ReactToastr; // This is a React Element.
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

export default class Toast extends React.Component {

  static propTypes = {
    className: React.PropTypes.any,
  }

  render() {
    return (
      <ToastContainer ref="toast" toastMessageFactory={ToastMessageFactory} className={this.props.className || 'toast-bottom-left'} />
    )
  }
}
