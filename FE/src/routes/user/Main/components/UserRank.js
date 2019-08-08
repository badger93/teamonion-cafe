import React, { useState } from 'react';
import propTypes from 'prop-types';
import tmony1st from '../../../../image/tmony1st.png';
import tmony2nd from '../../../../image/tmony2nd.png';
import tmony3rd from '../../../../image/tmony3rd.png';
import '../styles/UserRank.scss';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleDown, faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';

const UserRank = ({
  ranking = [
    {
      rank: 1,
      memberId: 'test1',
      count: 10,
    },
    {
      rank: 2,
      memberId: 'test2',
      count: 4,
    },
    {
      rank: 2,
      memberId: 'test3',
      count: 4,
    },
  ],
}) => {
  const Time = moment().format('YYYY MMMM Do, h:mm a');

  const heightCalculateFunc = () => {
    //600을 기준으로 주문량에 따라 길이를 나눠주는 함수
    if (ranking.length > 0) {
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

  const endWordValidator = number => {
    // 1 2 3 끝 문자 정해주는 함수
    switch (number) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';

      default:
        return '';
    }
  };
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mainPresenter-rank">
      <div className="mainPresenter-rank-header">
        <h1>이 달의 티몽 중독자</h1>
        <div className="openBtn" onClick={() => setIsOpen(prev => !prev)}>
          {isOpen ? (
            <FontAwesomeIcon icon={faArrowAltCircleUp} />
          ) : (
            <FontAwesomeIcon icon={faArrowAltCircleDown} />
          )}
        </div>
      </div>
      {isOpen &&
        (ranking.length > 0 ? (
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
                    <span>Rank </span>
                    <span>{ranking[1].rank}</span>
                    <span>{endWordValidator(ranking[1].rank)}</span>
                  </div>
                  <div className="rank-id">{ranking[1].memberId}</div>
                  <div className="rank-amount">{`${ranking[1].count}건`}</div>
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
                    <span>Rank </span>
                    <span>{ranking[0].rank} </span>
                    <span>{endWordValidator(ranking[0].rank)}</span>
                  </div>
                  <div className="rank-id">{ranking[0].memberId}</div>
                  <div className="rank-amount">{`${ranking[0].count}건`}</div>
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
                    <span>Rank </span>
                    <span>{ranking[2].rank} </span>
                    <span>{endWordValidator(ranking[2].rank)}</span>
                  </div>
                  <div className="rank-id">{ranking[2].memberId}</div>
                  <div className="rank-amount">{`${ranking[2].count}건`}</div>
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
      //배열안에 오브젝트가있을때
      rank: propTypes.number,
      memberId: propTypes.string,
      count: propTypes.number,
    }),
  ),
};

export default UserRank;
