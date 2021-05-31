import axios from "axios";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_REQUEST_SUCCESS,
  PRODUCT_LIST_REQUEST_FAIL,
  PRODUCT_REQUEST, PRODUCT_REQUEST_SUCCESS, PRODUCT_REQUEST_FAIL,
  GET_SIMILARS_REQUEST, GET_SIMILARS_SUCCESS, GET_SIMILARS_FAIL,
  CREATE_RATING_REQUEST, CREATE_RATING_SUCCESS, CREATE_RATING_FAIL
} from "../constants/ProductConstants";

export const listProducts = (input) => async (dispatch) => {
  try {
    dispatch({type: PRODUCT_LIST_REQUEST});
    if (input !== "") {
      const {data} = await axios.get(`/api/products`, {params: {...input}});
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
    console.log(id)
    const {data} = await axios.get(`/api/products/${id}`)
    dispatch({type: PRODUCT_REQUEST_SUCCESS, product: data})
    console.log(data)
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

export const createRatingAction = (input) => async (dispatch) => {
  try {
    dispatch({type: CREATE_RATING_REQUEST})
    const {data} = axios.post("")
  } catch (error) {
  }
}
