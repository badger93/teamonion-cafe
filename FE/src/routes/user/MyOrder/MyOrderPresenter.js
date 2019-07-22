import React from 'react';
import propTypes from 'prop-types';
import MyOrderCard from '../../../components/MyOrderCard';
import './styles/MyOrderPresenter.scss';

const MyOrderPresenter = ({ orders }) => (
  <div className="myorder-wrapper">
      {orders.map(
        (order, index) => !order.pickup && (
            <MyOrderCard
              key={index}
              made={order.made}
              paid={order.paid}
              menu={order.menu}
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
};

export default MyOrderPresenter;
