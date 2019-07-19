import React, { useRef, useState } from 'react';
import propTypes from 'prop-types';
import '../styles/MenuDetail.scss';
import { useLocalStorage } from '../utils/cart';

const MenuDetail = ({
  menuDetailData: {
    name, price, information, imagePath,
  },
}) => {
  const closeBtn = useRef(null);
  const { storedValue, setValue } = useLocalStorage('CART', []);
  const [isCart, setIsCart] = useState(false);

  // 장바구니 로컬스토리지 추가버튼
  const onClickCart = () => {
    // 가장 큰 Id 기준 으로 +1 되서 아이디 추가된다
    let bigCartId = 0;
    let newCartId = storedValue.length !== 0 ? storedValue.forEach((element) => {
      if (element.cartId >= bigCartId) {
        bigCartId = element.cartId + 1;
      }
    }) : 0;

    newCartId = bigCartId;

    setValue([...storedValue, { menuName: name, menuPrice: price, cartId: newCartId }]); // 로컬스토리지에 추가
    setIsCart(true);
    setTimeout(() => setIsCart(false), 800);
  };


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
          {isCart && <div className="cart-added">장바구니에 추가되었습니다!</div>}
          <div className="btnArea">
            <input className="buyBtn" type="button" value="구매" />
            <input className="cartBtn" type="button" onClick={onClickCart} value="장바구니" />
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
