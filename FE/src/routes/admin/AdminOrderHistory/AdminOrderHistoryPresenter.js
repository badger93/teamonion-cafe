import React from 'react';
import propTypes from 'prop-types';
import ReactDataGrid from 'react-data-grid';
import './styles/AdminOrderHistoryPresenter.scss';

const AdminOrderHistoryPresenter = ({ orderHistoryData, getHistoryDataByState }) => {
  // order_id ,menus, paymentType, paid, made, pickup, createdDate, amount, member_id

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
      width: 100,
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
    order_id: item.order_id,
    member_id: item.member_id,
    menus: item.menus,
    paymentType: item.paymentType,
    createdDate: item.createdDate,
    amount: item.amount,
    paid: item.paid ? 'YES' : 'NO',
    made: item.made ? 'YES' : 'NO',
    pickup: item.pickup ? 'YES' : 'NO',
  }));

  return (
    <div className="AdminOrderHistoryPresenter">
      <div className="pageTitle">주문이력</div>
      {/* TODO -- 상태 별 getHistoryDataByState 파라미터 넣어주기 */}
      <div className="orderTabArea">
        <input
          className="allBtn"
          type="button"
          value="전체보기"
          onClick={() => getHistoryDataByState()}
        />
        <input
          className="nonpayBtn"
          type="button"
          value="미결제"
          onClick={() => getHistoryDataByState()}
        />
        <input
          className="paidBtn"
          type="button"
          value="결제완료"
          onClick={() => getHistoryDataByState()}
        />
        <input
          className="madeBtn"
          type="button"
          value="제작완료"
          onClick={() => getHistoryDataByState()}
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
    </div>
  );
};

AdminOrderHistoryPresenter.defaultProps = {
  orderHistoryData: [],
  getHistoryDataByState: () => {},
};

AdminOrderHistoryPresenter.propTypes = {
  orderHistoryData: propTypes.arrayOf(),
  getHistoryDataByState: propTypes.func,
};

export default AdminOrderHistoryPresenter;
