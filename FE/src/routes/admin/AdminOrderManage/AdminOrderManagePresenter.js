import React from 'react';
import propTypes from 'prop-types';

const AdminOrderManagePresenter = ({
  currentOrderList,
  setCurrentOrderList,
}) => {
  console.log(currentOrderList);
  return (
    <>
      <div>내주문</div>
      <div>{currentOrderList}</div>
    </>
  );
};

AdminOrderManagePresenter.propTypes = {};

export default AdminOrderManagePresenter;
