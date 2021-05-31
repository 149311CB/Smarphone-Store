import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  GET_CART_FAIL,
  UPDATE_CART_REQUEST,
  UPDATE_CART_SUCCESS,
  UPDATE_CART_FAIL,
  REMOVE_FROM_CART_REQUEST,
  REMOVE_FROM_CART_SUCCESS,
  REMOVE_FROM_CART_FAIL,
  DELETE_CART_REQUEST,
  DELETE_CART_FAIL,
  DELETE_CART_SUCCESS
}
  from '../constants/CartConstants'
import axios from 'axios'
import {logoutAction} from "./UserActions";

export const addToCart = (input) => async (dispatch, getState) => {
  try {
    dispatch({type: UPDATE_CART_REQUEST})
    const {
      userLogin: {userInfo},
    } = getState()
    // const user = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null
    if (!userInfo) {
      let localCart = localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : null
      let isNew = true
      localCart ? localCart.products.forEach(function (i) {
        if (i.product._id == input.product) {
          i.quantity += input.quantity
          localStorage.setItem("cart",
            JSON.stringify([...localCart]))
          isNew = false;
        }
      }) : isNew = true
      if (isNew) {
        const {data} = await axios.post("/api/products/localcart", input)
        localCart = {...localCart, products: [{product: data, quantity: input.quantity}]}
        localStorage.setItem("cart", JSON.stringify(localCart))
      }
      dispatch({type: UPDATE_CART_SUCCESS, cartInfo: localCart})
      return;
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
    const {data} = axios.post("/api/cart", {...input}, config)
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
  try {
    dispatch({type: GET_CART_REQUEST})
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

export const removeFromCart = (input) => async (dispatch, getState) => {
  try {
    dispatch({type: REMOVE_FROM_CART_REQUEST})
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
      const {data} = await axios.post("/api/cart/remove", {...input}, config)
      dispatch({type: REMOVE_FROM_CART_SUCCESS, cartInfo: data})
      dispatch(getCart())
    }
  } catch (error) {
    dispatch({
      type: REMOVE_FROM_CART_FAIL,
      cartInfo:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteCart = (id)=>async (dispatch,getState) =>{
  try{
    dispatch({type:DELETE_CART_REQUEST})
    const {
      userLogin: {userInfo},
    } = getState()
    const config = {
      headers: {
        // 'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const {data} = await axios.delete(`/api/carts/${id}`,config)
    dispatch({type:DELETE_CART_SUCCESS})
  }catch(error){
    const message =
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logoutAction())
    }
    dispatch({
      type: DELETE_CART_FAIL,
      error: message,
    })
  }
}