import {BANNER_REQUEST, BANNER_REQUEST_SUCCESS, BANNER_REQUEST_FAIL, RATING_LIST_BY_PRODUCT_REQUEST, RATING_LIST_BY_PRODUCT_REQUEST_SUCCESS, RATING_LIST_BY_PRODUCT_REQUEST_FAIL} from '../constants/UltilsConstants'

export const bannerListReducer = (state = {banners: []}, action) => {
  switch (action.type) {
    case BANNER_REQUEST:
      return {loading: true, banners: []}
    case BANNER_REQUEST_SUCCESS:
      return {loading: false, banners: action.banners}
    case BANNER_REQUEST_FAIL:
      return {loading: false, banners: action.error}
    default:
      return state
  }
}
