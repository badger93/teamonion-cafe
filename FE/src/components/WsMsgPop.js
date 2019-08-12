import React, { useEffect } from 'react';
import '../styles/WsMsgPop.scss';
import { Link } from 'react-router-dom';
import { isArray } from 'util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const WsMsgPop = ({ setIsPopup, popMsg }) => {
  const { menuNameList } = popMsg;
  const isAdd =
    popMsg.hasOwnProperty('createdDate') ||
    popMsg.hasOwnProperty('amount') ||
    popMsg.hasOwnProperty('paymentType');
  const classification = isAdd ? '주문추가' : '제작완료';
  const linkUrl = isAdd ? '/admin/order-manage' : '/myorder';
  let quantity;
  let itemTitle;
  if (isArray(menuNameList)) {
    quantity = menuNameList.length - 1;
    itemTitle = menuNameList[0];
  } else {
    quantity = 0;
    itemTitle = menuNameList;
  }

  useEffect(() => {
    const popupTimer = setTimeout(() => {
      setIsPopup(false);
    }, 3000);
    return () => {
      clearTimeout(popupTimer);
    };
  });

  return (
    <div className="wsMsgPop">
      <div className="popHead">
        <FontAwesomeIcon
          className="closeBtn"
          onClick={() => setIsPopup(false)}
          icon={faTimes}
          size="lg"
        />
      </div>
      <Link to={linkUrl}>
        <div className="popBody">
          {quantity < 1 ? (
            <p>
              {itemTitle} <br />
              <span>{classification}</span> 되었습니다.
            </p>
          ) : (
            <p>
              {itemTitle} 외 {quantity}개 <br />
              <span>{classification}</span> 되었습니다.
            </p>
          )}
        </div>
      </Link>
    </div>
  );
};

export default WsMsgPop;
