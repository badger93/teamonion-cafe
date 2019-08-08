import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import '../styles/PcHeader.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { signInPopupChangeAction } from '../redux/actions/userAction';
import tmonglogo from '../image/tmonglogo.png';

const PcHeader = ({ isSignedIn, user = null, logOutDispatch, onRefreshClick }) => {
  const dispatch = useDispatch();

  const popupControl = useCallback(() => {
    dispatch(signInPopupChangeAction());
  }, [dispatch]);

  return (
    <div className="header_pc">
      <div className="header_pc-wrap">
        <div className="header_pc-logo">
          <img src={tmonglogo} alt="logo" />
          <Link to="/" />
        </div>
        <div className="header_pc-column">
          <div className="header_pc-column-top">
            {isSignedIn ? (
              <>
                <span className="header_pc-point">{`보유포인트 : ${user.point
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}</span>
                <span className="header_pc-refresh" onClick={onRefreshClick}>
                  <FontAwesomeIcon icon={faRedo} />
                </span>
                <span className="divider">|</span>
                <span className="header_pc-welcome">{`반갑습니다 ${user.memberId}님`}</span>
                <span className="divider">|</span>
                <div className="header_pc-logout" onClick={logOutDispatch}>
                  LogOut
                </div>
              </>
            ) : (
              <>
                <div />
                <div className="signInBtn" onClick={() => popupControl()}>
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
                <Link to="/admin/order-history?category=ALL">주문히스토리</Link>
                <Link to="/admin/menu-manage">메뉴관리</Link>
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

PcHeader.defaultProptypes = {
  isAdmin: false,
  isLogined: false,
  user: {},
  lsetIsLoginPopup: () => {},
};

PcHeader.propTypes = {
  isSignedIn: propTypes.bool.isRequired,
  user: propTypes.shape({
    id: propTypes.number,
    memberId: propTypes.string,
    memberRole: propTypes.string,
    point: propTypes.number,
    jwt: propTypes.string,
  }),
  logOutDispatch: propTypes.func.isRequired,
  onRefreshClick: propTypes.func.isRequired,
};

export default PcHeader;
