import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_REQUEST_SUCCESS,
  PRODUCT_LIST_REQUEST_FAIL,
  PRODUCT_REQUEST,
  PRODUCT_REQUEST_SUCCESS,
  PRODUCT_REQUEST_FAIL,
  GET_SIMILARS_REQUEST,
  GET_SIMILARS_SUCCESS,
  GET_SIMILARS_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS, CREATE_PRODUCT_FAIL, FUZZY_SEARCH_REQUEST, FUZZY_SEARCH_SUCCESS, FUZZY_SEARCH_FAIL
} from "../constants/ProductConstants";

export const productListReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return {loading: true};
    case PRODUCT_LIST_REQUEST_SUCCESS:
      return {loading: false, products: action.products};
    case PRODUCT_LIST_REQUEST_FAIL:
      return {loading: false, error: action.products};
    case "FUZZY_SEARCH_RESULT":
      return {loading:false,products: action.products}
    default:
      return state;
  }
};

export const productReducer = (state = {product: {}}, action) => {
  switch (action.type) {
    case PRODUCT_REQUEST:
      return {loading: true, product: {}}
    case PRODUCT_REQUEST_SUCCESS:
      return {loading: false, product: action.product}
    case PRODUCT_REQUEST_FAIL:
      return {loading: false, error: action.product}
    default:
      return state;
  }
}

export const similarsReducer = (state = {similars: []}, action) => {
  switch (action.type) {
    case GET_SIMILARS_REQUEST:
      return {loading: true, similars: []}
    case GET_SIMILARS_SUCCESS:
      return {loading: false, similars: action.similars}
    case GET_SIMILARS_FAIL:
      return {loading: false, error: action.similars}
    default:
      return state;
  }
}

export const updateProductReducer = (state={},action)=>{
  switch (action.type){
    case UPDATE_PRODUCT_REQUEST:
      return {loading:true}
    case UPDATE_PRODUCT_SUCCESS:
      return {loading:false,message:action.message}
    case UPDATE_PRODUCT_FAIL:
      return {loading:false,error:action.error}
    default:
      return state
  }
}

export const deleteProductReducer=(state={},action)=>{
  switch (action.type){
    case DELETE_PRODUCT_REQUEST:
      return {loading:true}
    case DELETE_PRODUCT_SUCCESS:
      return {loading:false,message:action.message}
    case DELETE_PRODUCT_FAIL:
      return {loading:false,error:action.error}
    default:
      return state
  }
}

export const createProductReducer=(state={},action)=>{
  switch (action.type){
    case CREATE_PRODUCT_REQUEST:
      return {loading:true}
    case CREATE_PRODUCT_SUCCESS:
      return {loading:false,message:action.message}
    case CREATE_PRODUCT_FAIL:
      return {loading:false,error:action.error}
    default:
      return state
  }
}

export const fuzzySearchReducer=(state={},action) =>{
  switch (action.type){
    case FUZZY_SEARCH_REQUEST:
      return {loading:true}
    case FUZZY_SEARCH_SUCCESS:
      return {loading:false,fuzzy:action.fuzzy}
    case FUZZY_SEARCH_FAIL:
      return {loading:false,error:action.error}
    default:
      return state
  }
}
