import React from 'react';
import PropTypes from 'prop-types';
import MenuListItem from '../../../components/MenuListItem';

const MainPresenter = (props) => {
  const { list } = props;
  const mapMenuListItem = list.map((item, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <MenuListItem key={`item-${index}`} item={item} />
  ));

  return (
    <>
      <div>Main</div>
      <div className="menulist">{mapMenuListItem}</div>
    </>
  );
};

MainPresenter.defaultProps = {
  list: [],
};

MainPresenter.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object),
};

export default MainPresenter;
