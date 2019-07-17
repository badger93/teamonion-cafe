import React from 'react';
import propTypes from 'prop-types';
import UserInfoCard from '../../../components/UserInfoCard';
import '../../../styles/UserInfoPresenter.scss';
const UserInfoPresenter = ({ id, point }) => {
  return (
    <div className="userinfo_section">
      <div className="userinfo_wrapper">
        <div className="userinfo_title_myinfo">내 정보</div>
        <UserInfoCard id={id} point={point} />
        <div className="userinfo_title_history">주문 히스토리</div>
      </div>
    </div>
  );
};

UserInfoPresenter.propTypes = {
  id: propTypes.string.isRequired,
  point: propTypes.number.isRequired,
};

export default UserInfoPresenter;
