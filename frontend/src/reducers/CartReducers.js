import {
  UPDATE_CART_REQUEST, UPDATE_CART_SUCCESS, UPDATE_CART_FAIL,
  GET_CART_REQUEST, GET_CART_SUCCESS, GET_CART_FAIL
} from '../constants/CartConstants'

export const addToCartReducer = (state = {cartInfo: []}, action) => {
  console.log(action.type)
  switch (action.type) {
    case UPDATE_CART_REQUEST:
      return {loading: true}
    case UPDATE_CART_SUCCESS:
      return {loading: false, cartInfo: action.cartInfo}
    default:
      return state
  }
}

export const getCartReducer = (state = {cartInfo: {}}, action) => {
  switch (action.type) {
    case GET_CART_REQUEST:
      return {loading: true, cartInfo: {}}
    case GET_CART_SUCCESS:
      return {loading: false, cartInfo: action.cartInfo}
    case GET_CART_FAIL:
      return {loading: false, cartInfo: action.cartInfo}
    default:
      return state
  }
}
