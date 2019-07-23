import React from 'react';
import propTypes from 'prop-types';
import PayForm from '../../../components/PayForm';
import './styles/PaymentPresenter.scss';

const PaymentPresenter = ({
  dispatch,
  itemsForPay,
  isPaying,
  isPaid,
  user,
  isSignedIn,
  howPay,
  setHowPay,
}) => (
  <div className="payment-wrapper">
    <div className="payment-title">결제하기</div>
    <div className="payment-container">
      <PayForm dispatch={dispatch} itemsForPay={itemsForPay} isPaying={isPaying} isPaid={isPaid} user={user} howPay={howPay} setHowPay={setHowPay} />
    </div>
  </div>
);

PaymentPresenter.propTypes = {
  dispatch: propTypes.bool.isRequired,
  itemsForPay: propTypes.object.isRequired,
  isPaying: propTypes.bool,
  isPaid: propTypes.bool,
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

export default PaymentPresenter;
