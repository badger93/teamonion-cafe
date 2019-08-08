import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { setChangedOrderAction } from '../redux/actions/orderAction';
import WsMsgPop from './WsMsgPop';

const GlobalWs = withRouter(({ location }) => {
  const { isSignedIn, me } = useSelector(state => state.user);
  const [isConnect, setIsConnect] = useState(false);
  const [popMsg, setPopMsg] = useState('');
  const [isPopup, setIsPopup] = useState(false);
  const dispatch = useDispatch();

  const token = () => {
    const localToken = localStorage.getItem('TOKEN');
    const sessionToken = sessionStorage.getItem('TOKEN');
    return localToken ? `Bearer ${localToken}` : '' || sessionToken ? `Bearer ${sessionToken}` : '';
  };

  const client = useMemo(
    () => Stomp.over(new SockJS('http://teamonion-idev.tmon.co.kr/teamonion', null, {})),
    [],
  );

  const socketOrderInit = () => {
    client.connect({ Authorization: token() }, frame => {
      setIsConnect(true);
      if (me.memberRole === 'NORMAL') {
        const userSocket = client.subscribe('/user/queue/orders/update', msg => {
          setIsPopup(false);
          const res = msg.body && JSON.parse(msg.body);
          dispatch(setChangedOrderAction(res));
          setPopMsg(res);
        });
      } else if (me.memberRole === 'ADMIN') {
        const adminSocket = client.subscribe('/topic/orders/add', msg => {
          const res = JSON.parse(msg.body);
          setPopMsg(res);
        });
      }
    });
  };

  const wsPopup = useMemo(() => {
    return isPopup && <WsMsgPop popMsg={popMsg} setIsPopup={setIsPopup} />;
  }, [isPopup]);

  useEffect(() => {
    popMsg && setIsPopup(true);
  }, [popMsg]);

  useEffect(() => {
    if (isSignedIn && !isConnect) {
      socketOrderInit();
    } else if (!isSignedIn && isConnect) {
      client.disconnect();
    }
  }, [isSignedIn, location.pathname]);

  return (
    <div className="wsPresenter">
      <input type="button" value="popbtn" onClick={() => setIsPopup(true)} />
      {wsPopup}
    </div>
  );
});

export default GlobalWs;
