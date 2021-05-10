const initialState = {
  items: {},
  totalPrice: 0,
  totalCount: 0
}

const getTotalPrice = arr => arr.reduce((acc, item) => item.price + acc, 0);

const _get = (obj, path) => {
  const [firstKey, ...keys] = path.split('.');
  return keys.reduce((val, key) => {
    return val[key];
  }, obj[firstKey])
}

const getTotalSum = (obj, path) => {
  return Object.values(obj).reduce((sum, obj) => {
    const value = _get(obj, path);
    return sum + value;
  }, 0)
};

const cart = (state = initialState, action) => {

  switch (action.type) {
    case 'ADD_PIZZA_CART': {
      const currentPizzaItem = !state.items[action.payload.id]
        ? [action.payload]
        : [...state.items[action.payload.id].items, action.payload];
      const PizzaItems = {
        ...state.items,
        [action.payload.id]: {
          items: currentPizzaItem,
          totalPrice: getTotalPrice(currentPizzaItem)
        }
      }
      const totalCount = getTotalSum(PizzaItems, 'items.length');
      const totalPrice = getTotalSum(PizzaItems, 'totalPrice');
      return {
        ...state,
        items: PizzaItems,
        totalCount,
        totalPrice
      };
    }
    case 'CLEAR_CART':
      return initialState;
    case 'REMOVE_CART_ITEM': {
      const newItems = {
        ...state.items
      }
      const currentTotalPrice = newItems[action.payload].totalPrice
      const currentTotalCount = newItems[action.payload].items.length
      delete newItems[action.payload];
      return {
        ...state,
        items: newItems,
        totalCount: state.totalCount - currentTotalCount,
        totalPrice: state.totalPrice - currentTotalPrice
      };
    }
    case 'INCREASE_ITEM_CART': {
      const newItems = [
        ...state.items[action.payload].items,
        state.items[action.payload].items[0]
      ];
      const newState = {
        ...state.items,
        [action.payload]: {
          items: newItems,
          totalPrice: getTotalPrice(newItems)
        }
      }
      return {
        ...state,
        items: newState,
        totalCount: getTotalSum(newState, 'items.length'),
        totalPrice: getTotalSum(newState, 'totalPrice')
      };
    }
    case 'DECREASE_ITEM_CART': {

      const oldItems = state.items[action.payload].items;
      const newObjItems = oldItems.length > 1 ? state.items[action.payload].items.slice(1) : oldItems;
      const newState = {
        ...state.items,
        [action.payload]: {
          items: newObjItems,
          totalPrice: getTotalPrice(newObjItems)
        }
      }
      return {
        ...state,
        items: newState,
        totalCount: getTotalSum(newState, 'items.length'),
        totalPrice: getTotalSum(newState, 'totalPrice')
      };
    }
    default:
      return state;
  }
}

export default cart;
