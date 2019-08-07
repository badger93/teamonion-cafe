import React from 'react';
import propTypes from 'prop-types';
import '../styles/MyOrderCard.scss';
import magicCircle from '../../../../image/magiccircle.png';
import butterfly from '../../../../image/butterfly.png';
const MyOrderCard = ({
  // 전체 주문목록 새로고침
  changedData,
  orderId,
  isChanging,
  isDeleting,
  paid,
  made,
  menu = [],
}) => {
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
        {isChanging && (
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
  isDeleting: propTypes.bool.isRequired,
  isChanging: propTypes.bool.isRequired,
  paid: propTypes.bool.isRequired,
  made: propTypes.bool.isRequired,
  menu: propTypes.arrayOf(propTypes.string).isRequired,
  setOrders: propTypes.func.isRequired,
  userId: propTypes.number.isRequired,
};

export default MyOrderCard;
