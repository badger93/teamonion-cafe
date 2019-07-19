import React from 'react';
import propTypes from 'prop-types';

const AdminOrderManagePresenter = ({
  currentOrderList,
  setCurrentOrderList,
}) => {
  console.dir(currentOrderList);
  return (
    <>
      <h1>주문현황</h1>
      <div className="orderContainer">
        <div className="premaking-area">
          <h2>제작중</h2>
          <div className="orderBoard">
            <div className="orderLists">
              <div className="orderListItem" />
            </div>
          </div>
        </div>
        <div className="premaking-area">
          <h2>제작완료</h2>
          <div className="orderBoard">
            <div className="orderLists">
              <div className="orderListItem" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

AdminOrderManagePresenter.defaultProps = {
  currentOrderList: [],
  setCurrentOrderList: () => {},
};

AdminOrderManagePresenter.propTypes = {
  currentOrderList: propTypes.arrayOf(propTypes.object),
  setCurrentOrderList: propTypes.func,
};

export default AdminOrderManagePresenter;
