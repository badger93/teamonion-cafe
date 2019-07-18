export const openPopup = (dom) => {
  console.log('openpopup');
  dom.style.display = 'block';
};
export const closePopup = (e, dom) => {
  e.preventDefault();
  dom.style.display = 'none';
};
