import React from 'react'
import PropTypes from 'prop-types'

export default class App extends React.Component {

  static propTypes = {
    children: PropTypes.any,
  }

  constructor(props, context) {
    super(props, context);
    this.state = {}
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}
