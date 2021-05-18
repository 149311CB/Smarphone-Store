import {
  CART_ADD_ITEM, CART_REMOVE_ITEM, GET_CART_REQUEST,
  GET_CART_SUCCESS, GET_CART_FAIL,
  UPDATE_CART_REQUEST, UPDATE_CART_SUCCESS, UPDATE_CART_FAIL
}
  from '../constants/CartConstants'
import axios from 'axios'

export const addToCart = (input) => async (dispatch, getState) => {
  try {
    dispatch({type: UPDATE_CART_REQUEST})
    const {
      userLogin: {userInfo},
    } = getState()
    // const user = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null
    if (!userInfo) {
      let localCart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
      let isNew = true
      localCart ? localCart.forEach(function (i) {
        if (i.product == input.product) {
          i.quantity += input.quantity
          localStorage.setItem("cart",
            JSON.stringify([...localCart]))
          isNew = false;
        }
      }) : isNew = true
      if (isNew) {
        localCart = [...localCart, input]
        localStorage.setItem("cart", JSON.stringify(localCart))
      }
      dispatch({type: UPDATE_CART_SUCCESS, cartInfo: localCart})
    }

    const config = {
      params: {
        user: userInfo._id
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const {data} = axios.post("/api/cart", [{...input}], config)
    dispatch({type: UPDATE_CART_SUCCESS, cartInfo: data})
  } catch (error) {
    dispatch({
      type: UPDATE_CART_FAIL,
      cartInfo:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getCart = () => async (dispatch, getState) => {
  dispatch({type: GET_CART_REQUEST})
  try {
    const {
      userLogin: {userInfo},
    } = getState()
    if (userInfo) {
      const config = {
        params: {
          user: userInfo._id
        },
        headers: {
          // 'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const {data} = await axios.get("/api/cart", config)
      dispatch({type: GET_CART_SUCCESS, cartInfo: data})
    } else {
      const data = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : null
      dispatch({type: GET_CART_SUCCESS, cartInfo: data})
    }
  } catch (error) {
    dispatch({
      type: GET_CART_FAIL,
      cartInfo:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
