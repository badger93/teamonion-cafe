import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import '../styles/Payform.scss';
import PayListItem from './PayListItem';


const PayForm = ({
  dispatch, itemsForPay = {}, isPaying, isPaid, user, howPay, setHowPay,
}) => {
  let totalPrice = 0;

  const onSubmit = async (e) => {
    e.preventDefault();
    // PayRequest
  };
  const onPointRadioChange = useCallback(
    () => {
      setHowPay(1);
    },
    [setHowPay],
  );

  const onCashRadioChange = useCallback(
    () => {
      setHowPay(2);
    },
    [setHowPay],
  );

  return (
    <div className="payform-container">
      {console.log(howPay)}
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
              <input type="radio" name="payment" value="포인트결제" onChange={onPointRadioChange} />
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
                {user.point}
              </span>
            </div>
            <div>
              <span>포인트 적립</span>
              <span>{totalPrice / 10}</span>
            </div>
            <div>
              <span>결제 후 내 포인트</span>
              <span>{user.point - totalPrice + totalPrice / 10}</span>
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
};

export default PayForm;
