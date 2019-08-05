import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import MyOrderCard from './components/MyOrderCard';
import './styles/MyOrderPresenter.scss';
import Loading from '../../../components/Loading';

const MyOrderPresenter = ({
  changedData,
  isDeleting,
  isChanging,
  isLoading,
  orders,
  setOrders,
  userId,
}) => {
  return (
    <>
      {isLoading && <Loading />}
      <div className="myorder-wrapper">
        {orders.length > 0 &&
          orders.map(
            order =>
              !order.pickup && (
                <MyOrderCard
                  key={order.id}
                  changedData={changedData}
                  orderId={order.id}
                  made={order.made}
                  paid={order.paid}
                  menu={order.menuNameList}
                  setOrders={setOrders}
                  userId={userId}
                  isChanging={isChanging}
                  isDeleting={isDeleting}
                />
              ),
          )}
        {!isLoading && orders.length === 0 && (
          <div className="myorder-nothing">
            <div className="myorder-nothing-cry" />
            <div className="myorder-nothing-empty">Empty</div>
            <div className="myorder-nothing-uu">주문이 없어요 ㅠㅠ</div>
          </div>
        )}
      </div>
    </>
  );
};

MyOrderPresenter.propTypes = {
  isDeleting: propTypes.bool.isRequired,
  isChanging: propTypes.bool.isRequired,
  isLoading: propTypes.bool.isRequired,
  orders: propTypes.arrayOf(
    propTypes.shape({
      pickup: propTypes.bool,
      made: propTypes.bool,
      paid: propTypes.bool,
      menuNameList: propTypes.array,
    }),
  ),
  setOrders: propTypes.func.isRequired,
  userId: propTypes.number.isRequired,
};

export default MyOrderPresenter;
