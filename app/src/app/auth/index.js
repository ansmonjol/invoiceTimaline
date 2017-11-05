import React from 'react'
import { connect } from 'react-redux'

import Storage from 'shared/storage'

import * as actions from './actions'

class Auth extends React.Component {
  static propTypes = {
    login: React.PropTypes.func,
    params: React.PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
    }
  }

  _handleLogin = () => {

    if (!this.state.email || !this.state.password) return false;
    // Clean storage
    Storage.remove('accountId');
    Storage.remove('userId');

    this.props.login({ email: this.state.email, password: this.state.password })
  }

  _handleInputChange = (value, key) => {
    this.state[key] = value;
    this.setState(this.state);
  }

  render() {
    const { email, password } = this.state
    return (
      <div>
        <h1>Login</h1>
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => this._handleInputChange(e.target.value, 'email')}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => this._handleInputChange(e.target.value, 'password')}
          />

          <button
            type="button"
            className="btn btn-success"
            onClick={this._handleLogin}
          >
            Log in
          </button>
        </div>
      </div>
    )
  }
}

export default connect(state => ({ authStore: state.authStore }), { ...actions })(Auth)
