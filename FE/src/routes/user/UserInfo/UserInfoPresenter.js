import React from 'react';
import propTypes from 'prop-types';
import UserInfoCard from '../../../components/UserInfoCard';

import './styles/UserInfoPresenter.scss';
import MyHistory from '../../../components/MyHistory';

const UserInfoPresenter = ({ id, point, columns, rows }) => (
  <div className="userinfo_section">
    <div className="userinfo_wrapper">
      <div className="userinfo_title_myinfo">내 정보</div>
      <UserInfoCard id={id} point={point} />
      <div className="userinfo_title_history">주문 히스토리</div>
      <div className="myhistory-container">
        <MyHistory columns={columns} rows={rows} />
      </div>
    </div>
  </div>
);

UserInfoPresenter.propTypes = {
  id: propTypes.string.isRequired,
  point: propTypes.number.isRequired,
  columns: propTypes.array.isRequired,
  rows: propTypes.array.isRequired,
};

export default UserInfoPresenter;
