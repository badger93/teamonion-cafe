import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import '../styles/MyOrderCard.scss';
import magicCircle from '../../../../image/magiccircle.png';
import butterfly from '../../../../image/butterfly.png';
import { clearTimeout } from 'timers';
const MyOrderCard = ({
  // 전체 주문목록 새로고침
  changedData,
  orderId,
  paid,
  made,
  setOrders,
  orders,
  userId,
  menu = [],
}) => {
  const [isChanging, setIsChanging] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // 변경될 것 있을시 추가
    let waitForFinishingAnimation = null;
    if (
      changedData &&
      Object.keys(changedData).length > 0 &&
      userId === changedData.buyerId &&
      orderId === changedData.id &&
      orders.length > 0
    ) {
      if (changedData.pickup === true) {
        setIsDeleting(true);
      } else {
        setIsChanging(true);
      }

      setTimeout(() => {
        let newOrders = [...orders];
        const changedDataIndex = newOrders.findIndex(e => {
          // 변화된 주문정보 찾기
          return e.id === changedData.id;
        });
        if (changedDataIndex < 0) {
          return;
        }

        if (changedData.pickup === true) {
          const ordersWithoutAfterPickup = [
            ...newOrders.slice(0, changedDataIndex),
            ...newOrders.slice(changedDataIndex + 1, newOrders.length),
          ];
          newOrders = [...ordersWithoutAfterPickup];
          setIsDeleting(false);
          setOrders([...newOrders]);
        } else {
          newOrders[changedDataIndex] = {
            ...newOrders[changedDataIndex],
            made: changedData.made,
            paid: changedData.paid,
          };
          setIsChanging(false);
          setOrders([...newOrders]);
        }
      }, 1500);
    }
  }, [changedData]);

  return (
    <div className="myorder-card-container">
      {changedData && changedData.id === orderId && isDeleting && (
        <div className="myorder-card-deleting-container">
          <div className="myorder-card-deleting" />
          <div className="myorder-card-deleting" />
          <div className="myorder-card-deleting" />
          <div className="myorder-card-deleting" />
          <img className="butterfly" src={butterfly} alt="butterfly" />
          <img className="butterfly" src={butterfly} alt="butterfly" />
          <img className="butterfly" src={butterfly} alt="butterfly" />
          <img className="butterfly" src={butterfly} alt="butterfly" />
          <img className="butterfly" src={butterfly} alt="butterfly" />
          <img className="butterfly" src={butterfly} alt="butterfly" />
          <img className="magiccircle" src={magicCircle} alt="magincircle" />
        </div>
      )}
      <div className={`myorder-card ${isDeleting && 'myorder-card-fadeout'}`}>
        {changedData && changedData.made && changedData.id === orderId && isChanging && (
          <div className="myorder-card-status-cloud">
            <div className="cloud" />
            <div className="cloud" />
            <div className="cloud" />
            <div className="cloud" />
          </div>
        )}
        <div className={!made ? 'myorder-status' : 'myorder-status-finish'}>
          {!made ? (
            <img
              className="myorder-status-image"
              alt="cupimg"
              src="http://i.imgur.com/QPSr0cT.jpg"
            />
          ) : (
            <>
              <img
                className="myorder-status-image-finish"
                alt="cupimg-finish"
                src=" http://i.imgur.com/3mkHz2x.jpg"
              />
              <div className="myorder-status-ball-finish" />
              <div className="myorder-status-ball-finish" />
              <div className="myorder-status-ball-finish" />
              <div className="myorder-status-ball-finish" />
              <div className="myorder-status-ball-finish" />
              <div className="myorder-status-ball-finish" />
            </>
          )}
        </div>
        <div className="myorder-status-box">
          <div className="myorder-box-making">
            {!made ? (
              '열심히 음료를 만들고 있어요'
            ) : (
              <div className="myorder-box-made">
                <div>음료 준비가 완료되었어요</div> <div>매장으로 오세요!</div>{' '}
              </div>
            )}
          </div>
        </div>
        {!paid && <div className="myorder-status-paid">현장결제가 필요합니다</div>}
        <div className="menu-container">
          {menu && menu.map((drink, index) => <div key={index}>{`${drink}`}</div>)}
        </div>
      </div>
    </div>
  );
};
MyOrderCard.propTypes = {
  paid: propTypes.bool.isRequired,
  made: propTypes.bool.isRequired,
  menu: propTypes.arrayOf(propTypes.string).isRequired,
  setOrders: propTypes.func.isRequired,
  userId: propTypes.string.isRequired,
};

export default MyOrderCard;
