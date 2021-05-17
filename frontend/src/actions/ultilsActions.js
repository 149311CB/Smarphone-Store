import axios from 'axios'
import {BANNER_REQUEST, BANNER_REQUEST_SUCCESS, BANNER_REQUEST_FAIL} from '../constants/UltilsConstants'

export const bannerListAction = () => async (dispatch) => {
  try {
    dispatch({type: BANNER_REQUEST});
    const {data} = await axios.get("/api/ultils/banners");
    dispatch({type: BANNER_REQUEST_SUCCESS, banners: data})
  } catch (error) {
    dispatch({
      type: BANNER_REQUEST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
