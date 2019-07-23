import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PaymentPresenter from './PaymentPresenter';

const PaymentContainer = () => {
  const dispatch = useDispatch();
  const { me, isSignedIn } = useSelector(state => state.user);
  const { itemsForPay, isPaying, isPaid } = useSelector(state => state.pay);
  const [howPay, setHowPay] = useState(1);

  return <PaymentPresenter dispatch={dispatch} itemsForPay={itemsForPay} isPaying={isPaying} isPaid={isPaid} user={me} isSignedIn={isSignedIn} howPay={howPay} setHowPay={setHowPay} />;
};

export default PaymentContainer;
