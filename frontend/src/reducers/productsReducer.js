import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  CLEAR_ERROR,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAL_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  CREATE_PRODUCT_REQ,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  CLEAR_STATE
} from "../constants/productsContants"

export const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCT_REQUEST:
      return {
        productsLoading: true,
        products: []
      }
    case ALL_PRODUCT_SUCCESS:
      return {
        ...state,
        productsLoading: false,
        products: action.payload.products,
        productsCount: action.payload.productsCount
      }
    case ALL_PRODUCT_FAIL: {
      return {
        ...state,
        products: [],
        productsLoading: false,
        error: action.payload
      }
    }
    case CLEAR_ERROR: {
      return {
        error: null
      }
    }
    default: {
      return state
    }
  }
}

export const productDetailReducer = (state = { product: [] }, action) => {
  switch (action.type) {
    case PRODUCT_DETAIL_REQUEST:
      return {
        detailLoading: true
      }
    case PRODUCT_DETAIL_SUCCESS:
      return {
        detailLoading: false,
        product: action.payload
      }
    case PRODUCT_DETAL_FAIL:
      return {
        detailLoading: false,
        error: action.payload
      }
    case CLEAR_ERROR:
      return {
        error: null
      }
    default:
      return state
  }
}

export const productDashboardReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PRODUCT_REQUEST:
    case DELETE_PRODUCT_REQUEST:
    case CREATE_PRODUCT_REQ:
      return {
        dashboardLoading: true
      }
    case UPDATE_PRODUCT_SUCCESS:
    case DELETE_PRODUCT_SUCCESS:
    case CREATE_PRODUCT_SUCCESS:
      return {
        dashboardLoading: false,
        response: action.payload.response
      }
    case UPDATE_PRODUCT_FAIL:
    case DELETE_PRODUCT_FAIL:
    case CREATE_PRODUCT_FAIL:
      return {
        dashboardLoading: false,
        error: action.payload
      }
    case CLEAR_STATE:
      return {
        state: {}
      }
    case CLEAR_ERROR:
      return {
        error: null
      }
    default:
      return state
  }
}
