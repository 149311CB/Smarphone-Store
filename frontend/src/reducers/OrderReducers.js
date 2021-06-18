import {
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_RESET,
  DELETE_ORDER_BY_ID_FAIL, DELETE_ORDER_BY_ID_REQUEST, DELETE_ORDER_BY_ID_SUCCESS,
  GET_ORDER_BY_ID_FAIL,
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_SUCCESS,
  GET_ORDER_LIST_BY_USER_FAIL,
  GET_ORDER_LIST_BY_USER_REQUEST,
  GET_ORDER_LIST_BY_USER_SUCCESS, GET_ORDER_LIST_FAIL, GET_ORDER_LIST_REQUEST, GET_ORDER_LIST_SUCCESS,
  UPDATE_ORDER_STATUS_FAIL,
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_RESET,
  UPDATE_ORDER_STATUS_SUCCESS, DELETE_ORDER_BY_ID_RESET
} from "../constants/OrderConstants";
import {GET_USER_PROFILE_FAIL, GET_USER_PROFILE_SUCCESS, USER_LOGOUT} from "../constants/UserConstants";

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {loading: true}
    case CREATE_ORDER_SUCCESS:
      return {loading: false, orderCreated: action.orderCreated}
    case CREATE_ORDER_FAIL:
      return {loading: false, error: action.error}
    case CREATE_ORDER_RESET:
      return {}
    default:
      return state
  }
}

export const checkoutPendingReducer = (state = {}, action) => {
  switch (action.type) {
    case "CHECKOUT_PENDING":
      return {isCheckout: true}
    case "CHECKOUT_NOT_PENDING":
      return {}
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const getOrderListByUserReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ORDER_LIST_BY_USER_REQUEST:
      return {loading: true}
    case GET_ORDER_LIST_BY_USER_SUCCESS:
      return {loading: false, orderList: action.orderList}
    case GET_ORDER_LIST_BY_USER_FAIL:
      return {loading: false, error: action.error}
    default:
      return state;
  }
}

export const getOrderDetailByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ORDER_BY_ID_REQUEST:
      return {loading: true}
    case GET_ORDER_BY_ID_SUCCESS:
      return {loading: false, orderDetails: action.orderDetails}
    case GET_ORDER_BY_ID_FAIL:
      return {loading: false, error: action.error}
    default:
      return state

  }
}

export const updateOrderStatusReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ORDER_STATUS_REQUEST:
      return {loading: true}
    case UPDATE_ORDER_STATUS_SUCCESS:
      return {loading: false, message: action.message}
    case UPDATE_ORDER_STATUS_FAIL:
      return {loading: false, error: action.error}
    case UPDATE_ORDER_STATUS_RESET:
      return {}
    default:
      return state
  }
}

export const getOrderListReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ORDER_LIST_REQUEST:
      return {loading: true}
    case GET_ORDER_LIST_SUCCESS:
      return {loading: false, orderList: action.orderList}
    case GET_ORDER_LIST_FAIL:
      return {loading: false, error: action.error}
    default:
      return state
  }
}

export const deleteOrderByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ORDER_BY_ID_REQUEST:
      return {loading: true}
    case DELETE_ORDER_BY_ID_SUCCESS:
      return {loading: false, message: action.message}
    case DELETE_ORDER_BY_ID_FAIL:
      return {loading: false, error: action.error}
    case DELETE_ORDER_BY_ID_RESET:
      return {}
    default:
      return state
  }
}
