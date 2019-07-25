/* eslint-disable camelcase */
import React from 'react';
import propTypes from 'prop-types';
import { putOrderState } from '../api/adminOrderApi'; // putOrderState(callback, 리스트, 변경할 State)
import '../styles/AdminOrderListItem.scss';

const AdminOrderListItem = ({ list, setCurrentOrderList }) => {
  const { order_id, menus, made, paid, createdDate, amount, member_id } = list;
  const alignMenus = menus.map((item) => {
    const result = <li>{item}</li>;
    return result;
  }, '');

  return (
    <div className="AdminOrderListItem">
      {made ? (
        <></>
      ) : (
        <input
          type="button"
          value="→"
          onClick={() =>
            putOrderState(setCurrentOrderList, list, { made: true })
          }
          className="madeBtn"
        />
      )}
      <div className="orderNum">{`주문번호. ${order_id}`}</div>
      <div className="member_id">{`ID:  ${member_id}`}</div>
      <ul>{alignMenus}</ul>
      <div className="payArea">
        {paid ? (
          <div className="paid">결제완료</div>
        ) : (
          <>
            <div className="non-paid">{`결제금액: ${amount} 원`}</div>
            <input
              className="payBtn"
              type="button"
              value="결제하기"
              onClick={() =>
                putOrderState(setCurrentOrderList, list, { paid: true })
              }
            />
          </>
        )}
      </div>
      {made && paid ? (
        <input
          className="pickupBtn"
          type="button"
          value="PickUp"
          onClick={() =>
            putOrderState(setCurrentOrderList, list, { pickup: true })
          }
        />
      ) : (
        <></>
      )}
      <div className="createdDate">{createdDate}</div>
    </div>
  );
};

AdminOrderListItem.defaultProps = {
  list: [],
  setCurrentOrderList: () => {},
};

AdminOrderListItem.propTypes = {
  list: propTypes.objectOf(
    propTypes.oneOfType([
      propTypes.number,
      propTypes.string,
      propTypes.array,
      propTypes.bool,
    ]),
  ),
  setCurrentOrderList: propTypes.func,
};

export default AdminOrderListItem;
