import React, { useState, useEffect, useCallback, useRef } from 'react';
import propTypes from 'prop-types';
import '../styles/MenuManagePopup.scss';
import inputImgPreview from '../utils/inputImgPreview';

const MenuManagePopup = ({ menuPopupData, updateItem, createItem, setIsPopup }) => {
  const { id, name, price, information } = menuPopupData;
  const [popupName, setPopupName] = useState('');
  const [popupPrice, setPopupPrice] = useState('');
  const [popupInformation, setPopupInformation] = useState('');
  const [popupFile, setPopupFile] = useState('');
  const isEdit = Object.keys(menuPopupData).length > 1;
  const inputImgRef = useRef(null); // 인풋 미리보기 img 태그
  const fileInputRef = useRef(null); // 파일 input 태그

  const onSubmitCallback = useCallback(
    e => {
      e.preventDefault();
      if (popupName && popupPrice && popupInformation && popupFile) {
        const payload = {
          name: popupName,
          price: popupPrice,
          information: popupInformation,
          imageFile: inputImgRef.current.getAttribute('src'),
        };
        const formFile = fileInputRef;
        if (isEdit) {
          updateItem({ ...payload, id });
          setIsPopup(false);
        } else {
          createItem(payload);
          setIsPopup(false);
        }
      } else {
        alert('내용을 마저 채워주세요');
      }
    },
    [popupName, popupPrice, popupInformation, popupFile],
  );

  useEffect(() => {
    if (isEdit) {
      // 수정모드
      setPopupName(name);
      setPopupPrice(price);
      setPopupInformation(information);
      setPopupFile('');
      inputImgRef.current.setAttribute('src', '');
    } else {
      // 추가모드
      setPopupName('');
      setPopupPrice('');
      setPopupInformation('');
      setPopupFile('');
      inputImgRef.current.setAttribute('src', ''); // 이미지 미리보기 초기화
    }
  }, [menuPopupData]);

  return (
    // name, price, information, imageFile(src)
    <div className="MenuManagePopup">
      <input
        type="button"
        value="x"
        className="closeBtn"
        onClick={() => {
          setIsPopup(false);
        }}
      />
      <h1>{isEdit ? '수정' : '추가'}</h1>
      <form
        encType="multipart/form-data"
        className="MenuManageForm"
        onSubmit={e => onSubmitCallback(e)} // 폼 서브밋
      >
        <div className="nameArea inputArea">
          <div className="areaTitle">상품명</div>
          <input
            type="text"
            value={popupName}
            onChange={e => setPopupName(e.target.value)}
            className="nameInput"
          />
        </div>
        <div className="priceArea inputArea">
          <div className="areaTitle">가격</div>
          <input
            type="text"
            value={popupPrice}
            onChange={e => setPopupPrice(e.target.value)}
            className="priceInput"
          />
        </div>
        <div className="informationArea inputArea">
          <div className="areaTitle">설명</div>
          <textarea
            value={popupInformation}
            onChange={e => setPopupInformation(e.target.value)}
            className="informationInput"
          />
        </div>
        <div className="imgInputArea inputArea">
          <div className="areaTitle">이미지</div>
          <input
            type="file"
            value={popupFile}
            className="fileInput"
            ref={fileInputRef}
            onChange={e => {
              console.dir(e.target.files);
              inputImgPreview(fileInputRef.current, inputImgRef.current);
              setPopupFile(e.target.value);
            }}
          />
          <div className="previewImgWrap">
            <img src="" alt="" ref={inputImgRef} className="imgInput" />
          </div>
          <input type="submit" value="저  장" className="submitPopup" />
        </div>
      </form>
    </div>
  );
};

MenuManagePopup.defaultProps = {
  menuPopupData: {},
  updateItem: () => {},
  createItem: () => {},
  setIsPopup: () => {},
};

MenuManagePopup.propTypes = {
  menuPopupData: propTypes.objectOf(propTypes.oneOfType([propTypes.string, propTypes.number])),
  updateItem: propTypes.func,
  createItem: propTypes.func,
  setIsPopup: propTypes.func,
};

export default MenuManagePopup;
