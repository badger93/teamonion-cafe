import React, { useState } from 'react';
import propTypes from 'prop-types';
import AdminMenuListItem from '../../../components/AdminMenuListItem';
import MenuManagePopup from '../../../components/MenuManagePopup';

const AdminMenuManagePresenter = ({ menuList, setMenuList }) => {
  const [menuPopupData, setMenuPopupData] = useState({});
  const mapMenuList = menuList.map((item, index) => (
    <AdminMenuListItem
      key={index}
      list={item}
      setMenuList={setMenuList}
      setMenuPopupData={setMenuPopupData}
    />
  ));
  return (
    <div className="AdminMenuManagePresenter">
      <div>AdminMenuManage</div>
      <input className="createBtn" type="button" value="추가" />
      <div className="menuList">
        {mapMenuList}
      </div>
      <div className="MenuManagePopupContainer">
        <MenuManagePopup menuList />
      </div>
    </div>
  );
};

AdminMenuManagePresenter.defaultProps = {
  menuList: [],
  setMenuList: () => {},
};

AdminMenuManagePresenter.propTypes = {
  menuList: propTypes.arrayOf(propTypes.object),
  setMenuList: propTypes.func,
};

export default AdminMenuManagePresenter;
