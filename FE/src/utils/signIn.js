export const useLeaveAndDeleteLocalInfo = key => {
  const listener = event => {
    event.preventDefault();
    event.returnValue = ''; // 애가있어야지 크롬에서 작동이됨
    localStorage.removeItem(key);
  };

  const deleteLocalStorage = () => window.addEventListener('beforeunload', listener);
  //beforeunload 이벤트는 윈도우가 닫히기 전에 함수실행시킨다
  // const disablePrevent = () => window.removeEventListener('beforeunload', listener);

  return { deleteLocalStorage };
};
