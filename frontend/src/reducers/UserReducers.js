import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_REQUEST_SUCCESS,
  USER_LOGIN_REQUEST_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_REQUEST_SUCCESS,
  USER_REGISTER_REQUEST_FAIL,
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAIL,
  UPDATE_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAIL,
  UPDATE_USER_PROFILE_RESET,
  GET_USER_LIST_REQUEST,
  GET_USER_LIST_SUCCESS,
  GET_USER_LIST_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  GET_USER_BY_ID_REQUEST,
  GET_USER_BY_ID_SUCCESS,
  GET_USER_BY_ID_FAIL,
  UPDATE_USER_BY_ID_REQUEST,
  UPDATE_USER_BY_ID_SUCCESS, UPDATE_USER_BY_ID_FAIL, UPDATE_USER_BY_ID_RESET,
} from '../constants/UserConstants'
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

export const getUserProfileReducer = (state ={},action)=>{
  switch (action.type){
    case GET_USER_PROFILE_REQUEST:
      return {loading:true}
    case GET_USER_PROFILE_SUCCESS:
      return {loading:false,userProfile:action.userProfile}
    case GET_USER_PROFILE_FAIL:
      return {loading:false,error: action.error}
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const updateUserProfileReducer=(state={},action)=>{
  switch (action.type){
    case UPDATE_USER_PROFILE_REQUEST:
      return {loading:true}
    case UPDATE_USER_PROFILE_SUCCESS:
      return {loading:false,success:action.success}
    case UPDATE_USER_PROFILE_FAIL:
      return {loading:false,error:action.error}
    case UPDATE_USER_PROFILE_RESET:
      return {}
    default:
      return state
  }
}

export const getUserListReducer =(state={},action)=>{
  switch (action.type){
    case GET_USER_LIST_REQUEST:
      return {loading:true}
    case GET_USER_LIST_SUCCESS:
      return {loading:false,userList:action.userList}
    case GET_USER_LIST_FAIL:
      return{loading:false,error:action.error}
    default:
      return state
  }
}

export const deleteUserReducer = (state={},action) =>{
  switch (action.type){
    case DELETE_USER_REQUEST:
      return {loading:true}
    case DELETE_USER_SUCCESS:
      return {loading:false,message:action.message}
    case DELETE_USER_FAIL:
      return {loading:false,error:action.error}
    default:
      return state
  }
}

export const getUserByIdReducer = (state ={},action)=>{
  switch (action.type){
    case GET_USER_BY_ID_REQUEST:
      return {loading:true}
    case GET_USER_BY_ID_SUCCESS:
      return {loading:false,userDetails:action.userDetails}
    case GET_USER_BY_ID_FAIL:
      return {loading:false,error: action.error}
    default:
      return state
  }
}

export const updateUserByIdReducer = (state ={},action) =>{
  switch (action.type){
    case UPDATE_USER_BY_ID_REQUEST:
      return {loading:true}
    case UPDATE_USER_BY_ID_SUCCESS:
      return {loading:false,message:action.message}
    case UPDATE_USER_BY_ID_FAIL:
      return {loading:false,error:action.error}
    case UPDATE_USER_BY_ID_RESET:
      return {}
    default:
      return state
  }
}
