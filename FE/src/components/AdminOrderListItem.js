import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import '../styles/AdminOrderListItem.scss';

const AdminOrderListItem = ({
  list, setCurrentOrderList,
}) => {
  const {
    order_id, menus, made, paid, pickup, createdDate, amount, member_id,
  } = list;
  const alignMenus = menus.map((item) => {
    const result = <li>{item}</li>;
    return result;
  }, '');

  return (
    <div className="AdminOrderListItem">
      {made ? <></> : <div className="madeBtn">→</div>}
      <div className="orderNum">{`주문번호. ${order_id}`}</div>
      <div className="member_id">{`ID:  ${member_id}`}</div>
      <ul>
        {alignMenus}
      </ul>
      <div className="payArea">
        {paid
          ? <div className="paid">결제완료</div>
          : (
            <>
              <div className="non-paid">{`결제금액: ${amount} 원`}</div>
              <input className="payBtn" type="button" value="결제하기" />
            </>
          )}
      </div>
      {(made && paid) ? <input className="pickupBtn" type="button" value="PickUp" /> : <></>}
      <div className="createdDate">{createdDate}</div>
    </div>
  );
};

AdminOrderListItem.defaultProps = {
  list: [],
  setCurrentOrderList: () => {},
};

AdminOrderListItem.propTypes = {
  list: propTypes.objectOf(propTypes.oneOfType([
    propTypes.number, propTypes.string, propTypes.array, propTypes.bool,
  ])),
  setCurrentOrderList: propTypes.func,
};

export default AdminOrderListItem;
