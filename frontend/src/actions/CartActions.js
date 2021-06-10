import {
  ADD_TO_CART_FAIL,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  GET_CART_FAIL,
  GET_CART_REQUEST,
  GET_CART_SUCCESS, PUSH_CART_FAIL,
  PUSH_CART_REQUEST,
  PUSH_CART_SUCCESS,
  REMOVE_FROM_CART_FAIL,
  REMOVE_FROM_CART_REQUEST,
  REMOVE_FROM_CART_SUCCESS,
  UPDATE_CART_FAIL,
  UPDATE_CART_REQUEST,
  UPDATE_QTY_FAIL,
  UPDATE_QTY_REQUEST,
  UPDATE_QTY_SUCCESS,
} from "../constants/CartConstants";
import {logoutAction} from "./UserActions";
import axios from "axios"
import {CREATE_ORDER_FAIL} from "../constants/OrderConstants";

export const getCart = () => async (dispatch, getState) => {
  try {
    dispatch({type: GET_CART_REQUEST})
    const {
      userLogin: {userInfo},
    } = getState()
    if (!userInfo) {
      // Get cart from local storage
      const localCart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : null
      dispatch({type: GET_CART_SUCCESS, cartInfo: localCart})
        return;
    }

    const config = {
      headers: {
        // 'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const {data} = await axios.get(`/api/carts/`, config)
    dispatch({type: GET_CART_SUCCESS, cartInfo: data})
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logoutAction())
    }
    dispatch({
      type: GET_CART_FAIL,
      cartInfo: message,
    })
  }
}

export const addToCart = (input) => async (dispatch, getState) => {
  try {
    dispatch({type: ADD_TO_CART_REQUEST})
    const {
      userLogin: {userInfo},
    } = getState()
      if(!userInfo){
        const {data:product} = await axios.get(`/api/products/localcart/${input.product}`)
        let localCart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) :null
          if(localCart){
            let isNew = true
            localCart.products.forEach(function(c) {
              if(c.product._id === input.product){
                c.quantity +=input.quantity
                isNew = false
              }
            })
            if(isNew){
              localCart = {products:[...localCart.products,{product:product,quantity:input.quantity}]}
            }
            localStorage.setItem("cart",JSON.stringify(localCart))
          }else{
            localStorage.setItem("cart",JSON.stringify({products:[{ product:product, quantity:input.quantity}]}))
          }
        dispatch({type: ADD_TO_CART_SUCCESS, cartInfo: localCart})
        dispatch(getCart())
        return
      }
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const {data} = await axios.post("/api/carts/add", [input], config)
    dispatch({type: ADD_TO_CART_SUCCESS, cartInfo: data})
    dispatch(getCart())
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logoutAction())
    }
    dispatch({
      type: ADD_TO_CART_FAIL,
      cartInfo: message,
    })
  }
}

export const updateQty = (input) => async (dispatch, getState) => {
  try {
    dispatch({type: UPDATE_CART_REQUEST})
    const {
      userLogin: {userInfo},
    } = getState()
    if(!userInfo){
      let localCart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : null
      if(localCart){
        localCart.products.forEach(function (c){
          if(c.product._id === input.product){
            c.quantity = input.quantity
          }
        })
        localStorage.setItem("cart",JSON.stringify({...localCart}))
        console.log(localCart)
      }
      dispatch({type: UPDATE_QTY_SUCCESS, updatedCart: localCart})
      dispatch(getCart())
      return
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const {data} = await axios.post("/api/carts/updateqty", input, config)
    dispatch({type: UPDATE_QTY_SUCCESS, updatedCart: data})
    dispatch(getCart())
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logoutAction())
    }
    dispatch({
      type: UPDATE_QTY_FAIL,
      error: message,
    })
  }
}

export const removeFromCart = (input) => async (dispatch,getState)=>{
  try{
    dispatch({type:REMOVE_FROM_CART_REQUEST})
    const {
      userLogin: {userInfo},
    } = getState()
    if(!userInfo){
      // local storage
      const cart = JSON.parse(localStorage.getItem("cart"))
      cart.products.forEach(function(c){
        if(c.product._id == input.product){
          const index = cart.products.indexOf(c)
          cart.products.splice(index, 1)
        }
      })
      dispatch({type:REMOVE_FROM_CART_SUCCESS,cartInfo:cart})
      localStorage.setItem("cart",JSON.stringify(cart))
      dispatch(getCart())
      return;
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
      const {data} = await axios.post("/api/carts/remove", input, config)
      dispatch({type:REMOVE_FROM_CART_SUCCESS,cartInfo:data})

    dispatch(getCart())
  }catch(error){
    const message =
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logoutAction())
    }
    dispatch({
      type: REMOVE_FROM_CART_FAIL,
      error: message,
    })
  }
}

export const pushCartToServer=(input) =>async(dispatch,getState)=>{
  try{
    dispatch({type:PUSH_CART_REQUEST})
    const {
      userLogin: {userInfo},
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const {data} = await axios.post("/api/carts/pushcart",input,config)
    dispatch({type:PUSH_CART_SUCCESS, message:data})
  }catch(error){
    const message =
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logoutAction())
    }
    dispatch({
      type: PUSH_CART_FAIL,
      error: message,
    })
  }
}

const updateCart = (input) => async (dispatch, getState) => {
  try {
    dispatch({type: UPDATE_CART_REQUEST})
    const {
      userLogin: {userInfo},
    } = getState()
    if (!userInfo) {
      // update local cart
    }
  } catch (error) {

  }
}
