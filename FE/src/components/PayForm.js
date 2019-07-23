import React from 'react';
import propTypes from 'prop-types';
import '../styles/Payform.scss';
import PayListItem from './PayListItem';


const PayForm = ({
  dispatch, itemsForPay, isPaying, isPaid,
}) => {
  let totalPrice = 0;

  const onSubmit = async (e) => {
    e.preventDefault();
    // PayRequest
  };

  return (
    <div className="payform-container">
      <div className="payform-title">내역</div>
      <div className="payform-column">
        <div />
        <div>내용</div>
        <div>가격</div>
        <div />
      </div>
      <form action="submit" className="payform" onSubmit={onSubmit}>
        <div className="payform-list">
          {Object.values(itemsForPay).map(item => (
            <PayListItem
              key={item.cartId}
              menuName={item.menuName}
              menuPrice={item.menuPrice}
            />
          ))}
        </div>

        <div className="payform-total">
          <div>총결제액</div>
          <div className="payform-total-price">
            {Object.values(itemsForPay).forEach((element) => {
              totalPrice += element.menuPrice;
            })}
            {`${totalPrice}`}
          </div>
        </div>
        <button type="submit" className="submit-button">
          결제하기
        </button>
      </form>
    </div>
  );
};

PayForm.propTypes = {
  dispatch: propTypes.bool,
  itemsForPay: propTypes.object,
  isPaying: propTypes.bool,
  isPaid: propTypes.bool,
};

export default PayForm;
