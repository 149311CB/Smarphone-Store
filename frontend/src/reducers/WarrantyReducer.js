import {
    GET_WARRANTY_LIST_FAIL,
    GET_WARRANTY_LIST_REQUEST,
    GET_WARRANTY_LIST_SUCCESS
} from "../constants/warrantyConstants";

export const getWarrantyListReducer =(state={},action) =>{
    switch (action.type){
        case GET_WARRANTY_LIST_REQUEST:
            return {loading:true}
        case GET_WARRANTY_LIST_SUCCESS:
            return {loading:false,warrantyList:action.warrantyList}
        case GET_WARRANTY_LIST_FAIL:
            return {loading:false,error:action.error}
        default:
            return state
    }
}