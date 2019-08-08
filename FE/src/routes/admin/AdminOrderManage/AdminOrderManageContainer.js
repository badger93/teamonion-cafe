import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminOrderManagePresenter from './AdminOrderManagePresenter';
import getNonpickupAll from '../../../api/adminOrderApi';
import { sendOrderStateAction } from '../../../redux/actions/orderAction';

const AdminOrderManageContainer = () => {
  const [currentOrderList, setCurrentOrderList] = useState([]);
  const [arrangedItem, setArrangedItem] = useState(null);
  const dispatch = useDispatch();
  const { changed_order } = useSelector(state => state.order);

  useEffect(() => {
    if (!changed_order.errorMessage) {
      const isAdd =
        changed_order.hasOwnProperty('createdDate') ||
        changed_order.hasOwnProperty('amount') ||
        changed_order.hasOwnProperty('paymentType');

      if (isAdd) {
        setArrangedItem({
          ...changed_order,
          order_id: changed_order.id,
          menus: changed_order.menuNameList,
          member_id: changed_order.buyerId,
        });
      } else {
        setArrangedItem({
          ...changed_order,
          order_id: changed_order.id,
          member_id: changed_order.buyerId,
        });
      }
    }
  }, [changed_order]);

  const socketSetOrderState = async ({ order_id, member_id, made, paid, pickup }, change) => {
    const payload = Object.assign({ id: order_id, buyerId: member_id, made, paid, pickup }, change);
    try {
      await dispatch(sendOrderStateAction(payload));
    } catch (err) {
      alert('연결 없음');
    }
  };

  // 최초 api call
  useEffect(() => {
    const socketInit = async () => {
      try {
        await getNonpickupAll(setCurrentOrderList);
      } catch (err) {
        console.log(err);
      }
    };
    socketInit();
  }, []);

  // 변경된 아이템이 감지되면 렌더하기 위한 코드
  useEffect(() => {
    // 수정
    if (arrangedItem) {
      const arrangedList = currentOrderList.map(item =>
        item.order_id == arrangedItem.order_id ? { ...item, ...arrangedItem } : item,
      );
      setCurrentOrderList(arrangedList);
    }
    // 추가
    if (arrangedItem && arrangedItem.menus) {
      const arrangedList = currentOrderList.concat(arrangedItem);
      setCurrentOrderList(arrangedList);
    }
  }, [arrangedItem]);

  return (
    <AdminOrderManagePresenter
      currentOrderList={currentOrderList}
      socketSetOrderState={socketSetOrderState}
    />
  );
};

export default AdminOrderManageContainer;
