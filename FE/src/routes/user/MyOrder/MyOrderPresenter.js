import React from 'react';
import propTypes from 'prop-types';
import MyOrderCard from '../../../components/MyOrderCard';
import './styles/MyOrderPresenter.scss';

const MyOrderPresenter = ({ orders, setOrders, userId }) => (
  <div className="myorder-wrapper">
    {orders.map(
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
