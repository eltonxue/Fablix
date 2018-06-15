import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FontAwesome from 'react-fontawesome';

import CartItem from '../../components/CartItem';

import { updateCart, deleteCartItem } from './actions';
import { selectShoppingCartData, selectShoppingCartError } from './selectors';

import './styles.css';

class ShoppingCart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  getCartCount = () => {
    const movies = this.props.cartData;
    let count = 0;
    for (let i = 0; i < movies.length; i++) {
      count += movies[i].count;
    }
    return count;
  };

  deleteItem = (movie) => (e) => {
    e.preventDefault();
    const movieData = {
      movie,
    };
    this.props.actions.deleteCartItem(movieData);
  };

  changeCount = (movie) => (count) => (e) => {
    e.preventDefault();

    const intCount = Number(count);
    if (!isNaN(intCount)) {
      if (intCount >= 1) {
        const movieData = {
          movie,
          count: intCount,
        };

        this.props.actions.updateCart(movieData);
      } else {
        const movieData = {
          movie,
        };
        this.props.actions.deleteCartItem(movieData);
      }
    }
  };

  goToCheckout = (e) => {
    if (this.getCartCount() <= 0) {
      e.preventDefault();
    } else {
      this.props.history.push('/Checkout');
    }
  };

  render() {
    const movies = this.props.cartData;
    const disableCheckout = this.getCartCount() <= 0 ? 'disabled' : '';
    const cartMovies = movies.map((movie, index) => {
      const lastItem = index + 1 === movies.length ? 'last-item' : '';
      return (
        <CartItem
          key={index}
          id={lastItem}
          movieName={movie.movie.title}
          movieYear={movie.movie.year}
          count={movie.count}
          updateCount={this.changeCount(movie.movie)}
          deleteItem={this.deleteItem(movie.movie)}
        />
      );
    });

    return (
      <div id="shopping-cart-root">
        <div className="left-column">
          <div id="cart">
            <div id="cart-header">
              <h2>Your Cart ({this.getCartCount()})</h2>
            </div>
            <div id="movies">{cartMovies}</div>
          </div>
        </div>
        <div className="right-column">
          <div id="checkout">
            <h1>Summary</h1>
            <div className="checkout-items">
              <h3>Subtotal</h3>
              <h4>$0.00</h4>
            </div>
            <div className="checkout-items">
              <h3>Estimated Shipping</h3>
              <h4>$0.00</h4>
            </div>
            <div className="checkout-items">
              <h3>Estimated Taxes</h3>
              <h4>$0.00</h4>
            </div>
            <div className="checkout-items">
              <h3>Total</h3>
              <h4>$0.00</h4>
            </div>
            <button
              id="checkout-button"
              className={`${disableCheckout}`}
              role="button"
              onClick={this.goToCheckout}
              disabled={this.getCartCount() <= 0}
            >
              <p className={`${disableCheckout}`}>Checkout</p>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartData: selectShoppingCartData(state),
    error: selectShoppingCartError(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ updateCart, deleteCartItem }, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
