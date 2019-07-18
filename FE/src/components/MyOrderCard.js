import React from 'react';
import propTypes from 'prop-types';
import '../styles/MyOrderCard.scss';

const MyOrderCard = ({ paid, maid, menu }) => {
  return (
    <div className="myorder-card">
      <div
        className={
          maid === '제작중'
            ? 'myorder-status-ball'
            : 'myorder-status-ball-finish'
        }
      >{`${maid}`}</div>
      <div className="myorder-status-box">
        <div className="myorder-box-making">
          {maid === '제작중' ? (
            '열심히 음료를 만들고 있어요'
          ) : (
            <div className="myorder-box-made">
              <div>음료 준비가 완료되었어요</div> <div>매장으로 오세요!</div>{' '}
            </div>
          )}
        </div>
      </div>
      {paid === '미결제' && (
        <div className="myorder-status-paid">현장결제가 필요합니다</div>
      )}
      <div className="menu-container">
        {menu.map((drink, index) => (
          <div key={index}>{`${drink}`}</div>
        ))}
      </div>
    </div>
  );
};

MyOrderCard.propTypes = {
  paid: propTypes.string,
  maid: propTypes.string,
};

export default MyOrderCard;
