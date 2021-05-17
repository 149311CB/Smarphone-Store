import {USER_LOGIN_REQUEST, USER_LOGIN_REQUEST_SUCCESS, USER_LOGIN_REQUEST_FAIL, USER_LOGOUT, USER_REGISTER_REQUEST, USER_REGISTER_REQUEST_SUCCESS, USER_REGISTER_REQUEST_FAIL} from '../constants/LoginConstants'

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
    default:
      return state
  }
}
