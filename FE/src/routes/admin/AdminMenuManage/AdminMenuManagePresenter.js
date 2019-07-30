import React, { useState } from 'react';
import propTypes from 'prop-types';
import ReactDataGrid from 'react-data-grid';
import { Formatters } from 'react-data-grid-addons';
import MenuManagePopup from './components/MenuManagePopup';
import './styles/AdminMenuManagePresenter.scss';
import Pagination from '../../../components/pagination';

const AdminMenuManagePresenter = ({
  menuList,
  deleteItem,
  updateItem,
  createItem,
  pageData,
  getMenuBypage,
}) => {
  const [menuPopupData, setMenuPopupData] = useState({});
  const [isPopup, setIsPopup] = useState(false);

  const colums = [
    {
      key: 'id',
      name: 'ID',
      width: 70,
      resizable: true,
    },
    {
      key: 'imageFile',
      name: '이미지',
      formatter: Formatters.ImageFormatter,
      width: 50,
    },
    {
      key: 'name',
      name: '상품명',
      width: 140,
      resizable: true,
    },
    {
      key: 'price',
      name: '가격',
      width: 100,
      resizable: true,
    },
    {
      key: 'information',
      name: '상세정보',
      resizable: true,
    },
    {
      key: 'option',
      name: '옵션',
      width: 100,
    },
  ];

  const rows = menuList.map(item => ({
    id: item.id,
    imageFile: item.imagePath,
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
              id: row.id,
              name: row.name,
              price: row.price,
              information: row.information,
            });
            setIsPopup(true);
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
            setIsPopup(true);
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
      {isPopup && (
        <div className="MenuManagePopupContainer">
          <MenuManagePopup
            menuPopupData={menuPopupData}
            updateItem={updateItem}
            createItem={createItem}
            setIsPopup={setIsPopup}
          />
        </div>
      )}

      <Pagination
        pageData={pageData}
        callback={e => {
          getMenuBypage({ itemSize: 10, page: e.target.value - 1 });
        }}
      />
    </div>
  );
};

AdminMenuManagePresenter.defaultProps = {
  menuList: [],
  deleteItem: () => {},
  updateItem: () => {},
  createItem: () => {},
  getMenuBypage: () => {},
  pageData: {},
};

AdminMenuManagePresenter.propTypes = {
  menuList: propTypes.arrayOf(propTypes.object),
  deleteItem: propTypes.func,
  updateItem: propTypes.func,
  createItem: propTypes.func,
  getMenuBypage: propTypes.func,
  pageData: propTypes.objectOf,
};

export default AdminMenuManagePresenter;
