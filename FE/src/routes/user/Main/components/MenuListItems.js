import React, { memo } from 'react';
import MenuListItem from './MenuListItem';
import '../styles/MenuListItems.scss';
const MenuListItems = ({ list, mapDetailData, setIsMenuPopup }) => {
  return (
    <div className="menuListItems-wrapper">
      {list &&
        list.map((item, index) => (
          <MenuListItem
            key={`item-${index}`}
            item={item}
            mapDetailData={mapDetailData}
            setIsMenuPopup={setIsMenuPopup}
          />
        ))}
    </div>
  );
};

// memo를 이용해서 리덕스 변경시 리렌더 방지
const MemoizedMenuListItems = memo(MenuListItems, (prevProps, nextProps) => {
  return Object.is(prevProps.list, nextProps.list);
});

export default MemoizedMenuListItems;
