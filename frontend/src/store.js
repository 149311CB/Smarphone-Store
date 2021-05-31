import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {productListReducer, productReducer, similarsReducer} from "./reducers/ProductReducer";
import {bannerListReducer, ratingByProductReducer} from './reducers/UltilsReducers'
import {filterReducer} from './reducers/FiltersReducers'
import {userLoginReducer, userRegisterReducer} from './reducers/UserReducers'
import {getCartReducer, addToCartReducer, removeFromCartReducer, deleteCartReducer} from './reducers/CartReducers'
import {getAddressListByUserReducer, getAddressByUserReducer, getCityListReducer, addAddressReducer} from './reducers/AddressReducers'
import {orderCreateReducer} from "./reducers/OrderReducers";

const reducer = combineReducers({
  productList: productListReducer,
  productDetail: productReducer,
  similars: similarsReducer,
  bannerList: bannerListReducer,
  filter: filterReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  addToCart: addToCartReducer,
  getCart: getCartReducer,
  removeFromCart: removeFromCartReducer,
  getAddressByUser: getAddressByUserReducer,
  cityList: getCityListReducer,
  addAddress: addAddressReducer,
  addressListByUser: getAddressListByUserReducer,
  orderCreated: orderCreateReducer,
  cartDeleted:deleteCartReducer
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null

const initialState = {
  userLogin: {userInfo: userInfoFromStorage}
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
