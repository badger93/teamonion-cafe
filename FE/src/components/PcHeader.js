import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import '../styles/PcHeader.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRedo,
} from '@fortawesome/free-solid-svg-icons';
import tmonglogo from '../image/tmonglogo.png';


const PcHeader = ({
  isSignedIn, user, logOutDispatch, setIsLoginPopup, onRefreshClick,
}) => (
  <div className="header_pc">
    <div className="header_pc-wrap">
      <div className="header_pc-logo">
        <img src={tmonglogo} alt="logo" />
        {user.memberRole === 'ADMIN' ? <Link to="/admin/order-manage" /> : <Link to="/" />}
      </div>
      <div className="header_pc-column">
        <div className="header_pc-column-top">

          {isSignedIn ? (
            <>
              <span className="header_pc-point">{`보유포인트 : ${user.point}`}</span>
              <span className="header_pc-refresh" onClick={onRefreshClick}><FontAwesomeIcon icon={faRedo} /></span>
              <span className="divider">|</span>
              <span className="header_pc-welcome">{`반갑습니다 ${user.memberId}님`}</span>
              <span className="divider">|</span>
              <div
                className="header_pc-logout"
                onClick={logOutDispatch}
              >
            LogOut
              </div>
            </>
          ) : (
            <>
              <div />
              <div
                className="signInBtn"
                onClick={() => setIsLoginPopup(true)}
              >

            Log In
              </div>
              <span className="divider">|</span>
              <Link to="/signup">Sign Up</Link>
            </>
          )}
        </div>

        <div className="header_pc-column-bottom">
          {user.memberRole === 'ADMIN' ? (
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


PcHeader.defaultProptypes = {
  isAdmin: false,
  isLogined: false,
  user: {},
  lsetIsLoginPopup: () => {},
};

PcHeader.propTypes = {
  isSignedIn: propTypes.bool.isRequired,
  user: propTypes.shape({
    id: propTypes.number.isRequired,
    memberId: propTypes.string.isRequired,
    memberRole: propTypes.string.isRequired,
    point: propTypes.number.isRequired,
    jwt: propTypes.string.isRequired,
  }).isRequired,
  setIsLoginPopup: propTypes.func.isRequired,
  logOutDispatch: propTypes.func.isRequired,
  onRefreshClick: propTypes.func.isRequired,
};

export default PcHeader;
