import React from 'react';
import propTypes from 'prop-types';
import ReactDataGrid from 'react-data-grid';
import './styles/AdminMemberManagePresenter.scss';
import Pagination from '../../../components/Pagination';
import SearchBar from '../../../components/SearchBar';

const AdminMemberManagePresenter = ({
  memberListData,
  memberListPageData,
  setPoint,
  getUserByPage,
  searchUserByID,
}) => {
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

  return (
    <div className="AdminMemberManagePresenter">
      <SearchBar searchCallback={searchUserByID} />
      <div className="pageTitle">사용자관리</div>
      <div className="memberManageList">
        <ReactDataGrid
          className="memberGrid"
          columns={colums}
          rowGetter={i => rows[i]}
          rowsCount={rows.length}
          onGridRowsUpdated={onGridRowsUpdated}
          enableCellSelect
        />
        <Pagination
          pageData={memberListPageData}
          maxIndex={8}
          callback={e => {
            getUserByPage({ itemSize: 10, page: e.target.value - 1 });
          }}
        />
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
