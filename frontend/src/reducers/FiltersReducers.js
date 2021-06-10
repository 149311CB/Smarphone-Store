import {FILTER_UPDATE_REQUEST, PRICE_CLEAR_REQUEST, MANUFACTOR_CLEAR_REQUEST, ROM_CLEAR_REQUEST, RAM_CLEAR_REQUEST} from '../constants/FilterConstants'

//state is previous one?
export const filterReducer = (state, action) => {
  switch (action.type) {
    case FILTER_UPDATE_REQUEST:
      return {filter: {...state.filter, ...action.filter}}
    case PRICE_CLEAR_REQUEST:
      delete state["filter"]["minprice"]
      delete state["filter"]["maxprice"]
      return {filter: {...state.filter}}
    case MANUFACTOR_CLEAR_REQUEST:
      delete state["filter"]["manufactor"]
      return {filter: {...state.filter}}
    case ROM_CLEAR_REQUEST:
      delete state["filter"]["minrom"]
      delete state["filter"]["maxrom"]
      return {filter: {...state.filter}}
    case RAM_CLEAR_REQUEST:
      delete state["filter"]["minram"]
      delete state["filter"]["maxram"]
      return {filter: {...state.filter}}
    default:
      return state ? state : ""
  }
}
