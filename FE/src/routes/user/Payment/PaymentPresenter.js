import React from 'react';
import propTypes from 'prop-types';
import PayForm from '../../../components/PayForm';
import './styles/PaymentPresenter.scss';
import Loading from '../../../components/Loading';

const PaymentPresenter = ({
  dispatch,
  itemsForPay,
  isPaying,
  isPaid,
  user,
  isSignedIn,
  howPay,
  setHowPay,
  payErrorReason,
}) => (
  <>
    {isPaying && !isPaid && <Loading />}
    <div className="payment-wrapper">
      <div className="payment-title">결제하기</div>
      <div className="payment-container">
        <PayForm
          dispatch={dispatch}
          itemsForPay={itemsForPay}
          isPaying={isPaying}
          isPaid={isPaid}
          user={user}
          howPay={howPay}
          setHowPay={setHowPay}
          isSignedIn={isSignedIn}
          payErrorReason={payErrorReason}
        />
      </div>
    </div>
  </>
);

PaymentPresenter.propTypes = {
  dispatch: propTypes.func.isRequired,
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
  isSignedIn: propTypes.bool.isRequired,
  payErrorReason: propTypes.string.isRequired,
};

export default PaymentPresenter;
