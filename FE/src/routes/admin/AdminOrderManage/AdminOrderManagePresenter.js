import React from 'react';
import propTypes from 'prop-types';

const AdminOrderManagePresenter = ({
  currentOrderList,
  setCurrentOrderList,
}) => {
  const lists = currentOrderList.map(i => <div>{i.toString()}</div>);
  return (
    <>
      <div>내주문</div>
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
