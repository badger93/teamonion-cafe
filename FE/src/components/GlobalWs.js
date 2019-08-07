import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import wsMsgPopup from './wsMsgPopup';

const GlobalWs = withRouter(({ location }) => {
  const { isSignedIn, me } = useSelector(state => state.user);
  const [isConnect, setIsConnect] = useState(false);
  const [popMsg, setPopMsg] = useState('');

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
      console.log('connectedddd');
      setIsConnect(true);
      if (me.memberRole === 'NORMAL') {
        const userSocket = client.subscribe('/user/queue/orders/update', msg => {
          const res = JSON.parse(msg.body);
          setPopMsg(res.id);
        });
      } else if (me.memberRole === 'ADMIN') {
        const adminSocket = client.subscribe('/topic/orders/add', msg => {
          const res = JSON.parse(msg.body);
          setPopMsg(res.id);
        });
      }

      // 사용자 일 때?? 주문 시작시 /topic/orders/update 로그아웃시까지 구독
      // 마지막 주문이 제작 완료되면 연결 끊기
      // 페이지 이동시마다 주문이 있으면 연결 myorder에선 끊기 myorder에서 새연결

      // // 관리자 일 때?? 로그아웃 할때까지 모든 페이지에서 주문 add 구독 매번 페이지 확인마다 체크
      // // 주문관리 페이지에서만 /queue/orders/update 구독
      // adminSocketAdd = client.subscribe('/topic/orders/add', msg => {
      //   const res = JSON.parse(msg.body);
      // });
    });
  };

  const wsPopup = useMemo(() => {
    return <wsMsgPopup popMsg={popMsg} />;
  }, [popMsg]);

  useEffect(() => {
    console.log(isSignedIn, isConnect);

    if (
      isSignedIn &&
      !isConnect &&
      location.pathname !== '/myorder' &&
      location.pathname !== '/admin/order-manage'
    ) {
      socketOrderInit();
    } else if (
      (!isSignedIn && isConnect) ||
      location.pathname === '/myorder' ||
      location.pathname === '/admin/order-manage'
    ) {
      client.disconnect();
    }
  }, [isSignedIn, location.pathname]);

  return <>{() => wsMsgPopup}</>;
});

export default GlobalWs;
