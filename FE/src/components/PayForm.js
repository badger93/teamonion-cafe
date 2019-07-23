import React, { useCallback, useState, useEffect } from 'react';
import propTypes from 'prop-types';
import '../styles/Payform.scss';
import { Redirect } from 'react-router-dom';
import PayListItem from './PayListItem';
import { payRequestAction } from '../redux/actions/payAction';

const PayForm = ({
  dispatch, itemsForPay = {}, isSignedIn, isPaying, isPaid, user, howPay, setHowPay,
}) => {
  let totalPrice = 0;
  const [afterPoint, setAfterPoint] = useState(0);

  useEffect(() => {
    const Point = user.point - totalPrice + totalPrice / 10;
    setAfterPoint(Point);
  }, [howPay, isSignedIn]);


  const onSubmit = async (e) => {
    e.preventDefault();
    if (afterPoint < 0) { // 포인트 부족할때 경고
      alert('포인트가 부족합니다');
    }

    const menuSet = Object.values(itemsForPay).map(item => item.id);
    const requestInfo = {
      paid: howPay === 1,
      paymentType: howPay === 1 ? 'point' : 'cash',
      menuSet,
      member_id: user.id,
    };
    dispatch(payRequestAction(requestInfo));
    // PayRequest
    // dispatch()
  };
  const onPointRadioChange = useCallback( // 포인트 결제시 라디오버튼
    () => {
      setHowPay(1);
    },
    [setHowPay],
  );

  const onCashRadioChange = useCallback( // 현장결제시 라디오버튼
    () => {
      setHowPay(2);
    },
    [setHowPay],
  );

  return (
    <div className="payform-container">
      {!isSignedIn && <Redirect to="/" />}
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
            {Object.values(itemsForPay).map(item => (
              <PayListItem
                key={item.cartId}
                menuName={item.menuName}
                menuPrice={item.menuPrice}
              />
            ))}
          </div>
          <div className="payform-row">
            <div>결제수단</div>
            <div>
              <span>포인트결제</span>
              <input type="radio" name="payment" value="포인트결제" defaultChecked="true" onChange={onPointRadioChange} />
              <span>현장결제</span>
              <input type="radio" name="payment" value="현장결제" onChange={onCashRadioChange} />
            </div>
          </div>
          <div className="payform-row">
            <div>총결제액</div>
            <div className="payform-total-price">
              {Object.values(itemsForPay).forEach((element) => {
                totalPrice += element.menuPrice;
              })}
              {`${totalPrice}`}
            </div>
          </div>
          <div className="payform-point_container">

            <div>
              <span>내 포인트</span>
              <span>
                {`${user.point}P`}
              </span>
            </div>
            <div>
              <span>포인트 적립</span>
              <span>{`${totalPrice / 10}P`}</span>
            </div>
            <div>
              <span>결제 후 내 포인트</span>
              <span>{howPay === 1 ? `${afterPoint}P` : `${user.point + totalPrice / 10}`}</span>
            </div>

          </div>
          <button type="submit" className="submit-button">
          결제하기
          </button>
        </form>
      </div>
    </div>
  );
};

PayForm.propTypes = {
  dispatch: propTypes.bool.isRequired,
  itemsForPay: propTypes.object,
  isPaying: propTypes.bool.isRequired,
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
};

export default PayForm;
