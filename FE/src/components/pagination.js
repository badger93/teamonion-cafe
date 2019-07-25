import '../styles/pagination.scss';
import React from 'react';

// page, totalPages 속성이 들어간 pageData, 페이지버튼 갯수, 버튼 온클릭콜백 (e)
const pagination = ({ page: currentPage, totalPages }, maxIndex, callback) => {
  const beforeShow = 3;
  const afterShow = maxIndex - beforeShow;
  const minIndex = 1;
  const pageNumArr = [];
  const startPage = currentPage - beforeShow;
  const endPage = currentPage + afterShow;
  const pageGoal = () => {
    if (totalPages < maxIndex) {
      return totalPages;
    }
    return endPage < maxIndex ? maxIndex : endPage;
  };
  let pageIndex = startPage < minIndex ? minIndex : startPage;
  for (pageIndex; pageIndex < pageGoal(); pageIndex += 1) {
    pageNumArr.push(pageIndex);
  }
  return pageNumArr.map((item) => (
    <input
      type="button"
      className={`paginationBtn ${
        item === Number(currentPage) ? 'active' : ''
      }`}
      key={`pagination-${item}`}
      value={item}
      onClick={(e) => {
        if (callback === undefined) {
          alert('페이지네이션 콜백 미지정');
        } else {
          callback(e);
        }
      }}
    />
  ));
};

export default pagination;
