import React from 'react';
import PropTypes from 'prop-types';

const Category = React.memo(function ({ activeCategory, items, onClickCategory }) {
  // const [activeItem, setActiveItem] = React.useState(-1);
  // const onSelectItem = index => {
  //   // setActiveItem(index);
  //   onClickCategory(index);
  // }
  return (
    <div className="categories">
      <ul >
        <li
          onClick={() => onClickCategory(-1)}
          className={activeCategory === -1 ? 'active' : ''}>Все</li>
        {items &&
        items.map((name, index) =>
          <li
            onClick={() => onClickCategory(index)}
            key={name}
            className={activeCategory === index ?  'active' : ''}
          >{ name }</li>
        )
        }
      </ul>
    </div>
  )
})
Category.propTypes = {
  activeCategory: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClickCategory: PropTypes.func.isRequired
}
Category.defaultProps = { activeCategory: -1, items: []}

export default Category;
