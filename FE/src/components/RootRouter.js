import React, { useCallback } from 'react';
import {
  Route,
  Redirect,
  Switch,
  BrowserRouter as Router,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signInPopupChangeAction } from '../redux/actions/userAction';
import Header from './Header';
import Cart from '../routes/user/Cart';
import Main from '../routes/user/Main';
import MyOrder from '../routes/user/MyOrder';
import Payment from '../routes/user/Payment';
import SignUp from '../routes/user/SignUp';
import UserInfo from '../routes/user/UserInfo';
import AdminMemberManage from '../routes/admin/AdminMemberManage';
import AdminMenuManage from '../routes/admin/AdminMenuManage';
import AdminOrderManage from '../routes/admin/AdminOrderManage';
import AdminOrderHistory from '../routes/admin/AdminOrderHistory';

const RootRouter = () => {
  const { isSignedIn, me } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const popupControl = useCallback(() => {
    dispatch(signInPopupChangeAction());
  }, [dispatch]);

  const SignInRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) => {
        if (isSignedIn === true) {
          return <Component {...props} />;
        }
        setTimeout(() => popupControl(), 1000);
        return <Redirect to="/" />;
      }}
    />
  );
  const AdminRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        me.memberRole === 'ADMIN' ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );

  return (
    <Router>
      <>
        <Header />
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/cart" exact component={Cart} />
          <Route path="/signup" exact component={SignUp} />
          <SignInRoute path="/myorder" exact component={MyOrder} />
          <SignInRoute path="/payment" exact component={Payment} />
          <SignInRoute path="/user-info" exact component={UserInfo} />
          <AdminRoute
            path="/admin/member-manage"
            exact
            component={AdminMemberManage}
          />
          <AdminRoute
            path="/admin/menu-manage"
            exact
            component={AdminMenuManage}
          />
          <AdminRoute
            path="/admin/order-manage"
            exact
            component={AdminOrderManage}
          />
          <AdminRoute
            path="/admin/order-history"
            exact
            component={AdminOrderHistory}
          />
          <AdminRoute
            path="/admin/order-history/payed-non"
            exact
            component={AdminOrderHistory}
          />
          <AdminRoute
            path="/admin/order-history/payed-ok"
            exact
            component={AdminOrderHistory}
          />
          <AdminRoute
            path="/admin/order-history/product-complete"
            exact
            component={AdminOrderHistory}
          />
          <Redirect from="*" to="/" />
        </Switch>
      </>
    </Router>
  );
};

export default RootRouter;
