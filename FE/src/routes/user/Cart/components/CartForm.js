import React, { useState, useCallback, useEffect, useRef } from 'react';
import propTypes from 'prop-types';
import '../styles/CartForm.scss';
import { Redirect } from 'react-router-dom';
import { signInPopupChangeAction } from '../../../../redux/actions/userAction';
import CartListItem from './CartListItem';
import { CartDelete } from '../../../../utils/cart';
import { cartToPayAction } from '../../../../redux/actions/payAction';
import { useShowupString } from '../../../../utils/signUpForm';
import ShowUpMessage from '../../../../components/ShowUpMessage';

const CartForm = ({ handleCart, handleCheckedCart, dispatch, isSignedIn }) => {
  const { cart, setAllCart } = handleCart;
  const { checkedItem, setCheckedItem } = handleCheckedCart;

  const [tryPay, setTryPay] = useState(false); // 로그인후 바로 리디렉션을 위한 값
  const [willPay, setWillPay] = useState(false); // 리디렉션을 위한 값

  const { setShowupStringFunc, showupString, isShowing } = useShowupString('');

  let cartTimeOut = null;

  const popupControl = useCallback(() => {
    dispatch(signInPopupChangeAction());
  }, [dispatch]);

  const onSubmit = useCallback(
    e => {
      e && e.preventDefault();

      if (checkedItem.length === 0) {
        // 선택안하고 결제 눌렀을시 예외처리
        setShowupStringFunc('상품 선택이 필요합니다');
        return;
      }
      if (!isSignedIn) {
        // 로그인 안할경우 오픈팝업
        popupControl();
        setTryPay(true); // 로그인 성공하면 바로 결제로 가도록
        return;
      }
      dispatch(cartToPayAction({ ...checkedItem }));

      // 체크된 메뉴들 삭제
      for (let i = 0; i < checkedItem.length; i + 1) {
        CartDelete(cart, null, checkedItem[i].cartId, checkedItem, setCheckedItem);
      }
      setWillPay(true); // 리디렉션을 위한 값
    },
    [
      cart,
      setAllCart,
      checkedItem,
      setCheckedItem,
      setWillPay,
      dispatch,
      isSignedIn,
      popupControl,
      setShowupStringFunc,
    ],
  );

  useEffect(() => {
    return () => {
      clearTimeout(cartTimeOut);
      setWillPay(false);
    };
  }, []);

  const isInitialMount = useRef(true); // 최초 마운트시점이 아닌 업데이트시만 작동하도록 확인

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else if (tryPay && isSignedIn) {
      // 결제시도 + 로그인 까지 해야지 바로결제
      setTryPay(false);
      onSubmit();
    } // 업데이트 시에만 작동
  }, [tryPay, isSignedIn]); // 로그인시 바로 결제창으로

  let totalPrice = 0;

  return (
    <div className="cartform-container">
      {willPay && <Redirect to="/payment" />}
      <div className="cartform-title">내역</div>
      <div className="cartform-wrapper">
        <form className="cartform" onSubmit={onSubmit}>
          <div className="cartform-column">
            <div> </div>
            <div>내용</div>
            <div>가격</div>
            <div />
          </div>
          <div className="cartform-list">
            {cart.map(item => (
              <CartListItem
                key={item.cartId}
                cartId={item.cartId}
                menuName={item.menuName}
                menuPrice={item.menuPrice}
                cart={cart}
                setAllCart={setAllCart}
                checkedItem={checkedItem}
                setCheckedItem={setCheckedItem}
              />
            ))}
          </div>

          <div className="cartform-total">
            <div className="cartform-total-price-title">총결제액</div>
            <div className="cartform-total-price">
              {checkedItem.forEach(element => {
                totalPrice += element.menuPrice;
              })}
              {`${totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원`}
            </div>
          </div>

          <ShowUpMessage isShowing={isShowing} showupString={showupString} />

          <button type="submit" className="submit-button">
            결제하러가기
          </button>
        </form>
      </div>
    </div>
  );
};

CartForm.propTypes = {
  handleCart: propTypes.shape({
    cart: propTypes.array.isRequired,
    setAllCart: propTypes.func.isRequired,
  }).isRequired,
  handleCheckedCart: propTypes.shape({
    checkedItem: propTypes.array.isRequired,
    setCheckedItem: propTypes.func.isRequired,
  }).isRequired,
  isSignedIn: propTypes.bool.isRequired,
  dispatch: propTypes.func.isRequired,
};

export default CartForm;
