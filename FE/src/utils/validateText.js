// 특수문자있는지 체크
export const isSpecial = str => {
  const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/gi;
  return reg.test(str);
};

// 문자 좌우 공백 제거
export const trimStr = str => {
  return str.replace(/^\s+|\s+$/g, '');
};
