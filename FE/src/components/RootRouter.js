import React from 'react';
import {
  Route,
  Redirect,
  Switch,
  BrowserRouter as Router,
} from 'react-router-dom';
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

const RootRouter = () => (
  <Router>
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/cart" exact component={Cart} />
        <Route path="/myorder" exact component={MyOrder} />
        <Route path="/payment" exact component={Payment} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/user-info" exact component={UserInfo} />
        <Route
          path="/admin/member-manage"
          exact
          component={AdminMemberManage}
        />
        <Route path="/admin/menu-manage" exact component={AdminMenuManage} />
        <Route path="/admin/order-manage" exact component={AdminOrderManage} />
        <Route
          path="/admin/order-history"
          exact
          component={AdminOrderHistory}
        />
        <Route
          path="/admin/order-history/payed-non"
          exact
          component={AdminOrderHistory}
        />
        <Route
          path="/admin/order-history/payed-ok"
          exact
          component={AdminOrderHistory}
        />
        <Route
          path="/admin/order-history/product-complete"
          exact
          component={AdminOrderHistory}
        />
        <Redirect from="*" to="/" />
      </Switch>
    </>
  </Router>
);

export default RootRouter;
