import axios from "axios";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_REQUEST_SUCCESS,
  PRODUCT_LIST_REQUEST_FAIL,
  PRODUCT_REQUEST, PRODUCT_REQUEST_SUCCESS, PRODUCT_REQUEST_FAIL
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
