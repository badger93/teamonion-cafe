import React from 'react';
import '../styles/WsMsgPop.scss';

const WsMsgPop = ({ setIsPopup }) => {
  const menuNameList = ['아메리카노', '매실차', '레몬티', '자몽에이드', '밀크티'];
  const quantity = menuNameList.length - 1;
  const itemTitle = menuNameList[0];
  return (
    <div className="wsMsgPop">
      <div className="popHead">
        <input type="button" value="X" onClick={() => setIsPopup(false)} />
      </div>
      <div className="popBody">
        {quantity < 1 ? (
          <p>
            {itemTitle} <br />
            <span>제작완료</span> 되었습니다.
          </p>
        ) : (
          <p>
            {itemTitle} 외 {quantity}개 <br />
            <span>제작완료</span> 되었습니다.
          </p>
        )}
      </div>
    </div>
  );
};

export default WsMsgPop;
