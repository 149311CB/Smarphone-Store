import {
    GET_WARRANTY_LIST_FAIL,
    GET_WARRANTY_LIST_REQUEST,
    GET_WARRANTY_LIST_SUCCESS
} from "../constants/warrantyConstants";
import axios from "axios";

export const getWarrantyListAction=() =>async (dispatch) =>{
    try{
        dispatch({type:GET_WARRANTY_LIST_REQUEST})
        const {data} = await axios.get("/api/warranties")
        dispatch({type:GET_WARRANTY_LIST_SUCCESS,warrantyList:data})
    }catch(error){
        dispatch({
            type: GET_WARRANTY_LIST_FAIL,
            error:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}