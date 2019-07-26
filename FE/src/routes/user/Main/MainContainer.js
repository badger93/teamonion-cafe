import React, { useState, useEffect } from 'react';
import MainPresenter from './MainPresenter';
import { getMenuList } from '../../../api/menuApi';

const MainContainer = () => {
  const [storeList, setStoreList] = useState([]);
  const [menuDetailData, setMenuDetailData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // 상품상세 레이어 팝업에 데이터를 전달하기 위한 콜백
  const mapDetailData = data => {
    setMenuDetailData(data);
  };

  useEffect(() => {
    const getAllMenu = async () => {
      try {
        const res = await getMenuList();
        setStoreList(res.data.content);
        setIsLoading(false);
      } catch (err) {
        alert('상품로드 실패', err);
        setStoreList([]);
      }
    };
    getAllMenu();
  }, []);

  return (
    <MainPresenter
      isLoading={isLoading}
      list={storeList}
      menuDetailData={menuDetailData}
      mapDetailData={mapDetailData}
    />
  );
};

export default MainContainer;
