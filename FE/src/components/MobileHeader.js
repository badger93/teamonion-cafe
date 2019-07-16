import React from 'react';
import '../styles/MobileHeader.scss';
import { Link } from 'react-router-dom';
import tmonglogo from '../image/tmonglogo.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCoffee, faBars } from '@fortawesome/free-solid-svg-icons';

const MobileHeader = () => {
  const isAdmin = true;

  return (
    <div className="header_mobile-wrap">
      <div className="header_mobile-logo">
        <img src={tmonglogo} alt="logo" />
        {isAdmin ? <Link to="/admin/order-manage" /> : <Link to="/" />}
      </div>
      <div className="header_mobile-column">
        {isAdmin ? (
          <>
            <Link to="/admin/order-manage">주문현황</Link>
            <Link to="/admin/menu-manage">메뉴관리</Link>
            <Link to="/admin/order-history">주문히스토리</Link>
            <Link to="/admin/member-manage">사용자관리</Link>
          </>
        ) : (
          <>
            <Link to="/user-info">
              <FontAwesomeIcon icon={faUser} size="2x" />
            </Link>
            <Link to="/myorder">
              <FontAwesomeIcon icon={faCoffee} size="2x" />
            </Link>
            <button className="mobile-list">
              <FontAwesomeIcon icon={faBars} size="2x" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MobileHeader;
