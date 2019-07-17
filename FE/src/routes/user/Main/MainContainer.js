import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MainPresenter from './MainPresenter';

const MainContainer = () => {
  const [storeList, setStoreList] = useState([]);
  const [menuDetailData, setMenuDetailData] = useState({});

  const mapDetailData = (data) => {
    setMenuDetailData(data);
  };

  const getList = (callback) => {
    axios
      .get('https://my-json-server.typicode.com/badger012/mockserver/menus')
      .then((res) => {
        callback(res.data.menu);
      })
      .catch(err => alert('상품로드 실패', err));
  };

  useEffect(() => {
    getList(setStoreList);
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
