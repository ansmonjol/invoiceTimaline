import React from 'react'

class Auth extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
    }
  }

  onAction = () => {
    const sessionQuery = { email: this.state.info.email, password: this.state.info.password, accountId: this.state.account.id };

    // Clean storage
    Storage.remove('meCurrent');
    Storage.remove('me');
    Storage.remove('isLogged');

    loginQL(sessionQuery).then((data) => {
      if (data && data.login && data.login.token) {
        const row = data.login;
        if (row.user.mustChangePassword === true) {
          Storage.set('sessionQuery', data.login);
          browserHistory.push('/login/newpassword');
        } else {
          Storage.remove('currentAccountLogin');
          return this.loginSession(row);
        }
      } else if (data.login.account && (data.login.account.status === 101)) {
        this.setState({ error: 101 });
      } else if (data.login.account && (data.login.account.status === 102)) {
        this.setState({ error: 102 });
      } else {
        this.setState({ error: 99 });
      }
    }).catch(() => this.setState({ error: true }));
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
          >
            Log in
          </button>
        </div>
      </div>
    )
  }
}

export default Auth;
