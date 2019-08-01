const changePath = 'http://teamonion-idev.tmon.co.kr/menuImage/';

const changeImagePath = content => {
  return content.map(item => {
    const newItem = { ...item, imagePath: `${changePath}${item.imagePath}` };
    return newItem;
  });
};
export default changeImagePath;
