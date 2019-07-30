import React from 'react';
import '../styles/PayListItem.scss';
import propTypes from 'prop-types';

const PayListItem = ({ menuName = 'none', menuPrice = 0 }) => (
  <div className="payform-list-item">
    <div className="pay-item-column" />
    <div className="pay-item-column">{`${menuName}`}</div>
    <div className="pay-item-column">
      <div>{`${menuPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원`}</div>
    </div>
    <div className="pay-item-column" />
  </div>
);

PayListItem.propTypes = {
  menuName: propTypes.string,
  menuPrice: propTypes.number,
};

export default PayListItem;
