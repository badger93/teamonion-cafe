import React, { useState, useEffect } from 'react';
import MainPresenter from './MainPresenter';
import { getMenuList, searchMenu } from '../../../api/menuApi';

const MainContainer = () => {
  const [storeList, setStoreList] = useState([]);
  const [menuDetailData, setMenuDetailData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [menuPageData, setMenuPageData] = useState([]);
  const [searchText, setSearchText] = useState('');

  // 상품상세 레이어 팝업에 데이터를 전달하기 위한 콜백
  const mapDetailData = data => {
    setMenuDetailData(data);
  };

  const searchMenuListByName = async (menuName, page = 0, itemSize = 20) => {
    try {
      const res = await searchMenu(menuName, page, itemSize);
      const { content, totalPages } = res.data;
      setStoreList(content);
      setMenuPageData({ page, totalPages });
      setIsLoading(false);
      setSearchText(menuName);
    } catch (err) {
      alert(`메뉴검색 실패 : ${err}`);
    }
  };

  const getMenuByPage = async ({ itemSize, page }) => {
    try {
      const res = await getMenuList({ itemSize, page });
      const { content, totalPages } = res.data;
      setStoreList(content);
      setMenuPageData({ page, totalPages });
      setIsLoading(false);
    } catch (err) {
      alert('상품로드 실패', err);
    }
  };

  useEffect(() => {
    getMenuByPage({ itemSize: 20, page: 0 });
  }, []);

  return (
    <MainPresenter
      isLoading={isLoading}
      list={storeList}
      menuDetailData={menuDetailData}
      mapDetailData={mapDetailData}
      searchMenuListByName={searchMenuListByName}
      menuPageData={menuPageData}
      getMenuByPage={getMenuByPage}
      searchText={isSearch}
    />
  );
};

export default MainContainer;
