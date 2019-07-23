import React, { useState } from 'react';
import propTypes from 'prop-types';
import { closePopup } from '../utils/popup';
import '../styles/MenuDetail.scss';
import { useLocalStorage } from '../utils/cart';

const MenuDetail = ({ menuDetailData, detailRef }) => {
  const {
    id, name, price, information, imageFile,
  } = menuDetailData;
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

    setValue([...storedValue, {
      id, menuName: name, menuPrice: price, cartId: newCartId,
    }]); // 로컬스토리지에 추가
    setIsCart(true);
    setTimeout(() => setIsCart(false), 800);
  };

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
  detailRef: {},
};

MenuDetail.propTypes = {
  menuDetailData: propTypes.objectOf(propTypes.string),
  detailRef: propTypes.objectOf(propTypes.instanceOf(Element)),
};

export default MenuDetail;
