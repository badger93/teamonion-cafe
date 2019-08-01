import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import MyOrderCard from './components/MyOrderCard';
import './styles/MyOrderPresenter.scss';
import Loading from '../../../components/Loading';

const MyOrderPresenter = ({ isLoading, orders, setOrders, userId }) => {
  const localToken = localStorage.getItem('TOKEN');
  const sessionToken = sessionStorage.getItem('TOKEN');
  const token = localToken
    ? `Bearer ${localToken}`
    : '' || sessionToken
    ? `Bearer ${sessionToken}`
    : '';

  // const [currentOrderList, setCurrentOrderList] = useState([]);
  const client = Stomp.over(
    new SockJS('/teamonion', null, {
      headers: { Authorization: token },
    }),
  );

  const socketMyOrderInit = () => {
    client.connect({}, async frame => {
      console.log(frame);
      alert(`socket conneted: ${frame}`);
      await client.subscribe('/topic/order', msg => {
        console.log('message : ' + msg);
        const newArrayOrders = [...orders];
        const changedData = msg.body && JSON.parse(msg.body);
        console.log('newArrayOrders' + newArrayOrders);
        console.log('changedData:' + changedData);
        console.log('orders:' + orders);

        if (newArrayOrders.length > 0) {
          const changedDataIndex = newArrayOrders.findIndex(e => {
            return e.id === changedData.id;
          });

          if (changedData.pickup === true) {
            // pick up 된거면 제거
            newArrayOrders = newArrayOrders.slice(changedDataIndex);
          } else {
            newArrayOrders[changedDataIndex] = {
              ...newArrayOrders[changedDataIndex],
              made: changedData.made,
              paid: changedData.paid,
            };
          }
        }

        setOrders([...newArrayOrders]);
      });
      // client.send('/api/orders/update', {}, JSON.stringify({ memberId: me.id }));
    });
  };

  useEffect(() => {
    socketMyOrderInit();

    return () => {
      try {
        client.disconnect(() => {
          alert('socket disconnected!');
        });
      } catch (e) {
        console.log(e);
      }
    };
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      <div className="myorder-wrapper">
        {orders.length > 0 &&
          orders.map(
            (order, index) =>
              !order.pickup && (
                <MyOrderCard
                  key={index}
                  made={order.made}
                  paid={order.paid}
                  menu={order.menuNameList}
                  setOrders={setOrders}
                  userId={userId}
                />
              ),
          )}
        {!isLoading && orders.length === 0 && (
          <div className="myorder-nothing">
            <div className="myorder-nothing-cry" />
            <div className="myorder-nothing-empty">Empty</div>
            <div className="myorder-nothing-uu">주문이 없어요 ㅠㅠ</div>
          </div>
        )}
      </div>
    </>
  );
};

MyOrderPresenter.propTypes = {
  isLoading: propTypes.bool.isRequired,
  orders: propTypes.arrayOf(
    propTypes.shape({
      pickup: propTypes.bool,
      made: propTypes.bool,
      paid: propTypes.bool,
      menuNameList: propTypes.array,
    }),
  ),
  setOrders: propTypes.func.isRequired,
  userId: propTypes.number.isRequired,
};

export default MyOrderPresenter;
