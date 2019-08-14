import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setWsConnectAction } from '../../../redux/actions/orderAction';
import MyOrderPresenter from './MyOrderPresenter';
import { userOrderAPI } from '../../../api/userApi';
import CanvasModal from './components/CanvasModal';
import './styles/MyOrderContainer.scss';
import { logOutAction } from '../../../redux/actions/userAction';

const MyOrderContainer = () => {
  const { me } = useSelector(state => state.user);
  const { changed_order } = useSelector(state => state.order);
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const [changedData, setChangedData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // const [isChanging, setIsChanging] = useState(false);
  // const [isDeleting, setIsDeleting] = useState(false);
  const [isCanvasOpen, setIsCanvasOpen] = useState(false);

  useEffect(() => {
    if (!changed_order.errorMessage) setChangedData(changed_order);
  }, [changed_order]);

  useEffect(() => {
    const beConnect = orders.length > 0 ? true : false;
    dispatch(setWsConnectAction(beConnect));
  }, [orders, dispatch]);

  useEffect(() => {
    const fetchMyOrder = async () => {
      try {
        if (me) {
          const {
            data: { content },
          } = await userOrderAPI(me.id, false);
          // console.log(content);
          setOrders([...content]);
          setIsLoading(false);
        }
      } catch (e) {
        console.log(e);
        dispatch(logOutAction());
        localStorage.removeItem('USER');
        localStorage.removeItem('CART');
        localStorage.removeItem('TOKEN'); // 로그아웃시 토큰 삭제
      }
    };
    fetchMyOrder();
    // console.log(orders);
  }, []);

  // useEffect(() => {
  //   // 변경될 것 있을시 추가
  //   if (
  //     changedData &&
  //     Object.keys(changedData).length > 0 &&
  //     me.memberId === changedData.buyerId &&
  //     orders.length > 0
  //   ) {
  //     let newOrders = [...orders];
  //     const changedDataIndex = newOrders.findIndex(e => {
  //       // 변화된 주문정보 찾기
  //       return e.id === changedData.id;
  //     });
  //     if (changedData.pickup === true && changedDataIndex >= 0) {
  //       setIsDeleting(true);
  //       setTimeout(() => {
  //         const ordersWithoutAfterPickup = [
  //           ...newOrders.slice(0, changedDataIndex),
  //           ...newOrders.slice(changedDataIndex + 1, newOrders.length),
  //         ];
  //         newOrders = [...ordersWithoutAfterPickup];
  //         setIsDeleting(false);
  //         setOrders([...newOrders]);
  //       }, 3000);
  //     } else if (changedDataIndex >= 0) {
  //       setIsChanging(true);

  //       setTimeout(() => {
  //         newOrders[changedDataIndex] = {
  //           ...newOrders[changedDataIndex],
  //           made: changedData.made,
  //           paid: changedData.paid,
  //         };
  //         setIsChanging(false);
  //         setOrders([...newOrders]);
  //       }, 3000);
  //     }
  //   }
  // }, [changedData]);

  return (
    <div className="myOrderContainer">
      {isCanvasOpen && <CanvasModal setIsCanvasOpen={setIsCanvasOpen} />}
      <MyOrderPresenter
        setIsCanvasOpen={setIsCanvasOpen}
        isLoading={isLoading}
        orders={orders}
        setOrders={setOrders}
        userId={me.memberId}
        changedData={changedData}
      />
    </div>
  );
};

export default MyOrderContainer;
