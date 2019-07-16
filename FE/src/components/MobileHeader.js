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
        <Link to="/" />
      </div>
      <div className="header_mobile-column">
        <Link to="/user-info">
          <FontAwesomeIcon icon={faUser} />
        </Link>
        <Link to="/myorder">
          <FontAwesomeIcon icon={faCoffee} />
        </Link>
        <button className="mobile-list">
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
    </div>
  );
};

export default MobileHeader;
