import React, { memo } from 'react';
import MenuListItem from './MenuListItem';

const MenuListItems = ({ list, mapDetailData, setIsMenuPopup }) => {
  return (
    <div>
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

const MemoizedMenuListItems = memo(MenuListItems, (prevProps, nextProps) => {
  console.dir(prevProps);
  console.dir(nextProps);
  console.log(Object.is(prevProps.list, nextProps.list));
  console.log(prevProps.list == nextProps.list);
  return Object.is(prevProps.list, nextProps.list);
});

export default MemoizedMenuListItems;
