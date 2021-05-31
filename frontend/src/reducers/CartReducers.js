import {
  UPDATE_CART_REQUEST,
  UPDATE_CART_SUCCESS,
  UPDATE_CART_FAIL,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  GET_CART_FAIL,
  REMOVE_FROM_CART_REQUEST,
  REMOVE_FROM_CART_SUCCESS,
  REMOVE_FROM_CART_FAIL,
  DELETE_CART_REQUEST,
  DELETE_CART_SUCCESS,
  DELETE_CART_FAIL
} from '../constants/CartConstants'

export const addToCartReducer = (state = {cartInfo: []}, action) => {
  switch (action.type) {
    case UPDATE_CART_REQUEST:
      return {loading: true}
    case UPDATE_CART_SUCCESS:
      return {loading: false, cartInfo: action.cartInfo}
    case UPDATE_CART_FAIL:
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

export const removeFromCartReducer = (state = {cartInfo: {}}, action) => {
  switch (action.type) {
    case REMOVE_FROM_CART_REQUEST:
      return {loading: true}
    case REMOVE_FROM_CART_SUCCESS:
      return {loading: false, cartInfo: action.cartInfo}
    case REMOVE_FROM_CART_FAIL:
      return {loading: false, cartInfo: action.cartInfo}
    default:
      return state
  }
}

export const deleteCartReducer =(state={},action)=>{
  switch (action.type){
    case DELETE_CART_REQUEST:
      return {loading:true}
    case DELETE_CART_SUCCESS:
      return {loading:false}
    case DELETE_CART_FAIL:
      return {loading:false,error:action.error}
    default:
      return state
  }
}
