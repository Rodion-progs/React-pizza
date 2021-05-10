import React from 'react';
import { Category, SortPopup, PizzaBlock, LoadingBlock } from '../components';
import { useDispatch, useSelector } from 'react-redux';

import { setCategory, setSortBy } from '../redux/actions/filters';
import { fetchPizzas } from '../redux/actions/pizzas';
import { addPizzaToCart } from '../redux/actions/cart';
const categoryNames = ['Мясные', 'Вегетерианская', 'Гриль', 'Острые', 'Закрытые'];
const sortItems = [
  {name: 'популярности', type: 'popular', order: 'desc'},
  {name: 'цене', type: 'price', order: 'desc'},
  {name: 'алфавиту', type: 'name', order: 'asc'}]

function Home() {
  const dispatch = useDispatch();
  const items = useSelector(({pizzas}) => pizzas.items);
  const cartItems = useSelector(({cart}) => cart.items);
  const isLoaded = useSelector(({pizzas}) => pizzas.isLoaded);
  const { category, sortBy } = useSelector(({filters}) => filters);

  const onSelectCategory = React.useCallback((index) => {
    dispatch(setCategory(index))
  }, [dispatch]);

  const onSelectSortType = React.useCallback((type) => {
    dispatch(setSortBy(type))
  }, [dispatch]);

  const handleAddPizzaToCart = (obj) => {
    // dispatch({
    //   type: 'ADD_PIZZA_CART',
    //   payload: obj
    // });
    dispatch(addPizzaToCart(obj))
  }


  React.useEffect(() => {
    // if (!items.length) {
      dispatch(fetchPizzas( category, sortBy))
    // }
  }, [dispatch, category, sortBy]);

  return (
    <div className="container">
      <div className="content__top">
        <Category activeCategory={category} items={categoryNames} onClickCategory={onSelectCategory}/>
        <SortPopup
          activeSortType={sortBy.type}
          items={sortItems}
          onClickSortType={onSelectSortType}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        { isLoaded
          ?
          items.map(pizza =>
            <PizzaBlock
              {...pizza}
              onClickAddPizza={handleAddPizzaToCart}
              inCartCount={ cartItems[pizza.id] && cartItems[pizza.id].items.length}
              key={pizza.id}
            />)
          : Array(12).fill('').map((_, index) => <LoadingBlock key={index}/>)
        }
      </div>
    </div>
  )
}

export default Home;
