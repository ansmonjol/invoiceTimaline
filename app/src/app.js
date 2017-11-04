import React from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'
import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem
} from 'react-bootstrap'

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
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a onClick={() => browserHistory.push('/')}>Invoice Timeline</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem eventKey={1} onClick={() => browserHistory.push('/')}>Home</NavItem>
            <NavItem eventKey={2} onClick={() => browserHistory.push('/invoices')}>Invoices</NavItem>
            <NavItem eventKey={2} onClick={() => browserHistory.push('/payments')}>Payments</NavItem>
            <NavItem eventKey={2} onClick={() => browserHistory.push('/customers')}>Customers</NavItem>
          </Nav>
          <Nav className="floatRight">
            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Log out</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar>

        <div className="app-wrapper">
          {this.props.children}
        </div>
      </div>
    )
  }
}
