import React from 'react';
import { Link } from 'react-router-dom';
import tmonglogo from '../image/tmonglogo.png';
import '../styles/PcHeader.scss';

const PcHeader = ({ isLogined, isAdmin, user }) => {
  return (
    <div className="header_pc">
      <div className="header_pc-wrap">
        <div className="header_pc-logo">
          <img src={tmonglogo} alt="logo" />
          {isAdmin ? <Link to="/admin/order-manage" /> : <Link to="/" />}
        </div>
        <div className="header_pc-column">
          <div className="header_pc-column-top">
            <span className="header_pc-welcome">{`반갑습니다 ${
              user.id
            }님`}</span>
            <span className="divider">|</span>
            {isLogined ? (
              <Link to="/logout">LogOut</Link>
            ) : (
              <>
                <Link to="/signin">Log In</Link>
                <span className="divider">|</span>
                <Link to="/signup">Sign Up</Link>
              </>
            )}
          </div>

          <div className="header_pc-column-bottom">
            {isAdmin ? (
              <>
                <Link to="/admin/order-manage">주문현황</Link>
                <Link to="/admin/menu-manage">메뉴관리</Link>
                <Link to="/admin/order-history">주문히스토리</Link>
                <Link to="/admin/member-manage">사용자관리</Link>
              </>
            ) : (
              <>
                <Link to="/">Menu</Link>
                <Link to="/myorder">MyOrder</Link>
                <Link to="/user-info">MyPage</Link>
                <Link to="/cart">Cart</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PcHeader;
