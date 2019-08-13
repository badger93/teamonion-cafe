import React, { useState, useEffect, useCallback, useRef } from 'react';
import propTypes from 'prop-types';
import '../styles/MenuManagePopup.scss';
import inputImgPreview from '../../../../utils/inputImgPreview';

const MenuManagePopup = ({ menuPopupData, updateItem, createItem, setIsPopup }) => {
  const { id, name, price, information, imageFile } = menuPopupData;
  const [popupName, setPopupName] = useState('');
  const [popupPrice, setPopupPrice] = useState('');
  const [popupInformation, setPopupInformation] = useState('');
  const [popupFile, setPopupFile] = useState(null);
  const isEdit = Object.keys(menuPopupData).length > 1;
  const inputImgRef = useRef(null); // 인풋 미리보기 img 태그
  const fileInputRef = useRef(null); // 파일 input 태그

  // 특수문자있는지 체크
  const isSpecial = str => {
    const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/gi;
    return reg.test(str);
  };

  // 문자 좌우 공백 제거
  const trimStr = str => {
    return str.replace(/^\s+|\s+$/g, '');
  };

  // 제출버튼 callback
  const onSubmitCallback = useCallback(
    e => {
      e.preventDefault();
      if (popupName && popupPrice && popupInformation) {
        // 서버와 통신하지 않고 이미지를 바로 리스트에 올리기 위한 fakeImg 지정
        const fakeImg = inputImgRef.current.getAttribute('src');
        const trimedName = trimStr(popupName);
        const trimedPrice = `${parseInt(popupPrice)}`;

        // 상품명엔 특수문자 포함 할 수 없음
        if (isSpecial(popupName)) {
          alert('제목에 특수문자를 포함 할 수 없습니다');
          return false;
        }

        // 폼데이터 담기 수정일때 / 추가일때
        const formData = new FormData();
        if (isEdit && !fileInputRef.current.files[0]) {
          formData.append('name', trimedName);
          formData.append('price', trimedPrice);
          formData.append('information', popupInformation);
        } else {
          formData.append('name', trimedName);
          formData.append('price', trimedPrice);
          formData.append('information', popupInformation);
          formData.append('imageFile', popupFile);
        }

        // 폼데이터 전송 수정일때 / 추가일때
        if (isEdit) {
          updateItem(formData, id, fakeImg);
          setIsPopup(false);
          alert(`${trimedName} 수정되었습니다`);
        } else {
          if (popupFile) {
            createItem(formData, fakeImg);
            setIsPopup(false);
            alert(`${trimedName} 추가되었습니다`);
          } else {
            alert('이미지를 넣어주세요');
          }
        }
      } else {
        alert('내용을 마저 채워주세요');
      }
    },
    [
      popupName,
      popupPrice,
      popupInformation,
      popupFile,
      createItem,
      id,
      isEdit,
      setIsPopup,
      updateItem,
    ],
  );

  // 팝업 내용을 초기화 해 줌
  useEffect(() => {
    if (isEdit) {
      // 수정모드 init
      setPopupName(name);
      setPopupPrice(String(price));
      setPopupInformation(information);
      setPopupFile(null);
      inputImgRef.current.setAttribute('src', imageFile);
    } else {
      // 추가모드 init
      setPopupName('');
      setPopupPrice('');
      setPopupInformation('');
      setPopupFile(null);
      inputImgRef.current.setAttribute('src', ''); // 이미지 미리보기 초기화
    }
  }, [menuPopupData, imageFile, information, isEdit, name, price]);

  // input file form에 들어간 이미지 validation
  const imgTypeValidate = obj => {
    const file_kind = obj.value.lastIndexOf('.');
    const file_name = obj.value.substring(file_kind + 1, obj.length);
    const file_type = file_name.toLowerCase();

    const check_file_type = ['jpg', 'gif', 'png', 'jpeg', 'bmp'];

    if (check_file_type.indexOf(file_type) == -1) {
      alert('이미지 파일만 선택할 수 있습니다.');
      return false;
    }
    return true;
  };

  return (
    // name, price, information, imageFile(src)
    <div className="MenuManagePopup" onClick={e => e.stopPropagation()}>
      <input
        type="button"
        value="x"
        className="closeBtn"
        onClick={() => {
          setIsPopup(false);
        }}
      />
      <h1>{isEdit ? '수정' : '추가'}</h1>
      <form
        encType="multipart/form-data"
        className="MenuManageForm"
        onSubmit={e => onSubmitCallback(e)} // 폼 서브밋
      >
        <div className="nameArea inputArea">
          <div className="areaTitle">상품명</div>
          <input
            type="text"
            value={popupName}
            onChange={e => setPopupName(e.target.value)}
            className="nameInput"
          />
        </div>
        <div className="priceArea inputArea">
          <div className="areaTitle">가격</div>
          <input
            type="number"
            value={popupPrice}
            onChange={e => setPopupPrice(e.target.value)}
            className="priceInput"
          />
        </div>
        <div className="informationArea inputArea">
          <div className="areaTitle">설명</div>
          <textarea
            value={popupInformation}
            onChange={e => setPopupInformation(e.target.value)}
            className="informationInput"
          />
        </div>
        <div className="imgInputArea inputArea">
          <div className="areaTitle">이미지</div>
          <input
            type="file"
            className="fileInput"
            ref={fileInputRef}
            accept="image/gif, image/jpeg, image/png"
            onChange={e => {
              if (!imgTypeValidate(e.target)) {
                e.target.files = undefined;
                e.target.value = '';
                return false;
              }
              inputImgPreview(fileInputRef.current, inputImgRef.current);
              setPopupFile(e.target.files[0]);
            }}
          />
          <div className="previewImgWrap">
            <img src="" alt="" ref={inputImgRef} className="imgInput" />
          </div>
          <input type="submit" value="저  장" className="submitPopup" />
        </div>
      </form>
    </div>
  );
};

MenuManagePopup.defaultProps = {
  menuPopupData: {},
  updateItem: () => {},
  createItem: () => {},
  setIsPopup: () => {},
};

MenuManagePopup.propTypes = {
  menuPopupData: propTypes.objectOf(propTypes.oneOfType([propTypes.string, propTypes.number])),
  updateItem: propTypes.func,
  createItem: propTypes.func,
  setIsPopup: propTypes.func,
};

export default MenuManagePopup;
