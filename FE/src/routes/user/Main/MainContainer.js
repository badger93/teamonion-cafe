import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MainPresenter from './MainPresenter';

const MainContainer = () => {
  const [storeList, setStoreList] = useState([]);

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
  return <MainPresenter list={storeList} />;
};

export default MainContainer;
