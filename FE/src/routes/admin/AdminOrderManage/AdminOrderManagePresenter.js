import React from 'react';
import propTypes from 'prop-types';
import AdminMakingArea from '../../../components/AdminMakingArea';

const AdminOrderManagePresenter = ({
  currentOrderList,
  setCurrentOrderList,
}) => {
  const beforeList = currentOrderList.filter(item => item.made === false);
  const afterList = currentOrderList.filter(item => item.made === true);

  return (
    <>
      <h1>주문현황</h1>
      <div className="orderContainer">
        <AdminMakingArea list={beforeList} areaName="before" />
        <div className="arrowContainer">
          <img src="" alt="화살표이미지" />
        </div>
        <AdminMakingArea list={afterList} areaName="after" />
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
