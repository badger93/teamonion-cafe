import React from 'react';
import propTypes from 'prop-types';
import MyOrderCard from './components/MyOrderCard';
import './styles/MyOrderPresenter.scss';
import Loading from '../../../components/Loading';
import tmony4 from '../../../image/tmony4.png';

const MyOrderPresenter = ({
  setIsCanvasOpen,
  changedData,
  isLoading,
  orders,
  setOrders,
  userId,
}) => {
  return (
    <>
      {isLoading && <Loading />}
      <div className="myorder-container">
        <div className="myorder-header">
          <div className="myorder-header-timesnack">
            <div className="myorder-header-timesnack-title">기다리기 지루하시다면..</div>
            <div className="myorder-header-timesnack-hide">
              <div
                className="myorder-header-timesnack-button"
                onClick={() => setIsCanvasOpen(true)}
              >
                PixelCanvas
              </div>
            </div>
          </div>
        </div>
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
                    orders={orders}
                  />
                ),
            )}
          {!isLoading && orders.length === 0 && (
            <div className="myorder-nothing">
              <div className="myorder-nothing-cry" style={{ backgroundImage: `url(${tmony4})` }} />
              <div className="myorder-nothing-empty">Empty</div>
              <div className="myorder-nothing-uu">주문이 없어요 ㅠㅠ</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

MyOrderPresenter.propTypes = {
  setIsCanvasOpen: propTypes.func.isRequired,
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
