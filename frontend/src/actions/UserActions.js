import {USER_LOGIN_REQUEST, USER_LOGIN_REQUEST_SUCCESS, USER_LOGIN_REQUEST_FAIL, USER_LOGOUT, USER_REGISTER_REQUEST, USER_REGISTER_REQUEST_SUCCESS, USER_REGISTER_REQUEST_FAIL} from '../constants/LoginConstants'
import axios from 'axios'

export const userLoginAction = (email, password) => async (dispatch) => {
  try {
    dispatch({type: USER_LOGIN_REQUEST})
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }

    const {data} = await axios.post("/api/users/login", {email, password}, config)

    dispatch({type: USER_LOGIN_REQUEST_SUCCESS, userInfo: data})
    localStorage.setItem("userInfo", JSON.stringify(data))
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

    const {data} = await axios.post("/api/users", {...user}, config)

    dispatch({type: USER_REGISTER_REQUEST_SUCCESS, userInfo: data})
    localStorage.setItem("userInfo", JSON.stringify(data))
    dispatch({type: USER_LOGIN_REQUEST_SUCCESS, userInfo: data})
  } catch (error) {
    console.log(error.message)
    dispatch({
      type: USER_REGISTER_REQUEST_FAIL,
      userInfo:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
