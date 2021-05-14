import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {productListReducer} from "./reducers/ProductReducer";
import {bannerListReducer} from './reducers/UltilsReducers'

const reducer = combineReducers({
  productList: productListReducer,
  bannerList: bannerListReducer
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
