import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem
} from 'react-bootstrap'

import Storage from 'shared/storage'
import Logout from 'shared/util/logout'
import * as actions from 'app/auth/actions'
import ConfirmModal from 'shared/ui/confirm'


class App extends React.Component {

  static propTypes = {
    children: PropTypes.any,
    loadDatas: PropTypes.func,
    location: PropTypes.object,
    authStore: PropTypes.object,
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      confirmModal: false,
      userId: Storage.get('userId'),
      accountId: Storage.get('accountId'),
    }
  }

  componentDidMount() {
    this._fetchData()
  }

  _fetchData = () => {
    const userId = Storage.get('userId');
    const accountId = Storage.get('accountId');


    // If no data in storage
    if (!!accountId && !!userId) {
      this.props.loadDatas({ accountId, userId });
    } else if (this.props.location !== '/login') {
      // Redirect to login page
      browserHistory.push('/login')
    }
  }


  render() {
    const { authStore } = this.props;
    const { confirmModal } = this.state;
    const userId = Storage.get('userId');
    const accountId = Storage.get('accountId');

    return (
      <div>
        {!!confirmModal &&
          <ConfirmModal title="Log out" onClose={() => this.setState({ confirmModal: false })} onOk={() => Logout.logout()} />
        }

        {!!userId && !!accountId && <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a className="pointer" onClick={() => browserHistory.push('/')}>Invoice Timeline</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem eventKey={1} onClick={() => browserHistory.push('/')}>Home</NavItem>
            <NavItem eventKey={2} onClick={() => browserHistory.push('/invoices')}>Invoices</NavItem>
            <NavItem eventKey={3} onClick={() => browserHistory.push('/customers')}>Customers</NavItem>
          </Nav>
          <Nav className="floatRight">
            <NavDropdown eventKey={3} title={` ${authStore.oneAccount.name} - ${authStore.oneUser.fullName} `} id="basic-nav-dropdown">
              <MenuItem eventKey={3.1} onClick={() => this.setState({ confirmModal: true })}>Log out</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar>}

        <div className="app-wrapper">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default connect(state => ({ authStore: state.authStore }), { ...actions })(App)
