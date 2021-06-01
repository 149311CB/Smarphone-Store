import {USER_LOGIN_REQUEST, USER_LOGIN_REQUEST_SUCCESS, USER_LOGIN_REQUEST_FAIL, USER_LOGOUT, USER_REGISTER_REQUEST, USER_REGISTER_REQUEST_SUCCESS, USER_REGISTER_REQUEST_FAIL} from '../constants/LoginConstants'
import {
  CREATE_RATING_REQUEST, CREATE_RATING_SUCCESS,
  GET_USER_RATING_FAIL,
  GET_USER_RATING_REQUEST,
  GET_USER_RATING_SUCCESS
} from "../constants/ProductConstants";
import {CREATE_ORDER_FAIL} from "../constants/OrderConstants";

export const userLoginReducer = (state = {useLogin: {}}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {loading: true}
    case USER_LOGIN_REQUEST_SUCCESS:
      return {loading: false, userInfo: action.userInfo}
    case USER_LOGIN_REQUEST_FAIL:
      return {loading: false, error: action.userInfo}
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const userRegisterReducer = (state = {useRegister: {}}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return {loading: true}
    case USER_REGISTER_REQUEST_SUCCESS:
      return {loading: false, userInfo: action.userInfo}
    case USER_REGISTER_REQUEST_FAIL:
      return {loading: false, error: action.userInfo}
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const userLogoutReducer =(state ={},action) =>{
  if(action.type === USER_LOGOUT){
    return {userInfo:"logout"}
  }
  return state
}

export const getUserRatingReducer =(state={userRating:{}},action)=>{
  switch (action.type){
    case GET_USER_RATING_REQUEST:
      return {loading:true}
    case GET_USER_RATING_SUCCESS:
      return {loading:false,userRating:action.userRating}
    case GET_USER_RATING_FAIL:
      return {loading:false,userRating:action.userRating}
    default:
      return state
  }
}

export const createRatingReducer = (state ={},action)=>{
  switch (action.type){
    case CREATE_RATING_REQUEST:
      return {loading:true}
    case CREATE_RATING_SUCCESS:
      return {loading:false,ratingCreated:action.ratingCreated}
    case CREATE_ORDER_FAIL:
      return {loading:false,error:action.error}
    default:
      return state
  }
}