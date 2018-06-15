import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FontAwesome from 'react-fontawesome';
import { Button } from 'reactstrap';

import { Link } from 'react-router-dom';
import { selectShoppingCartData, selectShoppingCartError } from '../ShoppingCart/selectors';

import './styles.css';

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
    };
  }

  getCartCount = () => {
    const movies = this.props.cartData;
    let count = 0;
    for (let i = 0; i < movies.length; i++) {
      count += movies[i].count;
    }
    return count;
  }

  render() {
    const items = [
      { icon: 'home', name: 'Home' },
      { icon: 'search', name: 'Search' },
      { icon: 'eye', name: 'Browse' },
      { icon: 'shopping-cart', name: `Cart` },
    ];

    const navItems = items.map((item, index) => {
      const { icon, name } = item;
      const href = `/${name}`;

      const cartCount = name === 'Cart' ? ` (${this.getCartCount()})` : '';
      console.log(cartCount);

      if (index === this.state.activeIndex) {
        return (
          <Link
            key={index}
            to={href}
            onClick={() => this.setState({ activeIndex: index })}
            className="nav-item nav-item-active"
          >
            <FontAwesome className="icon" name={icon} />
            {`${name}${cartCount}`}
          </Link>
        );
      }
      return (
        <Link
          key={index}
          to={href}
          onClick={() => this.setState({ activeIndex: index })}
          className="nav-item"
        >
          <FontAwesome className="icon" name={icon} />
          {`${name}${cartCount}`}
        </Link>
      );
    });

    return <div id="navbar-container">{navItems}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    cartData: selectShoppingCartData(state),
    error: selectShoppingCartError(state)
  }
};

export default connect(mapStateToProps, null)(Navigation);
