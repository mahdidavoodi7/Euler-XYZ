let initialState = {
  products: [],
  product: null,
  sort: "sale_date",
  sortDirection: "desc",
  limit: 20,
  page: 0,
};
export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        ...state,
        products: action.data,
      };
    case "GET_PRODUCT":
      return {
        ...state,
        product: action.data,
      };
    case "CHANGE_SORT":
      return {
        ...state,
        sort: action.data,
      };
    case "CHANGE_SORT_DIRECTION":
      return {
        ...state,
        sortDirection: action.data,
      };
    case "CHANGE_LIMIT":
      return {
        ...state,
        limit: action.data,
        page: 0,
      };
    case "CHANGE_PAGE":
      return {
        ...state,
        page: action.data,
      };
    default:
      return state;
  }
}
