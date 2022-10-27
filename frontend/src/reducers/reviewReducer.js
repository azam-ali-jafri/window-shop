import {
  SUBMIT_REVIEW_FAIL,
  SUBMIT_REVIEW_SUCCESS,
  SUBMIT_REVIEW_REQ,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_REQ,
  CLEAR_RESPONSE
} from "../constants/reviewConstants"

export const reviewReducer = (state = { response: [] }, action) => {
  switch (action.type) {
    case SUBMIT_REVIEW_REQ:
    case DELETE_REVIEW_REQ:
      return {
        reviewLoading: true,
        ...state
      }
    case DELETE_REVIEW_SUCCESS:
    case SUBMIT_REVIEW_SUCCESS:
      return {
        reviewLoading: false,
        response: action.payload
      }
    case SUBMIT_REVIEW_FAIL:
    case DELETE_REVIEW_FAIL:
      return {
        reviewLoading: false,
        reviewError: action.payload
      }
    case CLEAR_RESPONSE:
      return {
        response: null
      }
    default:
      return state
  }
}
