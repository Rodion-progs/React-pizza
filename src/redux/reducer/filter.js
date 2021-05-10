const initialState = {
  sortBy: {
    type: 'popular',
    order: 'desc'
  },
  category: -1,
}

const filters = (state = initialState, action) => {
  if (action.type === 'SET_SORT_BY') {
   return ({
     ...state,
     sortBy: action.payload
   })
  } else if (action.type === 'SET_CATEGORY') {
    return ({
      ...state,
      category: action.payload
    })
  }
  return state
}

export default filters;
