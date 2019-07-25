import React, { useState, useCallback } from 'react';
import propTypes from 'prop-types';
import ReactDataGrid from 'react-data-grid';
import './styles/AdminMemberManagePresenter.scss';
import pagination from '../../../components/pagination';

const AdminMemberManagePresenter = ({
  memberListData,
  memberListPageData,
  setPoint,
  getUserByPage,
  searchUserByID,
}) => {
  const [searchText, setSearchText] = useState('');
  const colums = [
    {
      key: 'id',
      name: 'id',
      width: 40,
    },
    {
      key: 'memberId',
      name: '사용자ID',
      width: 100,
      resizable: true,
    },
    {
      key: 'memberRole',
      name: '권한',
      width: 100,
    },
    {
      key: 'point',
      name: '포인트',
      editable: true,
      resizable: true,
    },
  ];

  const rows = memberListData.map(item => ({
    id: item.id,
    memberId: item.memberId,
    memberRole: item.memberRole,
    point: item.point,
  }));

  const onGridRowsUpdated = ({ toRow, updated }) => {
    const data = Object.assign({}, { id: rows[toRow].id, changePoint: updated.point });
    setPoint(data);
  };

  const submitCallback = useCallback(
    e => {
      e.preventDefault();
      searchUserByID(searchText);
    },
    [searchText],
  );

  return (
    <div className="AdminMemberManagePresenter">
      <div className="pageTitle">사용자관리</div>
      <div className="memberManageList">
        <form
          className="searchArea"
          onSubmit={e => {
            if (submitCallback !== undefined) {
              submitCallback(e);
            }
          }}
        >
          <input
            className="searchText"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            type="text"
            placeholder="사용자ID로 검색"
          />
          <input className="searchSubmit" value="검색" type="submit" />
        </form>
        <ReactDataGrid
          className="memberGrid"
          columns={colums}
          rowGetter={i => rows[i]}
          rowsCount={rows.length}
          onGridRowsUpdated={onGridRowsUpdated}
          enableCellSelect
        />
        <div className="paginationArea">
          {pagination(memberListPageData, 8, e => {
            getUserByPage({ itemSize: 10, page: e.target.value });
          })}
        </div>
      </div>
    </div>
  );
};

AdminMemberManagePresenter.defaultProps = {
  memberListData: [],
  memberListPageData: {},
  setPoint: () => {},
  getUserByPage: () => {},
  searchUserByID: () => {},
};

AdminMemberManagePresenter.propTypes = {
  memberListData: propTypes.arrayOf(),
  memberListPageData: propTypes.objectOf(),
  setPoint: propTypes.func,
  getUserByPage: propTypes.func,
  searchUserByID: propTypes.func,
};

export default AdminMemberManagePresenter;
