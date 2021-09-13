let initialState = {
  products: [],
  loading: false,
};
export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "REQ_PRODUCTS":
      return {
        ...state,
        loading: true
      };
    case "GET_PRODUCTS":
      return {
        ...state,
        products: action.data
      };
    default:
      return state;
  }
}
