/* eslint-disable no-param-reassign */

export const openPopup = (dom) => {
  dom.style.display = 'flex';
  dom.style.pointerEvents = 'all';
};
export const closePopup = (e, dom) => {
  e.preventDefault();
  dom.style.display = 'none';
  dom.style.pointerEvents = 'none';
};
