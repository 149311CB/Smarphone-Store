import axios from "axios";
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
  CREATE_RATING_REQUEST,
  CREATE_RATING_SUCCESS,
  CREATE_RATING_FAIL,
  GET_USER_RATING_REQUEST,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_SUCCESS,
  FUZZY_SEARCH_REQUEST,
  FUZZY_SEARCH_SUCCESS,
  FUZZY_SEARCH_FAIL
} from "../constants/ProductConstants";
import {logoutAction} from "./UserActions";
import {UPDATE_ORDER_STATUS_FAIL} from "../constants/OrderConstants";

export const listProducts = (input,currentpage) => async (dispatch) => {
  try {
    dispatch({type: PRODUCT_LIST_REQUEST});
    if (input !== "") {
      const {data} = await axios.get(`/api/products`, {params: {...input,page:currentpage,limit:12}});
      dispatch({type: PRODUCT_LIST_REQUEST_SUCCESS, products: data});
    }
    else {
      const {data} = await axios.get(`/api/products`);
      dispatch({type: PRODUCT_LIST_REQUEST_SUCCESS, products: data});
    }
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_REQUEST_FAIL,
      products:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const productDetail = (id) => async (dispatch) => {
  try {
    dispatch({type: PRODUCT_REQUEST});
    const {data} = await axios.get(`/api/products/${id}`)
    dispatch({type: PRODUCT_REQUEST_SUCCESS, product: data})
  } catch (error) {
    dispatch({
      type: PRODUCT_REQUEST_FAIL,
      products:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

export const updateProductAction=(id,input) => async (dispatch,getState) =>{
  try{
    dispatch({type:UPDATE_PRODUCT_REQUEST})
    const {
      userLogin: {userInfo},
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const {data} = await axios.put(`/api/products/${id}`,input,config)
    dispatch({type:UPDATE_PRODUCT_SUCCESS,message:data})
  }catch(error){
    const message =
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logoutAction())
    }
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      error: message,
    })
  }
}

export const similarProducts = (input) => async (dispatch) => {
  try {
    dispatch({type: GET_SIMILARS_REQUEST})
    // console.log(`/api/products/similars`, {params: {manufactor: "Apple"}})
    const {data} = await axios.get(`/api/products/similars`,
      {params: {manufactor: input}})
    dispatch({type: GET_SIMILARS_SUCCESS, similars: data})
  } catch (error) {
    dispatch({
      type: GET_SIMILARS_FAIL,
      products:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

export const createReviews = (product,input) => async(dispatch,getState) =>{
  try{
    dispatch({type:CREATE_RATING_REQUEST})
    const {
      userLogin: {userInfo},
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const {data} = await axios.post(`/api/products/${product}/reviews`,input,config)
    dispatch({type:CREATE_RATING_SUCCESS,ratingCreated:data})
  }catch(error){
    const message =
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logoutAction())
    }
    dispatch({
      type: CREATE_RATING_FAIL,
      error: message,
    })
  }
}

export const deleteProductAction=(id) =>async(dispatch,getState)=>{
  try{
    dispatch({type:DELETE_PRODUCT_REQUEST})
    const {
      userLogin: {userInfo},
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const {data} = await axios.delete(`/api/products/${id}`,config)
    dispatch({type:DELETE_PRODUCT_SUCCESS,message:data})
  }catch(error){
    const message =
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logoutAction())
    }
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      error: message,
    })
  }
}

export const createProductAction=(input)=>async(dispatch,getState)=>{
  try{
      dispatch({type:CREATE_PRODUCT_REQUEST})
    const {
      userLogin: {userInfo},
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    console.log(input)
    const {data} = await axios.post("/api/products",input,config)
    dispatch({type:CREATE_PRODUCT_SUCCESS,message:data})
  }catch(error){
    const message =
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logoutAction())
    }
    dispatch({
      type: CREATE_PRODUCT_FAIL,
      error: message,
    })
  }
}

export const fuzzySearchAction=(keyword,limit) =>async (dispatch,getState)=>{
  try {
    dispatch({type:FUZZY_SEARCH_REQUEST})
    const { data }  = await axios.get(`/api/products/fuzzy?keyword=${keyword}&limit=${limit}`)
    dispatch({type:FUZZY_SEARCH_SUCCESS,fuzzy:data})
  }catch(error){
    dispatch({
      type: FUZZY_SEARCH_FAIL,
      error:
          error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
    });
  }
}

