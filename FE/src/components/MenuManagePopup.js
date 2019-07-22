import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import '../styles/MenuManagePopup.scss';

const MenuManagePopup = ({ menuPopupData, updateItem, createItem }) => {
  const {
    id, name, price, information, imageFile,
  } = menuPopupData;
  const [popupName, setPopupName] = useState('');
  const [popupPrice, setPopupPrice] = useState('');
  const [popupInformation, setPopupInformation] = useState('');
  const [popupFile, setPopupFile] = useState('');

  useEffect(() => {
    setPopupName(name);
    setPopupPrice(price);
    setPopupInformation(information);
    setPopupFile(imageFile);
  }, [name, price, information, imageFile]);

  return ( // name, price, information, imageFile(src)
    <div className="MenuManagePopup">
      <form
        className="MenuManageForm"
        onSubmit={(e) => {
          e.preventDefault();
          const payload = {
            name: popupName, price: popupPrice, information: popupInformation, imageFile: popupFile,
          };
          if (Object.keys(menuPopupData).length > 1) {
            updateItem(id, payload);
          } else {
            createItem(payload);
          }
        }}
      >
        <input type="text" value={popupName} onChange={e => setPopupName(e.target.value)} className="nameInput" />
        <input type="text" value={popupPrice} onChange={e => setPopupPrice(e.target.value)} className="price" />
        <input type="text" value={popupInformation} onChange={e => setPopupInformation(e.target.value)} className="information" />
        <input type="file" value={popupFile} className="fileInput" onChange={e => setPopupFile(e.target.value)} multiple />
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
