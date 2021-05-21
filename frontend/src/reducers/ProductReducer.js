import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_REQUEST_SUCCESS,
  PRODUCT_LIST_REQUEST_FAIL,
  PRODUCT_REQUEST,
  PRODUCT_REQUEST_SUCCESS,
  PRODUCT_REQUEST_FAIL,
  GET_SIMILARS_REQUEST, GET_SIMILARS_SUCCESS, GET_SIMILARS_FAIL
} from "../constants/ProductConstants";

export const productListReducer = (state = {products: []}, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return {loading: true, products: []};
    case PRODUCT_LIST_REQUEST_SUCCESS:
      return {loading: false, products: action.products};
    case PRODUCT_LIST_REQUEST_FAIL:
      return {loading: false, error: action.products};
    default:
      return state;
  }
};

export const productReducer = (state = {product: {}}, action) => {
  switch (action.type) {
    case PRODUCT_REQUEST:
      return {loading: true, product: {}}
    case PRODUCT_REQUEST_SUCCESS:
      return {loading: false, product: action.product}
    case PRODUCT_REQUEST_FAIL:
      return {loading: false, error: action.product}
    default:
      return state;
  }
}

export const similarsReducer = (state = {similars: []}, action) => {
  switch (action.type) {
    case GET_SIMILARS_REQUEST:
      return {loading: true, similars: []}
    case GET_SIMILARS_SUCCESS:
      return {loading: false, similars: action.similars}
    case GET_SIMILARS_FAIL:
      return {loading: false, error: action.similars}
    default:
      return state;
  }
}
