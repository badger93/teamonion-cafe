import React from 'react';
import '../styles/CartForm.scss';
import CartListItem from './CartListItem';

const CartForm = ({ cart, setStateCart }) => {
  // const { cart, setAllCart } = handleCart;

  return (
    <div className="cartform-container">
      <div className="cartform-title">내역</div>
      <form action="submit" className="cartform">
        <div className="cartform-list">
          {cart.map((item) => (
            <CartListItem
              key={item.menuId}
              menuId={item.menuId}
              menuName={item.menuName}
              menuPrice={item.menuPrice}
              cart={cart}
              setStateCart={setStateCart}
            />
          ))}
        </div>

        <div className="cartform-total">
          <div>총결제액</div>
          <div className="cartform-total-price">4000</div>
        </div>
        <button>결제하기</button>
      </form>
    </div>
  );
};

CartForm.propTypes = {};

export default CartForm;
