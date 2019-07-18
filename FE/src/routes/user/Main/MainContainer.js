import React, { useState, useEffect } from 'react';
import MainPresenter from './MainPresenter';
import { getMenuList } from '../../../api/menuApi';

const MainContainer = () => {
  const [storeList, setStoreList] = useState([]);
  const [menuDetailData, setMenuDetailData] = useState({});

  // 상품상세 레이어 팝업에 데이터를 전달하기 위한 콜백
  const mapDetailData = (data) => {
    setMenuDetailData(data);
    console.log(menuDetailData);
  };

  // 최초 리스트 불러오기
  useEffect(() => {
    getMenuList(setStoreList);
  }, []);

  return (
    <MainPresenter
      list={storeList}
      menuDetailData={menuDetailData}
      mapDetailData={mapDetailData}
    />
  );
};

export default MainContainer;
