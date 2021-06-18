import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_REQUEST_SUCCESS,
  USER_LOGIN_REQUEST_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_REQUEST_SUCCESS,
  USER_REGISTER_REQUEST_FAIL,
  GET_USER_PROFILE_FAIL,
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAIL,
  GET_USER_LIST_REQUEST,
  GET_USER_LIST_SUCCESS,
  GET_USER_LIST_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  GET_USER_BY_ID_SUCCESS,
  GET_USER_BY_ID_FAIL,
  GET_USER_BY_ID_REQUEST,
  UPDATE_USER_BY_ID_REQUEST,
  UPDATE_USER_BY_ID_SUCCESS,
  UPDATE_USER_BY_ID_FAIL,
} from '../constants/UserConstants'
import axios from 'axios'
import {
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

export const getUserProfile=() =>async(dispatch,getState) =>{
  try{
    dispatch({type:GET_USER_PROFILE_REQUEST})
    const {
      userLogin: {userInfo},
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const {data} = await axios.get(`/api/users/profile`,config)
    dispatch({type:GET_USER_PROFILE_SUCCESS,userProfile:data})
  }catch(error){
    const message =
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logoutAction())
    }
    dispatch({
      type: GET_USER_PROFILE_FAIL,
      error: message,
    })
  }
}

export const updateUserProfile=(input) =>async(dispatch,getState) =>{
    try{
      console.log(input)
        dispatch({type:UPDATE_USER_PROFILE_REQUEST})
      const {
        userLogin: {userInfo},
      } = getState()
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const {data} = await axios.post("/api/users/profile",input,config);
        dispatch({type:UPDATE_USER_PROFILE_SUCCESS,success:data})
    }catch(error){
      const message =
          error.response && error.response.data.message
              ? error.response.data.message
              : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logoutAction())
      }
      dispatch({
        type: UPDATE_USER_PROFILE_FAIL,
        error: message,
      })
    }
}

export const getUserList = () =>async(dispatch,getState) =>{
  try{
    dispatch({type:GET_USER_LIST_REQUEST})
    const {
      userLogin: {userInfo},
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const {data} = await axios.get("/api/users",config)
    dispatch({type:GET_USER_LIST_SUCCESS,userList:data})
  }catch(error){
    const message =
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logoutAction())
    }
    dispatch({
      type: GET_USER_LIST_FAIL,
      error: message,
    })
  }
}

export const deleteUser = (id) =>async (dispatch,getState)=>{
try{
    dispatch({type:DELETE_USER_REQUEST})
  const {
    userLogin: {userInfo},
  } = getState()
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`,
    },
  }
  const {data} = await axios.delete(`/api/users/${id}`,config)
  dispatch({type:DELETE_USER_SUCCESS,message:data})
}catch(error)  {
  const message =
      error.response && error.response.data.message
          ? error.response.data.message
          : error.message
  if (message === 'Not authorized, token failed') {
    dispatch(logoutAction())
  }
  dispatch({
    type: DELETE_USER_FAIL,
    error: message,
  })
}
}

export const getUserByIdAction=(id) =>async(dispatch, getState) =>{
  try{
      dispatch({type:GET_USER_BY_ID_REQUEST})
    const {
      userLogin: {userInfo},
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/api/users/${id}`,config)
    dispatch({type:GET_USER_BY_ID_SUCCESS,userDetails:data})
  }catch(error){
    const message =
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logoutAction())
    }
    dispatch({
      type: GET_USER_BY_ID_FAIL,
      error: message,
    })
  }
}

export const updateUserByIdAction=(id,input) =>async(dispatch,getState)=>{
  try{
      dispatch({type:UPDATE_USER_BY_ID_REQUEST})
    const {
      userLogin: {userInfo},
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const {data} = await axios.put(`/api/users/${id}`,input,config)
      dispatch({type:UPDATE_USER_BY_ID_SUCCESS,message:data})
  }catch(error){
    const message =
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logoutAction())
    }
    dispatch({
      type: UPDATE_USER_BY_ID_FAIL,
      error: message,
    })
  }
}
