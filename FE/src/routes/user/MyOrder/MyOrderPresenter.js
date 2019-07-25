import React from 'react';
import propTypes from 'prop-types';
import MyOrderCard from '../../../components/MyOrderCard';
import './styles/MyOrderPresenter.scss';

const MyOrderPresenter = ({ orders, setOrders, userId }) => (
  <div className="myorder-wrapper">
    {orders ? orders.map(
      (order, index) => !order.pickup && (
        <MyOrderCard
          key={index}
          made={order.made}
          paid={order.paid}
          menu={order.menu}
          setOrders={setOrders}
          userId={userId}
        />
      ),
    ) : (
      <div className="myorder-nothing">
        <div className="myorder-nothing-cry" />
        <div className="myorder-nothing-empty">Empty</div>
        <div className="myorder-nothing-uu">주문이 없어요 ㅠㅠ</div>
      </div>
    )}
  </div>
);

MyOrderPresenter.propTypes = {
  orders: propTypes.shape({
    pickup: propTypes.bool,
    made: propTypes.string,
    paid: propTypes.string,
    menu: propTypes.array,
  }),
  setOrders: propTypes.func.isRequired,
  userId: propTypes.number.isRequired,
};

export default MyOrderPresenter;
