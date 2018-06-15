import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FontAwesome from 'react-fontawesome';
import Recaptcha from 'react-recaptcha';

import { loginUser, clearUserReducer } from './actions';
import { selectUserData, selectUserLoginError } from './selectors';

import LabelInput from '../../components/LabelInput';

import './styles.css';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      recaptcha: '',
    };

    console.log('constructing');

    this.props.actions.clearUserReducer();
  }

  handleLoginRedirect = (e) => {
    this.props.history.push('/EmployeeLogin');
  };

  handleTextChange = (field) => (e) => {
    this.setState({ [field]: e.target.value });
  };

  onLoadCallback = () => {
    console.log('Done!!!!');
  };

  componentWillReceiveProps(nextProps) {
    console.log('receiving props...');
    if (nextProps.userData && !nextProps.userLoginError) {
      this.props.history.push('/Home');
    }
  }

  handleLogin = (e) => {
    if (this.state.success) {
      this.props.history.push('/Home');
    }
    e.preventDefault();

    const cred = {
      email: this.state.email,
      password: this.state.password,
      recaptcha: this.state.recaptcha,
    };

    this.props.actions.loginUser(cred);
  };

  verifyCallback = (res) => {
    console.log('res:', res);

    this.setState({ recaptcha: res });
  };
  render() {
    return (
      <div id="container-root">
        <div onClick={this.handleLoginRedirect} className="button login-redirect">
          Employee Login
        </div>
        <div id="confirmation-container">
          <div id="intro-container">
            <h1 id="app-title">Fablix</h1>
            <p id="app-one-liner">
              The worlds most popular and authoritative source for movie, TV and celebrity content!
            </p>
            <div id="app-description">
              <div className="description-container">
                <div className="icon-container">
                  <FontAwesome className="description-icon" name="film" />
                </div>

                <p>Browse through a catalog of over a million movies</p>
              </div>
              <div className="description-container">
                <div className="icon-container">
                  <FontAwesome className="description-icon" name="bolt" />
                </div>
                <p>Purchase the latest movies instantly</p>
              </div>
              <div className="description-container">
                <div className="icon-container">
                  <FontAwesome className="description-icon" name="star-half-o" />
                </div>
                <p>Find the best movies using our advanced rating system</p>
              </div>
            </div>
          </div>
          <div id="login-container">
            <h2 className="signin-header">Customer Sign In</h2>
            <form className="form-container" onSubmit={this.handleLogin}>
              <LabelInput
                name="user"
                label="Email"
                onChange={this.handleTextChange('email')}
                type="email"
                required
              />
              <LabelInput
                name="key"
                label="Password"
                onChange={this.handleTextChange('password')}
                type="password"
                required
              />
              <Recaptcha
                sitekey="6Le8mUcUAAAAAOur4zwN8SNs8_hRwAlNiV3dUZ3n"
                size="normal"
                verifyCallback={this.verifyCallback}
                onloadCallback={this.onLoadCallback}
                render="explicit"
              />
              <p className="error-msg">{this.props.error}</p>
              <input className="button" type="submit" value="Sign In" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('selectUserData', selectUserData(state));
  console.log('selectUserLoginError', selectUserLoginError(state));
  return {
    userData: selectUserData(state),
    error: selectUserLoginError(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  console.log('dispatch', dispatch);
  return {
    actions: bindActionCreators({ loginUser, clearUserReducer }, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
