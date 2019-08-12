import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';

// 리덕스
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import App from './components/App';
import reducers from './redux/reducers';

import rootSaga from './redux/saga';

const sagaMiddleware = createSagaMiddleware(); // 사가만들고

const middlewares = [sagaMiddleware];
const enhancer = compose(
  applyMiddleware(...middlewares),
  // typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__
  //   ? window.__REDUX_DEVTOOLS_EXTENSION__() // 리덕스 데브툴즈이용
  //   : f => f, // 배포시는 빼야한다
);
// compose는 미들웨어 합성

const store = createStore(reducers, enhancer);

sagaMiddleware.run(rootSaga); // 미들웨어 장착후 가능, 루트사가 등록필요

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById('root'),
);
