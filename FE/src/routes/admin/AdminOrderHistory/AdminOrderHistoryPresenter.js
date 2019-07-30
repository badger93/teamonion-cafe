import React, { useState, useCallback } from 'react';
import propTypes from 'prop-types';
import ReactDataGrid from 'react-data-grid';
import './styles/AdminOrderHistoryPresenter.scss';
import Pagination from '../../../components/Pagination';

const AdminOrderHistoryPresenter = ({ orderHistoryData, getHistoryDataByCategory, pageData }) => {
  // order_id ,menus, paymentType, paid, made, pickup, createdDate, amount, member_id
  const [currentCategory, setCurrentCategory] = useState('ALL');

  const chageStateCallback = useCallback(
    category => {
      setCurrentCategory(category);
      getHistoryDataByCategory(category);
    },
    [currentCategory],
  );
  console.log(pageData);
  const colums = [
    {
      key: 'order_id',
      name: '주문아이디',
      width: 70,
      resizable: true,
    },
    {
      key: 'member_id',
      name: '주문자ID',
      width: 100,
      resizable: true,
    },
    {
      key: 'menus',
      name: '주문',
      resizable: true,
    },
    {
      key: 'paymentType',
      name: '결제타입',
      width: 60,
      resizable: true,
    },
    {
      key: 'createdDate',
      name: '주문시간',
      width: 150,
      resizable: true,
    },
    {
      key: 'amount',
      name: '총액',
      width: 100,
      resizable: true,
    },
    {
      key: 'paid',
      name: '결제여부',
      width: 60,
      resizable: true,
    },
    {
      key: 'made',
      name: '제조여부',
      width: 60,
      resizable: true,
    },
    {
      key: 'pickup',
      name: '픽업여부',
      width: 60,
      resizable: true,
    },
  ];

  const rows = orderHistoryData.map(item => ({
    order_id: item.id,
    member_id: item.buyerId,
    menus: item.menuNameList.map(menu => `${menu} `),
    paymentType: item.paymentType,
    createdDate: item.createdDate.replace(/T/gi, ' '),
    amount: item.amount,
    paid: item.paid ? 'YES' : 'NO',
    made: item.made ? 'YES' : 'NO',
    pickup: item.pickup ? 'YES' : 'NO',
  }));

  return (
    <div className="AdminOrderHistoryPresenter">
      <div className="pageTitle">주문이력</div>
      <div className="orderTabArea">
        <input
          className="allBtn"
          type="button"
          value="전체보기"
          onClick={() => chageStateCallback('ALL')}
        />
        <input
          className="nonpayBtn"
          type="button"
          value="미결제"
          onClick={() => chageStateCallback('PAID_FALSE')}
        />
        <input
          className="paidBtn"
          type="button"
          value="결제완료"
          onClick={() => chageStateCallback('PAID_TRUE')}
        />
        <input
          className="madeBtn"
          type="button"
          value="제작완료"
          onClick={() => chageStateCallback('MADE_TRUE')}
        />
      </div>

      <div className="historyList">
        <ReactDataGrid
          className="historyGrid"
          columns={colums}
          rowGetter={i => rows[i]}
          rowsCount={rows.length}
        />
      </div>
      <Pagination
        pageData={pageData}
        callback={e => {
          getHistoryDataByCategory(currentCategory, e.target.value - 1, 10);
        }}
      />
    </div>
  );
};

AdminOrderHistoryPresenter.defaultProps = {
  orderHistoryData: [],
  getHistoryDataByCategory: () => {},
  pageData: {},
  fetchHistoryAPI: () => {},
};

AdminOrderHistoryPresenter.propTypes = {
  orderHistoryData: propTypes.arrayOf(),
  getHistoryDataByCategory: propTypes.func,
  pageData: propTypes.objectOf,
  fetchHistoryAPI: propTypes.func,
};

export default AdminOrderHistoryPresenter;
