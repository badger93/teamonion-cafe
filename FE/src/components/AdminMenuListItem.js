import React from 'react';
import propTypes from 'prop-types';
import '../styles/AdminMenuListItem.scss';

const AdminMenuListItem = ({ list, deleteItem, setMenuPopupData }) => {
  const {
    id, name, price, information, imageFile,
  } = list;
  return (
    <div className="AdminMenuListItem">
      <div className="nameArea">{name}</div>
      <div className="priceArea">{price}</div>
      <div className="informationArea">{information}</div>
      <div className="imageFileArea">{imageFile}</div>
      <div className="btnArea">
        <input
          className="updateBtn"
          type="button"
          value="수정"
          onClick={() => setMenuPopupData({ ...list, imageFile: '' })}
        />
        <input
          className="deleteBtn"
          type="button"
          value="삭제"
          onClick={() => {
            deleteItem(id);
          }}
        />
      </div>
    </div>
  );
};

AdminMenuListItem.defaultProps = {
  list: [],
  deleteItem: () => {},
  setMenuPopupData: () => {},

};

AdminMenuListItem.propTypes = {
  list: propTypes.arrayOf(propTypes.string),
  deleteItem: propTypes.func,
  setMenuPopupData: propTypes.func,
};

export default AdminMenuListItem;
