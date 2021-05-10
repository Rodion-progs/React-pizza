import axios from 'axios';


export const setLoaded = (payload) => ({
  type: 'SET_LOADED',
  payload,
})

export const fetchPizzas = (category, sortBy) => (dispatch) => {
  dispatch(setLoaded(false));
  const params = {_sort: sortBy.type, _order: sortBy.order};
  if (category !== -1) {
    params.category = category
  }
  axios.get('/pizzas',{params})
    .then(({data}) => dispatch(setPizzas(data)));
}

export const setPizzas = (items) => ({
  type: 'SET_PIZZAS',
  payload: items,
});

