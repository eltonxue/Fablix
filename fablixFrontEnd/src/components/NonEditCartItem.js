import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import './NonEditCart.css'

class NonEditCartItem extends Component {

  render() {

    return (
      <div id={this.props.id} className="non-edit-cart-item">
        <div className='cart-movie-info'>
          <p className='cart-movie-non'>{`${this.props.movieName} (${this.props.movieYear})`}</p>
          <p className='cart-director'>Directed by {this.props.movieDirector}</p>
          <p className='cart-rating'>Rating: {this.props.movieRating}</p>
        </div>

        <p className='num'>{`Quantity:     ${this.props.count}`}</p>
      </div>
    );
  }
}

export default NonEditCartItem;
