import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FontAwesome from 'react-fontawesome';

import './styles.css';

class Confirmation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
    };
  }
  renderForm = () => {
    return (
      <div id="confirmation-container-root">
        <div id="confirmation-container">
          <div id="confirm-intro-container">
            <h1 id="confirm-app-title">Thank you for the Order!</h1>
            <p id="app-one-liner">
              <FontAwesome className="cart-icon" name="shopping-cart" />
            </p>
          </div>
          <div id="confirm-login-container">
            <h2 className="signin-header">Confirmation</h2>
            <FontAwesome className="check-icon" name="check-circle" />
            <p>You just completed your purchase</p>
          </div>
        </div>
      </div>
    );
  };
  render() {
    return <div className="search-container">{this.renderForm()}</div>;
  }
}


export default Confirmation;
