/* eslint-disable no-nested-ternary */
import React from 'react';
import propTypes from 'prop-types';
import AdminMakingArea from './components/AdminMakingArea';
import './styles/AdminOrderManagePresenter.scss';

const AdminOrderManagePresenter = ({ currentOrderList, setCurrentOrderList }) => {
  const beforeList = currentOrderList.filter(item => item.made === false && item.pickup === false);
  const afterList = currentOrderList.filter(item => item.made === true && item.pickup === false);
  // 주문 리스트정렬 제작중엔 미결제가 상단, 제작 완료시 결제완료된 것이 상단, 같은 조건시에는 주문번호순 정렬
  beforeList.sort((a, b) => (a.paid < b.paid ? -1 : a.paid > b.paid ? 1 : 0));
  afterList.sort((a, b) => (a.paid > b.paid ? -1 : a.paid < b.paid ? 1 : 0));

  return (
    <div className="AdminOrderManagePresenter">
      <h1>주문현황</h1>
      <div className="orderContainer">
        <AdminMakingArea
          list={beforeList}
          areaName="before"
          setCurrentOrderList={setCurrentOrderList}
        />
        <div className="arrowContainer">
          <img
            src="https://www.castelbrando.com/wp-content/themes/castel-brando/assets/img/svg/arrow-right.svg"
            alt="화살표이미지"
          />
        </div>
        <AdminMakingArea
          list={afterList}
          areaName="after"
          setCurrentOrderList={setCurrentOrderList}
        />
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
