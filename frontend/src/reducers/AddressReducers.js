import {
  ADD_ADDRESS_FAIL,
  ADD_ADDRESS_REQUEST, ADD_ADDRESS_RESET,
  ADD_ADDRESS_SUCCESS,
  GET_ADDRESS_BY_USER_FAIL,
  GET_ADDRESS_BY_USER_REQUEST,
  GET_ADDRESS_BY_USER_SUCCESS,
  GET_ADDRESS_LIST_BY_USER_FAIL,
  GET_ADDRESS_LIST_BY_USER_REQUEST,
  GET_ADDRESS_LIST_BY_USER_SUCCESS,
  GET_CITY_LIST_FAIL,
  GET_CITY_LIST_REQUEST,
  GET_CITY_LIST_SUCCESS,
  UPDATE_ADDRESS_FAIL,
  UPDATE_ADDRESS_REQUEST,
  UPDATE_ADDRESS_SUCCESS
} from "../constants/AddressConstants";

export const getAddressListByUserReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ADDRESS_LIST_BY_USER_REQUEST:
      return {loading: true}
    case GET_ADDRESS_LIST_BY_USER_SUCCESS:
      return {loading: false, addressList: action.addressList}
    case GET_ADDRESS_LIST_BY_USER_FAIL:
      return {loading: false, error: action.addressList}
    default:
      return state
  }
}

export const getAddressByUserReducer = (state = {address: {}}, action) => {
  switch (action.type) {
    case GET_ADDRESS_BY_USER_REQUEST:
      return {loading: true}
    case GET_ADDRESS_BY_USER_SUCCESS:
      return {loading: false, address: action.address}
    case GET_ADDRESS_BY_USER_FAIL:
      return {loading: false, error: action.address}
    default:
      return state;
  }
}

export const getCityListReducer = (state = {cities: []}, action) => {
  switch (action.type) {
    case GET_CITY_LIST_REQUEST:
      return {loading: true}
    case GET_CITY_LIST_SUCCESS:
      return {loading: false, cities: action.cities}
    case GET_CITY_LIST_FAIL:
      return {loading: false, error: action.cities}
    default:
      return state
  }
}

export const addAddressReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_ADDRESS_REQUEST:
      return {loading: true}
    case ADD_ADDRESS_SUCCESS:
      return {loading: false, newAddress: action.newAddress}
    case ADD_ADDRESS_FAIL:
      return {loading: false, error: action.newAddress}
    case ADD_ADDRESS_RESET:
      return {}
    default:
      return state
  }
}

export const updateAddressReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ADDRESS_REQUEST:
      return {loading: true}
    case UPDATE_ADDRESS_SUCCESS:
      return {loading: false, updatedAddress: action.updatedAddress}
    case UPDATE_ADDRESS_FAIL:
      return {loading: false, error: action.error}
    default:
      return state
  }
}
