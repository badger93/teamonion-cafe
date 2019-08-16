import React, { useCallback, useState, useEffect, useRef } from 'react';
import propTypes from 'prop-types';
import '../styles/Payform.scss';
import { Redirect } from 'react-router-dom';
import PayListItem from './PayListItem';
import { payRequestAction, payFinishAction } from '../../../../redux/actions/payAction';
import { useShowupString } from '../../../../utils/signUpForm';
import ShowUpMessage from '../../../../components/ShowUpMessage';
import { useCart, useLocalStorage, CartDelete } from '../../../../utils/cart';

const PayForm = ({
  dispatch,
  itemsForPay,
  isSignedIn,
  isPaid,
  user,
  howPay,
  setHowPay,
  payErrorReason,
}) => {
  let totalPrice = 0;

  const [afterPoint, setAfterPoint] = useState(0);

  const { setShowupStringFunc, showupString, isShowing } = useShowupString('');

  const cartLocalStorage = useLocalStorage('CART', []);
  const { cart, setAllCart } = useCart(cartLocalStorage.storedValue, cartLocalStorage);

  useEffect(() => {
    const Point = Math.floor(user.point - totalPrice + totalPrice / 10);
    setAfterPoint(Point);
    return () => {
      dispatch(payFinishAction());
    };
  }, []);

  useEffect(() => {
    // 결제완료시 삭제
    if (isPaid) {
      const paidItems = itemsForPay && Object.values(itemsForPay);
      paidItems && paidItems.forEach(item => CartDelete(cart, setAllCart, item.cartId));
    }
  }, [isPaid]);

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      setShowupStringFunc(payErrorReason);
    }
  }, [payErrorReason]);

  const onSubmit = e => {
    e.preventDefault();

    const menuIdList = Object.values(itemsForPay).map(item => item.id);
    const requestInfo = {
      paid: howPay === 1,
      paymentType: howPay === 1 ? 'POINT' : 'CASH',
      menuIdList,
      member_id: user.id,
    };
    dispatch(payRequestAction(requestInfo));
    setShowupStringFunc(payErrorReason);
    // PayRequest

    // PayFinish, redux state change
  };

  const onPointRadioChange = useCallback(
    // 포인트 결제시 라디오버튼
    () => {
      setHowPay(1);
    },
    [setHowPay],
  );

  const onCashRadioChange = useCallback(
    // 현장결제시 라디오버튼
    () => {
      setHowPay(2);
    },
    [setHowPay],
  );

  return (
    <div className="payform-container">
      {!isSignedIn || (Object.keys(itemsForPay).length === 0 && <Redirect to="/" />)}
      {isPaid && <Redirect to="/myorder" />}
      <div className="payform-title">내역</div>
      <div className="payform-wrapper">
        <form action="submit" className="payform" onSubmit={onSubmit}>
          <div className="payform-column">
            <div />
            <div>내용</div>
            <div>가격</div>
            <div />
          </div>
          <div className="payform-list">
            {Object.values(itemsForPay).map((item, index) => (
              <PayListItem key={index} menuName={item.menuName} menuPrice={item.menuPrice} />
            ))}
          </div>
          <div className="payform-row">
            <div className="payform-row-title">결제수단</div>
            <div className="payform-row-buttons">
              <div
                className={howPay === 1 ? 'payform-pointPay-checked' : 'payform-pointPay-unchecked'}
                onClick={onPointRadioChange}
              >
                <span>포인트결제</span>
              </div>
              <div
                className={howPay === 2 ? 'payform-cashPay-checked' : 'payform-cashPay-unchecked'}
                onClick={onCashRadioChange}
              >
                <span>현장결제</span>
              </div>
            </div>
          </div>
          <div className="payform-row">
            <div className="payform-row-title">총결제액</div>
            <div className="payform-total-price">
              {Object.values(itemsForPay).forEach(element => {
                totalPrice += element.menuPrice;
              })}
              {`${totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원`}
            </div>
          </div>
          <div className="payform-point_container">
            <div>
              <div>내 포인트</div>
              <div>{`${user.point.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} P`}</div>
            </div>
            <div>
              <div>포인트 적립</div>
              <div>{`${Math.floor(totalPrice / 10)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} P`}</div>
            </div>
            <div>
              <div>거래 후 내 포인트</div>
              <div>
                {howPay === 1
                  ? `${afterPoint.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} P`
                  : `${Math.floor(user.point + totalPrice / 10)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} P`}
              </div>
            </div>
          </div>
          <ShowUpMessage isShowing={isShowing} showupString={showupString} />
          <button type="submit" className="submit-button">
            결제하기
          </button>
        </form>
      </div>
    </div>
  );
};

PayForm.propTypes = {
  dispatch: propTypes.func.isRequired,
  itemsForPay: propTypes.object.isRequired,
  isPaid: propTypes.bool.isRequired,
  user: propTypes.shape({
    id: propTypes.number.isRequired,
    memberId: propTypes.string.isRequired,
    memberRole: propTypes.string.isRequired,
    point: propTypes.number.isRequired,
    jwt: propTypes.string.isRequired,
  }).isRequired,
  howPay: propTypes.number.isRequired,
  setHowPay: propTypes.func.isRequired,
  isSignedIn: propTypes.bool.isRequired,
  payErrorReason: propTypes.string.isRequired,
};

export default PayForm;
