import React, { useState, useEffect, useRef } from 'react';
import propTypes from 'prop-types';
import '../styles/MenuManagePopup.scss';
import inputImgPreview from '../utils/inputImgPreview';

const MenuManagePopup = ({ menuPopupData, updateItem, createItem }) => {
  const {
    id, name, price, information, imageFile,
  } = menuPopupData;
  const [popupName, setPopupName] = useState('');
  const [popupPrice, setPopupPrice] = useState('');
  const [popupInformation, setPopupInformation] = useState('');
  const [popupFile, setPopupFile] = useState('');
  const isEdit = Object.keys(menuPopupData).length > 1;
  const inputImgRef = useRef(null); // 인풋 미리보기 이미지 태그
  const fileInputRef = useRef(null); // 인풋 파일 태그

  useEffect(() => {
    if (isEdit) {
      setPopupName(name);
      setPopupPrice(price);
      setPopupInformation(information);
      setPopupFile(imageFile);
    } else {
      setPopupName('');
      setPopupPrice('');
      setPopupInformation('');
      setPopupFile('');
    }
  }, [menuPopupData]);

  return ( // name, price, information, imageFile(src)
    <div className="MenuManagePopup">
      <form
        encType="multipart/form-data"
        className="MenuManageForm"
        onSubmit={(e) => {
          e.preventDefault();
          const payload = {
            name: popupName, price: popupPrice, information: popupInformation, imageFile: popupFile,
          };
          if (isEdit) {
            updateItem(id, payload);
          } else {
            createItem(payload);
          }
        }}
      >
        <input type="text" value={popupName} onChange={e => setPopupName(e.target.value)} className="nameInput" />
        <input type="text" value={popupPrice} onChange={e => setPopupPrice(e.target.value)} className="price" />
        <input type="text" value={popupInformation} onChange={e => setPopupInformation(e.target.value)} className="information" />
        <img src="" alt="" ref={inputImgRef} />
        <input
          type="file"
          value={popupFile}
          className="fileInput"
          ref={fileInputRef}
          onChange={(e) => {
            inputImgPreview(fileInputRef.current, inputImgRef.current);
            setPopupFile(e.target.value);
          }}
        />
        <input type="submit" className="submitPopup" />
      </form>
    </div>
  );
};

MenuManagePopup.defaultProps = {
  menuPopupData: {},
  updateItem: () => {},
  createItem: () => {},
};

MenuManagePopup.propTypes = {
  menuPopupData: propTypes.objectOf(propTypes.string),
  updateItem: propTypes.func,
  createItem: propTypes.func,
};

export default MenuManagePopup;
