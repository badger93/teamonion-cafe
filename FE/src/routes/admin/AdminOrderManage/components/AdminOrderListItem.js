import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import propTypes from 'prop-types';
import '../styles/AdminOrderListItem.scss';

const AdminOrderListItem = ({ list, socketSetOrderState, setIsBlock }) => {
  const { order_id, menus, made, paid, createdDate, amount, member_id } = list;
  const orderCard = useRef(null);
  const [timer, setTimer] = useState(false);

  const cardEffect = (element, effect) => {
    element.classList.add(effect);
    setTimeout(() => {
      element.classList.remove(effect);
    }, 1600);
  };

  // 메뉴 아이콘 ui
  const alignMenus = menus.map((item, index) => {
    const result = <li key={index}>{item}</li>;
    return result;
  }, '');

  // 메뉴 버튼 조건렌더
  const memoMakeBtn = useMemo(() => {
    return made ? (
      <></>
    ) : (
      <input
        type="button"
        value="→"
        onClick={() => {
          handleChangeState(list, { made: true }, () => cardEffect(orderCard.current, 'ghost'));
        }}
        className="madeBtn"
      />
    );
  }, [made, list]);

  // 결제버튼 조건렌더
  const memoPaidBtn = useMemo(() => {
    return paid ? (
      <div className="paid">결제완료</div>
    ) : (
      <>
        <div className="non-paid">{`결제금액: ${amount} 원`}</div>
        <input
          className="payBtn"
          type="button"
          value="결제하기"
          onClick={() =>
            handleChangeState(list, { paid: true }, () => cardEffect(orderCard.current, 'blink'))
          }
        />
      </>
    );
  }, [amount, paid, list]);

  // 픽업버튼 조건렌더
  const memoPickupBtn = useMemo(() => {
    return made && paid ? (
      <input
        className="pickupBtn"
        type="button"
        value="PickUp"
        onClick={() =>
          handleChangeState(list, { pickup: true }, () => cardEffect(orderCard.current, 'fly'))
        }
      />
    ) : (
      <></>
    );
  }, [made, paid, list]);

  // state 변경 callback
  const handleChangeState = useCallback(
    (list, state, graphicEffect) => {
      if (!timer) {
        if (!timer && graphicEffect) {
          graphicEffect();
        }
        setTimer(true);
        setTimeout(() => {
          socketSetOrderState(list, state);
          setTimer(false);
        }, 1500);
      }
    },
    [timer],
  );

  useEffect(() => {
    timer ? setIsBlock(true) : setIsBlock(false);
  }, [timer]);

  return (
    <div className="AdminOrderListItem" ref={orderCard}>
      {memoMakeBtn}
      <div className="orderNum">{`주문번호. ${order_id}`}</div>
      <div className="member_id">{`ID:  ${member_id}`}</div>
      <ul>{alignMenus}</ul>
      <div className="payArea">{memoPaidBtn}</div>
      {memoPickupBtn}
      <div className="createdDate">{createdDate}</div>
    </div>
  );
};

AdminOrderListItem.defaultProps = {
  list: [],
  socketSetOrderState: () => {},
};

AdminOrderListItem.propTypes = {
  list: propTypes.objectOf(
    propTypes.oneOfType([propTypes.number, propTypes.string, propTypes.array, propTypes.bool]),
  ),
  socketSetOrderState: propTypes.func,
};

export default AdminOrderListItem;
