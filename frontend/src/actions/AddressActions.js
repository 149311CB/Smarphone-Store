import axios from 'axios'
import {
  GET_ADDRESS_BY_USER_REQUEST,
  GET_ADDRESS_BY_USER_SUCCESS,
  GET_ADDRESS_BY_USER_FAIL,
  GET_CITY_LIST_REQUEST,
  GET_CITY_LIST_SUCCESS,
  GET_CITY_LIST_FAIL,
  ADD_ADDRESS_REQUEST,
  ADD_ADDRESS_SUCCESS,
  ADD_ADDRESS_FAIL,
  GET_ADDRESS_LIST_BY_USER_REQUEST,
  GET_ADDRESS_LIST_BY_USER_SUCCESS,
  GET_ADDRESS_LIST_BY_USER_FAIL,
  UPDATE_ADDRESS_REQUEST,
  UPDATE_ADDRESS_SUCCESS,
  UPDATE_ADDRESS_FAIL,
  GET_ADDRESS_BY_ID_REQUEST,
  GET_ADDRESS_BY_ID_SUCCESS,
  GET_ADDRESS_BY_ID_FAIL,
  DELETE_ADDRESS_REQUEST, DELETE_ADDRESS_SUCCESS, DELETE_ADDRESS_FAIL
} from '../constants/AddressConstants'
import {logoutAction} from "./UserActions";

export const getAddressListByUserAction = () => async (dispatch, getState) => {
  try {
    dispatch({type: GET_ADDRESS_LIST_BY_USER_REQUEST})
    const {
      userLogin: {userInfo},
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const {data} = await axios.get("/api/addresses/", config)
    dispatch({type: GET_ADDRESS_LIST_BY_USER_SUCCESS, addressList: data})
  } catch (error) {
    dispatch({
      type: GET_ADDRESS_LIST_BY_USER_FAIL,
      addressList:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getAddressByUserAction = () => async (dispatch, getState) => {
  try {
    dispatch({type: GET_ADDRESS_BY_USER_REQUEST})
    const {
      userLogin: {userInfo}
    } = getState()

    const config = {
      headers: {
        // 'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    if (localStorage.getItem("shipping")) {
      dispatch({type: GET_ADDRESS_BY_USER_SUCCESS, address: JSON.parse(localStorage.getItem("shipping"))})
    } else {
      const {data} = await axios.get("/api/addresses/primary", config)
      dispatch({type: GET_ADDRESS_BY_USER_SUCCESS, address: data})
    }
  } catch (error) {
    dispatch({
      type: GET_ADDRESS_BY_USER_FAIL,
      address:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getCityListAction = () => async (dispatch) => {
  try {
    dispatch({type: GET_CITY_LIST_REQUEST})
    const {data} = await axios.get("/api/cities")
    dispatch({type: GET_CITY_LIST_SUCCESS, cities: data})
  } catch (error) {
    dispatch({
      type: GET_CITY_LIST_FAIL,
      cities:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const addAddressAction = (input) => async (dispatch, getState) => {
  try {
    dispatch({type: ADD_ADDRESS_REQUEST})
    const {
      userLogin: {userInfo},
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const {data} = await axios.post("/api/addresses", {...input, user: userInfo._id}, config)
    dispatch({type: ADD_ADDRESS_SUCCESS, newAddress: data})
  } catch (error) {
    dispatch({
      type: ADD_ADDRESS_FAIL,
      newAddress:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateAddressAction = (id, input) => async (dispatch, getState) => {
  console.log(id,input)
  try {
    dispatch({type: UPDATE_ADDRESS_REQUEST})
    const {
      userLogin: {userInfo},
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const {data} = await axios.post(`/api/addresses/${id}`, {...input}, config)
    dispatch({type: UPDATE_ADDRESS_SUCCESS, updatedAddress: data})
  } catch (error) {
    dispatch({
      type: UPDATE_ADDRESS_FAIL,
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getAddressByIdAction=(id) =>async(dispatch,getState) =>{
  try{
    dispatch({type:GET_ADDRESS_BY_ID_REQUEST})
    const {
      userLogin: {userInfo},
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const {data} = await axios.get(`/api/addresses/${id}`,config)
    dispatch({type:GET_ADDRESS_BY_ID_SUCCESS,address:data})
  }catch(error){
    const message =
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logoutAction())
    }
    dispatch({
      type: GET_ADDRESS_BY_ID_FAIL,
      error: message,
    })
  }
}

export const deleteAddressAction=(id) =>async(dispatch,getState) =>{
  try{
      dispatch({type:DELETE_ADDRESS_REQUEST})
    const {
      userLogin: {userInfo},
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const {data} = await axios.delete(`/api/addresses/${id}`,config)
      dispatch({type:DELETE_ADDRESS_SUCCESS,message:data})
  }catch(error){
    const message =
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logoutAction())
    }
    dispatch({
      type: DELETE_ADDRESS_FAIL,
      error: message,
    })
  }
}