import React, { useState, useRef } from 'react';
import propTypes from 'prop-types';
import ReactDataGrid from 'react-data-grid';
import { Formatters } from 'react-data-grid-addons';
import AdminMenuListItem from '../../../components/AdminMenuListItem';
import MenuManagePopup from '../../../components/MenuManagePopup';
import './styles/AdminMenuManagePresenter.scss';
import { openPopup } from '../../../utils/popup';

const AdminMenuManagePresenter = ({
  menuList, deleteItem, updateItem, createItem,
}) => {
  const [menuPopupData, setMenuPopupData] = useState({});
  const popupRef = useRef(null);

  const colums = [
    { key: 'id', name: 'ID' },
    { key: 'imageFile', name: '이미지', formatter: Formatters.ImageFormatter },
    { key: 'name', name: '상품명' },
    { key: 'price', name: '가격' },
    { key: 'information', name: '상세정보' },
    { key: 'option', name: '옵션' },
  ];

  const rows = menuList.map(item => ({
    id: item.id,
    imageFile: item.imageFile,
    name: item.name,
    price: item.price,
    information: item.information,
  }));

  const getCellActions = (column, row) => {
    const cellActions = {
      option: [
        {
          icon: <span className="gridBtn">수정</span>,
          callback: () => {
            setMenuPopupData({
              name: row.name,
              price: row.price,
              information: row.information,
            });
            openPopup(popupRef.current);
          },
        },
        {
          icon: <span className="gridBtn">삭제</span>,
          callback: () => {
            deleteItem(row.id);
          },
        },
      ],
    };
    return cellActions[column.key];
  };

  return (
    <div className="AdminMenuManagePresenter">
      <div className="pageTitle">메뉴관리</div>
      <div className="menuList">
        <input
          className="createBtn"
          type="button"
          value="추가"
          onClick={() => {
            setMenuPopupData({});
            openPopup(popupRef.current);
          }}
        />
        <ReactDataGrid
          className="menuGrid"
          columns={colums}
          rowGetter={i => rows[i]}
          rowsCount={rows.length}
          getCellActions={getCellActions}
        />
      </div>
      <div className="MenuManagePopupContainer" ref={popupRef}>
        <MenuManagePopup
          menuPopupData={menuPopupData}
          updateItem={updateItem}
          createItem={createItem}
          popupRef={popupRef}
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
