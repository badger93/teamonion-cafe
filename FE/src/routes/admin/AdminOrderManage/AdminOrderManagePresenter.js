import React from 'react';
import propTypes from 'prop-types';
import AdminMakingArea from '../../../components/AdminMakingArea';
import '../../../styles/AdminOrderManagePresenter.scss';

const AdminOrderManagePresenter = ({
  currentOrderList,
  setCurrentOrderList,
}) => {
  const beforeList = currentOrderList.filter(
    item => (item.made === false && item.pickup === false),
  );
  const afterList = currentOrderList.filter(
    item => (item.made === true && item.pickup === false),
  );

  return (
    <div className="AdminOrderManagePresenter">
      <h1>주문현황</h1>
      <div className="orderContainer">
        <AdminMakingArea list={beforeList} areaName="before" setCurrentOrderList={setCurrentOrderList} />
        <div className="arrowContainer">
          <img src="https://www.castelbrando.com/wp-content/themes/castel-brando/assets/img/svg/arrow-right.svg" alt="화살표이미지" />
        </div>
        <AdminMakingArea list={afterList} areaName="after" setCurrentOrderList={setCurrentOrderList} />
      </div>
    </div>
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
