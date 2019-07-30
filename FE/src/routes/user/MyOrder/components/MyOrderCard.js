import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import '../styles/MyOrderCard.scss';
import { userOrderAPI } from '../api/userApi';

const MyOrderCard = ({
  // 전체 주문목록 새로고침
  paid,
  made,
  menu,
  setOrders,
  userId,
}) => {
  const onRefreshClick = useCallback(() => {
    const RefreshOrder = async () => {
      try {
        const {
          data: { content },
        } = await userOrderAPI(userId, false);
        setOrders(content);
      } catch (e) {
        console.log(e);
      }
    };
    RefreshOrder();
  }, [userId, setOrders]);
  return (
    <div className="myorder-card-container">
      <div className="refresh-button" onClick={onRefreshClick}>
        <FontAwesomeIcon icon={faRedo} size="2x" />
      </div>
      <div className="myorder-card">
        <div className={!made ? 'myorder-status' : 'myorder-status-finish'}>
          {!made ? (
            <img className="myorder-status-image" src="http://i.imgur.com/QPSr0cT.jpg" />
          ) : (
            <>
              <img className="myorder-status-image-finish" src=" http://i.imgur.com/3mkHz2x.jpg" />
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
  userId: propTypes.number.isRequired,
};

export default MyOrderCard;
