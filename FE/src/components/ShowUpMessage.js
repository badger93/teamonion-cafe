import React from 'react';
import '../styles/ShowUpMessage.scss';
import propTypes from 'prop-types';

const ShowUpMessage = ({ isShowing, showupString }) => {
  return <div className="showup-message">{isShowing && showupString}</div>;
};

ShowUpMessage.propTypes = {
  isShowing: propTypes.bool,
  showupString: propTypes.string,
};
export default ShowUpMessage;
