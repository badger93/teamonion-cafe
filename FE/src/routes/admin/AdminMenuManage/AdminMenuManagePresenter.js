import React, { useState, useCallback } from 'react';
import propTypes from 'prop-types';
import AdminMenuListItem from '../../../components/AdminMenuListItem';
import MenuManagePopup from '../../../components/MenuManagePopup';

const AdminMenuManagePresenter = ({
  menuList, deleteItem, updateItem, createItem,
}) => {
  const [menuPopupData, setMenuPopupData] = useState({});
  const mapMenuList = menuList.map((item, index) => (
    <AdminMenuListItem
      key={index}
      list={item}
      deleteItem={deleteItem}
      updateMenuList={updateItem}
      setMenuPopupData={setMenuPopupData}
    />
  ));
  return (
    <div className="AdminMenuManagePresenter">
      <div>AdminMenuManage</div>
      <input
        className="createBtn"
        type="button"
        value="추가"
        onClick={() => setMenuPopupData({})}
      />
      <div className="menuList">
        {mapMenuList}
      </div>
      <div className="MenuManagePopupContainer">
        <MenuManagePopup
          menuPopupData={menuPopupData}
          updateItem={updateItem}
          createItem={createItem}
        />
      </div>
    </div>
  );
};

AdminMenuManagePresenter.defaultProps = {
  menuList: [],
  deleteItem: () => {},
  updateItem: () => {},
  createItem: () => {},
};

AdminMenuManagePresenter.propTypes = {
  menuList: propTypes.arrayOf(propTypes.object),
  deleteItem: propTypes.func,
  updateItem: propTypes.func,
  createItem: propTypes.func,
};

export default AdminMenuManagePresenter;
