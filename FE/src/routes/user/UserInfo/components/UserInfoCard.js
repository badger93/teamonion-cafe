import React from 'react';
import '../styles/UserInfoCard.scss';
import propTypes from 'prop-types';

const UserInfoCard = ({ id, point }) => {
  return (
    <div className="user-card_section">
      <div className="user-card_column user-card_title ">
        <div className="user-card_row">ID</div>
        <div className="user-card_row">Point</div>
      </div>
      <div className="user-card_column ">
        <div className="user-card_row">{`${id}`}</div>
        <div className="user-card_row">{`${point}`}</div>
      </div>
    </div>
  );
};

UserInfoCard.propTypes = {
  id: propTypes.string.isRequired,
  point: propTypes.number.isRequired,
};

export default UserInfoCard;
