export const openPopup = (dom) => {
  dom.style.display = 'block';
};
export const closePopup = (e, dom) => {
  e.preventDefault();
  dom.style.display = 'none';
};
