import React from 'react';
import propTypes from 'prop-types';
import '../styles/MenuDetail.scss';
import { closePopup } from '../utils/popup';

const MenuDetail = ({ menuDetailData, detailRef }) => {
  const {
    name, price, information, imageFile,
  } = menuDetailData;

  return (
    <>
      <div className="menuDetail">
        <aside>
          <div className="img-area">
            <img src={imageFile} alt="제품이미지" />
          </div>
        </aside>
        <main className="main">
          <input
            className="closeBtn"
            type="button"
            value="X"
            onClick={e => closePopup(e, detailRef.current)}
          />
          <div className="titleArea">
            <div className="title">{name}</div>
          </div>
          <div className="informationArea">
            <div className="price">{`₩ ${price}`}</div>
            <div className="information">{information}</div>
          </div>
          <div className="btnArea">
            <input className="buyBtn" type="button" value="구매" />
            <input className="cartBtn" type="button" value="장바구니" />
          </div>
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
