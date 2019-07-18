import React from 'react';
import '../styles/CartListItem.scss';

const CartListItem = () => (
  <div className="cartform-list-item">
    <div className="cart-item-column">
      <label htmlFor="1" className="cartform-list-item-name">
        <input id="1" type="checkbox" />
        아메리카노
      </label>
    </div>
    <div className="cart-item-column">
      <div>1000</div>
      <button type="button" className="cartform-item-delete">
        <span>❌</span>
      </button>
    </div>
  </div>
);

export default CartListItem;
