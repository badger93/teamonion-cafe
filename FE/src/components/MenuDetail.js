import React, { useRef } from 'react';
import propTypes from 'prop-types';
import '../styles/MenuDetail.scss';

const MenuDetail = (props) => {
  const {
    menuDetailData: {
 name, price, information, imagePath 
},
  } = props;
  const closeBtn = useRef(null);

  // 팝업 닫기버튼 클릭
  const popupClose = () => {
    closeBtn.current.style.display = 'none';
  };

  return (
    <>
      <div className="menuDetail" ref={closeBtn}>
        <aside>
          <div className="img-area">
            <img src={imagePath} alt="제품이미지" />
          </div>
        </aside>
        <main className="main">
          <input
            className="closeBtn"
            type="button"
            value="X"
            onClick={() => popupClose()}
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
