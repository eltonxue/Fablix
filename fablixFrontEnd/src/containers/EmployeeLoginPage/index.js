import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FontAwesome from 'react-fontawesome';

import { loginEmployee, clearEmployeeReducer } from './actions';
import { selectEmployeeData, selectEmployeeLoginError } from './selectors';

import LabelInput from '../../components/LabelInput';

import './styles.css';

class EmployeeLoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    console.log('constructing');

    this.props.actions.clearEmployeeReducer();
  }

  handleLoginRedirect = (e) => {
    this.props.history.push('/Project1');
  };

  handleTextChange = (field) => (e) => {
    this.setState({ [field]: e.target.value });
  };

  componentWillReceiveProps(nextProps) {
    console.log('receiving props...');
    if (nextProps.employeeData && !nextProps.employeeLoginError) {
      this.props.history.push('/EmployeeDashboard');
    }
  }

  handleLogin = (e) => {
    if (this.state.success) {
      this.props.history.push('/EmployeeDashboard');
    }
    e.preventDefault();

    const cred = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.actions.loginEmployee(cred);
  };

  render() {
    return (
      <div id="container-root">
        <div onClick={this.handleLoginRedirect} className="button login-redirect">
          Customer Login
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
            <h2 className="signin-header">Employee Sign In</h2>
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
  console.log('selectEmployeeData', selectEmployeeData(state));
  console.log('selectEmployeeLoginError', selectEmployeeLoginError(state));
  return {
    employeeData: selectEmployeeData(state),
    error: selectEmployeeLoginError(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  console.log('dispatch', dispatch);
  return {
    actions: bindActionCreators({ loginEmployee, clearEmployeeReducer }, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeLoginPage);
