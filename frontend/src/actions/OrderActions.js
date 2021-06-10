import {logoutAction} from './UserActions'
import axios from 'axios'
import {
  UPDATE_ORDER_STATUS_REQUEST,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  GET_ORDER_BY_ID_FAIL,
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_SUCCESS,
  GET_ORDER_LIST_BY_USER_FAIL,
  GET_ORDER_LIST_BY_USER_REQUEST,
  GET_ORDER_LIST_BY_USER_SUCCESS,
  UPDATE_ORDER_STATUS_SUCCESS,
  UPDATE_ORDER_STATUS_FAIL,
  GET_ORDER_LIST_REQUEST,
  GET_ORDER_LIST_FAIL,
  GET_ORDER_LIST_SUCCESS,
  DELETE_ORDER_BY_ID_REQUEST,
  DELETE_ORDER_BY_ID_FAIL,
  DELETE_ORDER_BY_ID_SUCCESS
} from '../constants/OrderConstants'

export const completeOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({type: CREATE_ORDER_REQUEST})
    const {
      userLogin: {userInfo}
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const {data} = await axios.post("/api/orders/", order, config)
    dispatch({type: CREATE_ORDER_SUCCESS, orderCreated: data})
    localStorage.removeItem("shipping")
    const {data:clearMessage} = await axios.post("/api/carts/clear",{},config)
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logoutAction())
    }
    dispatch({
      type: CREATE_ORDER_FAIL,
      error: message,
    })
  }
}

export const getOrderListByUser = () => async (dispatch,getState) =>{
  try{
    dispatch({type:GET_ORDER_LIST_BY_USER_REQUEST})
    const {
      userLogin: {userInfo}
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const {data} = await axios.get("/api/orders",config)
      dispatch({type:GET_ORDER_LIST_BY_USER_SUCCESS,orderList:data})
  }catch(error){
    const message =
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logoutAction())
    }
    dispatch({
      type: GET_ORDER_LIST_BY_USER_FAIL,
      error: message,
    })
  }
}

export const getOrderById =(id) =>async (dispatch,getState) =>{
  try{
      dispatch({type:GET_ORDER_BY_ID_REQUEST})
    const {
      userLogin: {userInfo}
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const {data} = await axios.get(`/api/orders/${id}`,config)
    dispatch({type:GET_ORDER_BY_ID_SUCCESS,orderDetails:data})
  }catch(error){
    const message =
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logoutAction())
    }
    dispatch({
      type: GET_ORDER_BY_ID_FAIL,
      error: message,
    })
  }
}

export const updateOrder = (status,id) =>async(dispatch,getState) =>{
  try{
    dispatch({type:UPDATE_ORDER_STATUS_REQUEST})
    const {
      userLogin: {userInfo}
    } = getState()
    const config = {

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const {data} = await axios.put(`/api/orders/${id}`,{ status:status },config)
    dispatch({type:UPDATE_ORDER_STATUS_SUCCESS,message:data})
  }catch(error){
    const message =
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logoutAction())
    }
    dispatch({
      type: UPDATE_ORDER_STATUS_FAIL,
      error: message,
    })
  }
}

export const getOrderList = () => async(dispatch,getState) =>{
try{
    dispatch({type:GET_ORDER_LIST_REQUEST})
  const {
    userLogin: {userInfo}
  } = getState()
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`,
    },
  }
  const {data} = await axios.get("/api/orders/all",config)
  dispatch({type:GET_ORDER_LIST_SUCCESS,orderList:data})
}catch(error){
  const message =
      error.response && error.response.data.message
          ? error.response.data.message
          : error.message
  if (message === 'Not authorized, token failed') {
    dispatch(logoutAction())
  }
  dispatch({
    type: GET_ORDER_LIST_FAIL,
    error: message,
  })
}
}
export const deleteOrderByIdAction =(id) =>async (dispatch,getState)=>{
  try{
    dispatch({type:DELETE_ORDER_BY_ID_REQUEST})
    const {
      userLogin: {userInfo}
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const {data} = await axios.delete(`/api/orders/${id}`,config)
    dispatch({type:DELETE_ORDER_BY_ID_SUCCESS,message:data})
  }catch(error){
    const message =
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logoutAction())
    }
    dispatch({
      type: DELETE_ORDER_BY_ID_FAIL,
      error: message,
    })
  }
}
