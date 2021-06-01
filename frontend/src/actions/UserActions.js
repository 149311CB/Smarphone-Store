import {USER_LOGIN_REQUEST, USER_LOGIN_REQUEST_SUCCESS, USER_LOGIN_REQUEST_FAIL, USER_LOGOUT, USER_REGISTER_REQUEST, USER_REGISTER_REQUEST_SUCCESS, USER_REGISTER_REQUEST_FAIL} from '../constants/LoginConstants'
import {addToCart, pushCartToServer} from './CartActions'
import axios from 'axios'
import {
  CREATE_RATING_FAIL,
  CREATE_RATING_REQUEST, CREATE_RATING_SUCCESS,
  GET_USER_RATING_FAIL,
  GET_USER_RATING_REQUEST,
  GET_USER_RATING_SUCCESS
} from "../constants/ProductConstants";

export const userLoginAction = (email, password) => async (dispatch, getState) => {
  try {
    dispatch({type: USER_LOGIN_REQUEST})

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }

    const {data} = await axios.post("/api/users/login", {email, password}, config)
    localStorage.setItem("userInfo", JSON.stringify(data))

    dispatch({type: USER_LOGIN_REQUEST_SUCCESS, userInfo: data})
    const localCart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : null
    if(localCart){
      dispatch(pushCartToServer(localCart.products))
    }
  } catch (error) {
    dispatch({
      type: USER_LOGIN_REQUEST_FAIL,
      userInfo:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const logoutAction = () => async (dispatch) => {
  localStorage.removeItem("userInfo")
  localStorage.removeItem("shipping")
  dispatch({type: USER_LOGOUT})
}

export const userRegisterAction = (user) => async (dispatch) => {
  try {
    dispatch({type: USER_REGISTER_REQUEST})
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    const {data} = await axios.post("/api/users", user, config)
    localStorage.setItem("userInfo", JSON.stringify(data))
    const localCart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : null
    if(localCart){
      dispatch(pushCartToServer(localCart.products))
    }
    dispatch({type: USER_REGISTER_REQUEST_SUCCESS, userInfo: data})
    dispatch({type: USER_LOGIN_REQUEST_SUCCESS, userInfo: data})

  } catch (error) {
    dispatch({
      type: USER_REGISTER_REQUEST_FAIL,
      userInfo:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getUserRatingAction=(input)=>async(dispatch,getState)=>{
  try{
    dispatch({type:GET_USER_RATING_REQUEST})
    const {
      userLogin: {userInfo},
    } = getState()
    const config = {
      params:{
        product:input
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const {data} = await axios.get("/api/orders/details/ratings",config)
    dispatch({type:GET_USER_RATING_SUCCESS,userRatings:data})
  }catch(error){
    const message =
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logoutAction())
    }
    dispatch({
      type: GET_USER_RATING_FAIL,
      error: message,
    })
  }
}