import {logoutAction} from './UserActions'
import axios from 'axios'
import {CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS} from '../constants/OrderConstants'

export const completeOrder = (cartId,order) => async (dispatch, getState) => {
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
    console.log({ ...order })
    const {data} = await axios.post("/api/orders/", order, config)
    await  axios.delete(`/api/cart/${cartId}`,config)
    dispatch({type: CREATE_ORDER_SUCCESS, orderCreated: data})
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
      payload: message,
    })
  }
}
