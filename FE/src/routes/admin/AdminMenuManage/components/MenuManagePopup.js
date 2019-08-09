import React, { useState, useEffect, useCallback, useRef } from 'react';
import propTypes from 'prop-types';
import '../styles/MenuManagePopup.scss';
import inputImgPreview from '../../../../utils/inputImgPreview';

const MenuManagePopup = ({ menuPopupData, updateItem, createItem, setIsPopup }) => {
  const { id, name, price, information, imageFile } = menuPopupData;
  const [popupName, setPopupName] = useState('');
  const [popupPrice, setPopupPrice] = useState('');
  const [popupInformation, setPopupInformation] = useState('');
  const [popupFile, setPopupFile] = useState(null);
  const isEdit = Object.keys(menuPopupData).length > 1;
  const inputImgRef = useRef(null); // 인풋 미리보기 img 태그
  const fileInputRef = useRef(null); // 파일 input 태그

  const onSubmitCallback = useCallback(
    e => {
      e.preventDefault();
      if (popupName && popupPrice && popupInformation) {
        const formData = new FormData();
        formData.append('name', popupName);
        formData.append('price', popupPrice);
        formData.append('information', popupInformation);
        if (!isEdit) formData.append('imageFile', popupFile);

        const fakeImg = inputImgRef.current.getAttribute('src');
        if (isEdit) {
          updateItem(formData, id, fakeImg);
          setIsPopup(false);
        } else {
          if (popupFile) {
            createItem(formData, fakeImg);
            setIsPopup(false);
          } else {
            alert('이미지를 넣어주세요');
          }
        }
      } else {
        alert('내용을 마저 채워주세요');
      }
    },
    [
      popupName,
      popupPrice,
      popupInformation,
      popupFile,
      createItem,
      id,
      isEdit,
      setIsPopup,
      updateItem,
    ],
  );

  useEffect(() => {
    if (isEdit) {
      // 수정모드 init
      setPopupName(name);
      setPopupPrice(price);
      setPopupInformation(information);
      setPopupFile(null);
      inputImgRef.current.setAttribute('src', imageFile);
    } else {
      // 추가모드 init
      setPopupName('');
      setPopupPrice('');
      setPopupInformation('');
      setPopupFile(null);
      inputImgRef.current.setAttribute('src', ''); // 이미지 미리보기 초기화
    }
  }, [menuPopupData, imageFile, information, isEdit, name, price]);

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
            type="number"
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
            className="fileInput"
            ref={fileInputRef}
            onChange={e => {
              inputImgPreview(fileInputRef.current, inputImgRef.current);
              setPopupFile(e.target.files[0]);
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
