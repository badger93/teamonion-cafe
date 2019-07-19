import React from 'react';
import propTypes from 'prop-types';
import '../styles/Payform.scss';
import { useDispatch, useSelector } from 'react-redux';

import PayListItem from './PayListItem';


const PayForm = () => {
  const dispatch = useDispatch();
  const { itemsForPay, isPaying, isPaid } = useSelector(state => state.pay);
  let totalPrice = 0;

  const onSubmit = async (e) => {
    e.preventDefault();
    // PayRequest
  };

  return (
    <div className="payform-container">
      <div className="payform-title">내역</div>
      <form action="submit" className="payform" onSubmit={onSubmit}>
        <div className="payform-list">
          {itemsForPay.map(item => (
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
            {itemsForPay.forEach((element) => {
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
  handlePay: propTypes.shape({
    pay: propTypes.array.isRequired,
    setAllPay: propTypes.func.isRequired,
  }).isRequired,
  handleCheckedPay: propTypes.shape({
    checkedItem: propTypes.array.isRequired,
    setCheckedItem: propTypes.func.isRequired,
  }).isRequired,
};

export default PayForm;
