import React, { useState } from 'react';
import propTypes from 'prop-types';
import tmony1st from '../../../../image/tmony1st.png';
import tmony2nd from '../../../../image/tmony2nd.png';
import tmony3rd from '../../../../image/tmony3rd.png';
import '../styles/UserRank.scss';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleDown, faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';

const UserRank = ({ ranking = [] }) => {
  const Time = moment().format('YYYY MMMM Do, h:mm a');

  const heightCalculateFunc = () => {
    //600을 기준으로 주문량에 따라 길이를 나눠주는 함수
    if (ranking.length > 2) {
      const countSum = ranking[0].count + ranking[1].count + ranking[2].count;
      const height0 = (600 * ranking[0].count) / countSum;
      const height1 = (600 * ranking[1].count) / countSum;
      const height2 = (600 * ranking[2].count) / countSum;
      return [height0, height1, height2];
    } else {
      return [200, 200, 200];
    }
  };

  const height = heightCalculateFunc();

  const medalValidator = number => {
    // 랭크따라 보이는 메달 다르게 하는 함수
    switch (number) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';

      default:
        return '';
    }
  };
  const rankNumSizeValidator = number => {
    // 랭크따라 글자크기 다르게 하는 함수
    switch (number) {
      case 1:
        return '2.3rem';
      case 2:
        return '1.8rem';
      case 3:
        return '1.5rem';

      default:
        return '';
    }
  };
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="mainPresenter-rank">
      <div className="mainPresenter-rank-header">
        <h1>티몽 중독 용의자 랭킹</h1>
        <div className="openBtn" onClick={() => setIsOpen(prev => !prev)}>
          {isOpen ? (
            <FontAwesomeIcon icon={faArrowAltCircleUp} />
          ) : (
            <FontAwesomeIcon icon={faArrowAltCircleDown} />
          )}
        </div>
      </div>
      {isOpen &&
        (ranking.length > 2 ? (
          <>
            <h2>실시간 랭킹</h2>
            <span className="time">{`${Time} 기준`}</span>
            <div className="mainPresenter-rank-wrapper">
              <div className="mainPresenter-rank-container">
                <div className="tmony-container mainPresenter-rank-secondPrize">
                  <div className="imgContainer">
                    <img
                      className="tmonyImg2"
                      src={tmony2nd}
                      alt="tmony2ndimg"
                      style={{ height: `${height[1]}px` }}
                    />
                  </div>
                  <div className="rank-title">
                    <span />
                    <span style={{ fontSize: `${rankNumSizeValidator(ranking[1].rank)}` }}>
                      {ranking[1].rank}{' '}
                    </span>
                    <span>위</span>
                  </div>
                  <div className="rank-id">
                    {medalValidator(ranking[1].rank)}
                    {ranking[1].memberId}
                  </div>
                  <div className="rank-amount">
                    <span>{`${ranking[1].count}`}</span>
                    <span> 건</span>
                  </div>
                </div>
                <div className="tmony-container mainPresenter-rank-firstPrize">
                  <div className="imgContainer">
                    <img
                      className="tmonyImg1"
                      src={tmony1st}
                      alt="tmony1stimg"
                      style={{ height: `${height[0]}px` }}
                    />
                  </div>
                  <div className="rank-title">
                    <span />
                    <span style={{ fontSize: `${rankNumSizeValidator(ranking[0].rank)}` }}>
                      {ranking[0].rank}{' '}
                    </span>
                    <span>위</span>
                  </div>
                  <div className="rank-id">
                    {medalValidator(ranking[0].rank)}
                    {ranking[0].memberId}
                  </div>
                  <div className="rank-amount">
                    <span>{`${ranking[0].count}`}</span>
                    <span> 건</span>
                  </div>
                </div>
                <div className="tmony-container mainPresenter-rank-thirdPrize">
                  <div className="imgContainer">
                    <img
                      className="tmonyImg3"
                      src={tmony3rd}
                      alt="tmony3rdimg"
                      style={{ height: `${height[2]}px` }}
                    />
                  </div>
                  <div className="rank-title">
                    <span />
                    <span style={{ fontSize: `${rankNumSizeValidator(ranking[2].rank)}` }}>
                      {ranking[2].rank}{' '}
                    </span>
                    <span>위</span>
                  </div>
                  <div className="rank-id">
                    {medalValidator(ranking[2].rank)}
                    {ranking[2].memberId}
                  </div>
                  <div className="rank-amount">
                    <span>{`${ranking[2].count}`}</span>
                    <span> 건</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="norank">랭킹정보가 없습니다</div>
        ))}
    </div>
  );
};

UserRank.propTypes = {
  ranking: propTypes.arrayOf(
    propTypes.shape({
      rank: propTypes.number,
      memberId: propTypes.string,
      count: propTypes.number,
    }),
  ),
};

export default UserRank;
