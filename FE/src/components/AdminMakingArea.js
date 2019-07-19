import React from 'react';
import AdminOrderListItem from './AdminOrderListItem';

const AdminMakingArea = ({ list, areaName }) => {
  const title = areaName === 'before' ? '제작중' : '제작완료';
  const mapListItem = list.map((item, index) => <AdminOrderListItem key={index} list={item} />);
  return (
    <div className={`${areaName}Making-area`}>
      <h2>{title}</h2>
      <div className="orderBoard">
        <div className="orderLists">
          {mapListItem}
        </div>
      </div>
    </div>
  );
};

export default AdminMakingArea;
