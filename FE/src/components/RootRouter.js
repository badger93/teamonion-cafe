import React, { useCallback, lazy, Suspense } from 'react';
import { Route, Redirect, Switch, BrowserRouter as Router } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signInPopupChangeAction } from '../redux/actions/userAction';
import Header from './Header';
import Cart from '../routes/user/Cart';
import Main from '../routes/user/Main';
import MyOrder from '../routes/user/MyOrder';
import Payment from '../routes/user/Payment';
import SignUp from '../routes/user/SignUp';
import UserInfo from '../routes/user/UserInfo';
import GlobalWs from './GlobalWs';
import Footer from './Footer';
import Loading from './Loading';

// 코드 스플릿팅
const AdminMemberManage = lazy(() => import('../routes/admin/AdminMemberManage'));
const AdminMenuManage = lazy(() => import('../routes/admin/AdminMenuManage'));
const AdminOrderManage = lazy(() => import('../routes/admin/AdminOrderManage'));
const AdminOrderHistory = lazy(() => import('../routes/admin/AdminOrderHistory'));

const RootRouter = () => {
  const { isSignedIn, me } = useSelector(state => state.user);

  const dispatch = useDispatch();

  const popupControl = useCallback(() => {
    dispatch(signInPopupChangeAction());
  }, [dispatch]);

  // 로그인 상태 인지 확인해서 아닐경우 리다이렉트 시키는 컴포넌트
  const SignInRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props => {
        if (isSignedIn === true) {
          return <Component {...props} />;
        }
        setTimeout(() => popupControl(), 1000);
        return <Redirect to="/" />;
      }}
    />
  );

  // Admin 인지 확인해서 아닐경우 리다이렉트 시키는 컴포넌트
  const AdminRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props =>
          me.memberRole === 'ADMIN' ? <Component {...props} /> : <Redirect to="/" />
        }
      />
    );
  };

  return (
    <Router>
      <>
        <Header />
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/cart" exact component={Cart} />
            <Route path="/signup" exact component={SignUp} />
            <SignInRoute path="/myorder" exact component={MyOrder} />
            <SignInRoute path="/payment" exact component={Payment} />
            <SignInRoute path="/user-info" exact component={UserInfo} />
            <AdminRoute path="/admin/member-manage" exact component={AdminMemberManage} />
            <AdminRoute path="/admin/menu-manage" exact component={AdminMenuManage} />
            <AdminRoute path="/admin/order-manage" exact component={AdminOrderManage} />
            <AdminRoute path="/admin/order-history" component={AdminOrderHistory} />
            <Redirect from="*" to="/" />
          </Switch>
        </Suspense>
        <GlobalWs />
        <Footer />
      </>
    </Router>
  );
};

export default RootRouter;
