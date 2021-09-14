let initialState = {
  products: [],
};
export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        ...state,
        products: action.data,
      };
    default:
      return state;
  }
}
