import {CART_ADD_ITEM, CART_REMOVE_ITEM} from '../constants/CartConstants'

const addToCartReducer = (state = {cartItems: [], shippingAddress: {}}, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.product
      const existItem = state.cartItems.find(x => x.product === item.product);
  }
}
