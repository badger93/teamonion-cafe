import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setWsConnectAction } from '../../../redux/actions/orderAction';
import MyOrderPresenter from './MyOrderPresenter';
import { userOrderAPI } from '../../../api/userApi';
import CanvasModal from './components/CanvasModal';
import './styles/MyOrderContainer.scss';

const MyOrderContainer = () => {
  const { me } = useSelector(state => state.user);
  const { changed_order } = useSelector(state => state.order);
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const [changedData, setChangedData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isChanging, setIsChanging] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCanvasOpen, setIsCanvasOpen] = useState(false);

  useEffect(() => {
    if (!changed_order.errorMessage) setChangedData(changed_order);
  }, [changed_order]);

  useEffect(() => {
    const beConnect = orders.length > 0 ? true : false;
    dispatch(setWsConnectAction(beConnect));
  }, [orders]);

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
      }
    };
    fetchMyOrder();
    // console.log(orders);
  }, []);

  useEffect(() => {
    // 변경될 것 있을시 추가
    if (changedData && me.memberId === changedData.buyerId && orders.length > 0) {
      // console.dir(orders);
      let newOrders = [...orders];
      const changedDataIndex = newOrders.findIndex(e => {
        // 변화된 주문정보 찾기
        return e.id === changedData.id;
      });
      // console.log('dataindex:' + changedDataIndex);
      if (changedData.pickup === true && changedDataIndex >= 0) {
        // 픽업된 주문정보 삭제
        setIsDeleting(true);
        setTimeout(() => {
          const ordersWithoutAfterPickup = [
            ...newOrders.slice(0, changedDataIndex),
            ...newOrders.slice(changedDataIndex + 1, newOrders.length),
          ];
          newOrders = [...ordersWithoutAfterPickup];
          setIsDeleting(false);
          setOrders([...newOrders]);
        }, 3000);
      } else if (changedDataIndex >= 0) {
        // 변화만 된 주문정보 변경
        setIsChanging(true);

        setTimeout(() => {
          newOrders[changedDataIndex] = {
            ...newOrders[changedDataIndex],
            made: changedData.made,
            paid: changedData.paid,
          };
          setIsChanging(false);
          setOrders([...newOrders]);
        }, 3000);

        // console.dir(newOrders[changedDataIndex]);
      }
      // console.dir(newOrders);
    }
  }, [changedData]);

  return (
    <div className="myOrderContainer">
      {isCanvasOpen && <CanvasModal setIsCanvasOpen={setIsCanvasOpen} />}
      <MyOrderPresenter
        setIsCanvasOpen={setIsCanvasOpen}
        isLoading={isLoading}
        orders={orders}
        setOrders={setOrders}
        userId={me.id}
        isChanging={isChanging}
        changedData={changedData}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default MyOrderContainer;
