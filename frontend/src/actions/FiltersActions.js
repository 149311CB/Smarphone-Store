import {PRICE_CLEAR_REQUEST, FILTER_UPDATE_REQUEST, MANUFACTOR_CLEAR_REQUEST, ROM_CLEAR_REQUEST, RAM_CLEAR_REQUEST} from '../constants/FilterConstants'

export const filterAction = (type, filter) => async (dispatch) => {
  if (type === "update") {
    dispatch({type: FILTER_UPDATE_REQUEST, filter: filter})
  } else if (type === "price") {
    dispatch({type: PRICE_CLEAR_REQUEST, filter: filter})
  } else if (type === "manufactor") {
    dispatch({type: MANUFACTOR_CLEAR_REQUEST, filter: filter})
  } else if (type === "rom") {
    dispatch({type: ROM_CLEAR_REQUEST, filter: filter})
  } else if (type === "ram") {
    dispatch({type: RAM_CLEAR_REQUEST, filter: filter})
  }
}
