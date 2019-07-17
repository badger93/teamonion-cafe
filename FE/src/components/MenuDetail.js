import React from 'react';
import propTypes from 'prop-types';

const MenuDetail = (props) => {
  const {
    menuDetailData: {},
  } = props;

  return (
    <>
      <div>{JSON.stringify(menuDetailData)}</div>
      <div className="menuDetail">
        <aside>
          <div className="img-area">
            <img src="/" />
          </div>
        </aside>
        <main className="main">
          <div className="title" />
          <div className="price" />
          <div className="information" />
          <div className="btnArea" />
        </main>
      </div>
    </>
  );
};

MenuDetail.defaultProps = {
  menuDetailData: {},
};

MenuDetail.propTypes = {
  menuDetailData: propTypes.objectOf(),
};

export default MenuDetail;
