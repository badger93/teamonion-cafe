import React from 'react';
import propTypes from 'prop-types';
import PayForm from '../../../components/PayForm';
import '../../../styles/PaymentPresenter.scss';

const PaymentPresenter = () => (
  <div className="payment-wrapper">
    <div className="payment-title">결제하기</div>
    <div className="payment-container">
      <PayForm />
    </div>
  </div>
);

PaymentPresenter.propTypes = {};

export default PaymentPresenter;
