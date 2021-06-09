import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {
  createProductReducer,
  deleteProductReducer, fuzzySearchReducer,
  productListReducer,
  productReducer,
  similarsReducer,
  updateProductReducer
} from "./reducers/ProductReducer";
import {bannerListReducer, ratingByProductReducer} from './reducers/UltilsReducers'
import {filterReducer} from './reducers/FiltersReducers'
import {
  createRatingReducer, deleteUserReducer, getUserByIdReducer, getUserListReducer, getUserProfileReducer,
  getUserRatingReducer, updateUserByIdReducer, updateUserProfileReducer,
  userLoginReducer,
  userLogoutReducer,
  userRegisterReducer
} from './reducers/UserReducers'
import {
  getCartReducer,
  addToCartReducer,
  removeFromCartReducer,
  deleteCartReducer,
  pushCartReducer
} from './reducers/CartReducers'
import {getAddressListByUserReducer, getAddressByUserReducer, getCityListReducer, addAddressReducer} from './reducers/AddressReducers'
import {
  checkoutPendingReducer, deleteOrderByIdReducer,
  getOrderDetailByIdReducer,
  getOrderListByUserReducer, getOrderListReducer,
  orderCreateReducer, updateOrderStatusReducer
} from "./reducers/OrderReducers";
import {getWarrantyListReducer} from "./reducers/WarrantyReducer";

const reducer = combineReducers({
  productList: productListReducer,
  productDetail: productReducer,
  similars: similarsReducer,
  bannerList: bannerListReducer,
  filter: filterReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userLogout:userLogoutReducer,
  addToCart: addToCartReducer,
  getCart: getCartReducer,
  removeFromCart: removeFromCartReducer,
  pushCart:pushCartReducer,
  getAddressByUser: getAddressByUserReducer,
  cityList: getCityListReducer,
  addAddress: addAddressReducer,
  addressListByUser: getAddressListByUserReducer,
  orderCreated: orderCreateReducer,
  cartDeleted:deleteCartReducer,
  checkoutPending:checkoutPendingReducer,
  getUserRating:getUserRatingReducer,
  createRating:createRatingReducer,
  getUserProfile:getUserProfileReducer,
  updateUserProfile:updateUserProfileReducer,
  getOrderListByUser:getOrderListByUserReducer,
  getOrderDetails:getOrderDetailByIdReducer,
  updateOrderStatus:updateOrderStatusReducer,
  getUserList:getUserListReducer,
  deleteUser:deleteUserReducer,
  getUserById:getUserByIdReducer,
  updateUserById:updateUserByIdReducer,
  getOrderList:getOrderListReducer,
  deleteOrderById:deleteOrderByIdReducer,
  getWarrantyList:getWarrantyListReducer,
  updateProduct:updateProductReducer,
  deleteProduct:deleteProductReducer,
  createProduct:createProductReducer,
  fuzzySearch:fuzzySearchReducer
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
