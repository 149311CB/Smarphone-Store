import {CART_ADD_ITEM, CART_REMOVE_ITEM} from '../constants/CartConstants'

export const addToCart = (id, rom, ram, qty) => async (dispatch, getState) => {
  const {data} = await axios.get("/api/products/${id}")
  dispatch({type: CART_ADD_ITEM, product: {e}})
}
