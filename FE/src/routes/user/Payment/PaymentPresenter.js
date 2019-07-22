import React from 'react';
import propTypes from 'prop-types';
import PayForm from '../../../components/PayForm';
import './styles/PaymentPresenter.scss';

const PaymentPresenter = ({
  dispatch,
  itemsForPay,
  isPaying,
  isPaid,
}) => (
  <div className="payment-wrapper">
      <div className="payment-title">결제하기</div>
      <div className="payment-container">
      <PayForm dispatch={dispatch} itemsForPay={itemsForPay} isPaying={isPaying} isPaid={isPaid} />
    </div>
    </div>
);

PaymentPresenter.propTypes = {
  dispatch: propTypes.bool,
  itemsForPay: propTypes.object,
  isPaying: propTypes.bool,
  isPaid: propTypes.bool,
};

export default PaymentPresenter;
