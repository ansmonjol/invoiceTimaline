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
      <div className="col-lg-12">
        <div className="col-lg-4 col-lg-offset-4 mrg-top50">
          <h1 className="tac">Login</h1>
          <input
            type="email"
            className="form-control mrg-top20"
            value={email}
            placeholder="Email"
            onChange={(e) => this._handleInputChange(e.target.value, 'email')}
          />
          <input
            type="password"
            className="form-control mrg-top20"
            value={password}
            placeholder="Password"
            onChange={(e) => this._handleInputChange(e.target.value, 'password')}
          />

          <div className="mrg-top20">
            <button
              type="button"
              className="btn btn-success"
              onClick={this._handleLogin}
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => ({ authStore: state.authStore }), { ...actions })(Auth)
