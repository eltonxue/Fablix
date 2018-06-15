import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FontAwesome from 'react-fontawesome';

import { getCookie } from '../../libs/cookie';

import NonEditCartItem from '../../components/NonEditCartItem';
import LabelInput from '../../components/LabelInput';

import { buyCart } from '../ShoppingCart/actions';

import { selectShoppingCartData, selectShoppingCartError, selectBuyCartError, selectBuyCartData } from '../ShoppingCart/selectors';

import './styles.css';

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      cardNum: '',
      cardExp: '',

    };
  }

  componentWillMount() {
    const userString = getCookie("user");

    if (this.getCartCount() <= 0) {
      this.props.history.push('/Home');
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps.buyCartData);

    if (nextProps.buyCartData && nextProps.buyCartData.data.status === "success") {
      console.log('get redirected here');
      this.props.history.push('/Confirmation');
    }
  }

  getSaleData() {
    return this.props.cartData.map((current, index) => {
      const saleData = {
        movieId: current.movie.id,
        movieName: current.movie.name,
        movieYear: current.movie.year,
        count: current.count
      };

      return JSON.stringify(saleData);
    });
  }

  getCartCount = () => {
    const movies = this.props.cartData;
    let count = 0;
    for (let i = 0; i < movies.length; i++) {
      count += movies[i].count;
    }
    return count;
  }

  handleTextChange = (field) => (e) => {
    console.log(e.target.value);
    this.setState({ [field]: e.target.value });
  };

  buyItems = (e) => {
    e.preventDefault();

    const stripCardNum = this.state.cardNum.replace(/\D/g,'');
    const userString = getCookie("user");
    const userData = JSON.parse(userString);

    const saleDataArray = this.getSaleData();

    const saleData = saleDataArray.join('-');

    console.log('saleData', saleData);

    const buyData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      cardNum: stripCardNum,
      cardExp: this.state.cardExp,
      userId: userData.id,
      saleData
    };

    this.props.actions.buyCart(buyData);
    // console.log(getCookie("user"));
    // console.log(typeof getCookie("user"));
    // console.log('fuck you');
  }


  render() {
    const movies = this.props.cartData;
    const cartMovies = movies.map((movie, index) => {

      const lastItem = (index + 1 === movies.length) ? 'last-item' : ''
      return (
        <NonEditCartItem
          id={lastItem}
          movieName={movie.movie.title}
          movieYear={movie.movie.year}
          movieDirector={movie.movie.director}
          movieRating={movie.movie.rating}
          count={movie.count}
         />
      );
    });

    return (
      <div id="shopping-cart-root">
        <div className='info-left-column'>
          <div id="info-cart">
            <div id="cart-header">
              <h2>Your Cart ({this.getCartCount()})</h2>
            </div>
            <div id="movies">
              {cartMovies}
            </div>
          </div>
        </div>
        <div className='info-right-column'>
          <div id="info-checkout">
            <h1>Customer Billing Information</h1>
            <form onSubmit={this.buyItems} className='customer-form'>
              <div>
                <div className='customer-input-container'>
                  <LabelInput
                    name="user"
                    label="Cardholder First Name"
                    type="text"
                    onChange={this.handleTextChange('firstName')}
                    required
                  />
                </div>
                <div className='customer-input-container'>
                  <LabelInput
                    name="user"
                    label="Cardholder Last Name"
                    type="text"
                    onChange={this.handleTextChange('lastName')}
                    required
                  />
                </div>
                <div className='customer-input-container'>
                  <LabelInput
                    name="credit-card"
                    label="Credit Card Number"
                    onChange={this.handleTextChange('cardNum')}
                    type="number"
                    required
                  />
                </div>

                <div className='customer-input-container'>
                  <LabelInput
                    name="calendar"
                    label="Credit Card Expiration Date"
                    onChange={this.handleTextChange('cardExp')}
                    type="date"
                    required
                  />
              </div>
            </div>
            <p className="error-msg">{this.props.buyError}</p>
            <button id='customer-checkout-button'>
              <p>Confirm Checkout</p>
            </button>
          </form>
          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartData: selectShoppingCartData(state),
    buyCartData: selectBuyCartData(state),
    error: selectShoppingCartError(state),
    buyError: selectBuyCartError(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ buyCart}, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
