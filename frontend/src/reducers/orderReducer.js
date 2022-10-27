import {
  ALL_USER_ORDERS_REQ,
  ALL_USER_ORDERS_SUCCESS,
  ALL_USER_ORDERS_FAIL,
  CLEAR_ERROR,
  ORDER_DETAIL_REQ,
  ORDER_DETAIL_SUCCESS,
  ORDER_DETAIL_FAIL,
  ALL_ORDERS_REQ,
  ALL_ORDERS_SUCCESS,
  ALL_ORDERS_FAIL,
} from '../constants/orderContants'


export const orderReducer = (state={orders: [], orderDetail: {}, orderCount: null}, action) => {
    switch(action.type) {
        case ALL_USER_ORDERS_REQ:
        case ALL_ORDERS_REQ:
            return {
                ...state,
                orderLoading: true,
            }
        case ALL_USER_ORDERS_SUCCESS:
            return {
                ...state,
                orders: action.payload,
                orderLoading: false
            }
        case ALL_USER_ORDERS_FAIL:
            return {
                ...state,
                orderLoading: false,
                error: action.payload
            }
        
        case ORDER_DETAIL_REQ:
            return {
                ...state,
                orderLoading: true
            }
        case ORDER_DETAIL_SUCCESS:
            return {
                ...state,
                orderDetail: action.payload,
                orderLoading: false
            }
        case ORDER_DETAIL_FAIL:
            return {
                ...state,
                orderLoading: false,
                error: action.payload
            }
        case ALL_ORDERS_SUCCESS:
            return {
                ...state,
                ordersCount: action.payload.ordersCount,
                orders: action.payload.orders,
                orderLoading: false
            }
        case ALL_ORDERS_FAIL:
            return {
                ...state,
                error: action.payload,
                orderLoading: false
            }
        case CLEAR_ERROR:
            return {
                error: null
            }
        default:
            return state
    }
}