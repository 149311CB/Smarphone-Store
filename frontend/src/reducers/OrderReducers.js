import {CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS} from "../constants/OrderConstants";
import {USER_LOGOUT} from "../constants/LoginConstants";

export const orderCreateReducer =(state={},action)=>{
    switch (action.type){
        case CREATE_ORDER_REQUEST:
            return {loading:true}
        case CREATE_ORDER_SUCCESS:
            return {loading:false,orderCreated:action.orderCreated}
        case CREATE_ORDER_FAIL:
            return {loading:false,error:action.error}
        default:
            return state
    }
}

export const checkoutPendingReducer=(state ={}, action)=>{
    switch (action.type){
        case "CHECKOUT_PENDING":
            return {isCheckout:true}
        case "CHECKOUT_NOT_PENDING":
            return {}
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}