import { ADD_TO_CART, REMOVE_FROM_CART, SAVE_SHIPPING_INFO } from '../constants/cartConstants'

export const cartReducer = (state = { cart: [], shippingInfo: {} }, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload
      const isExist = state.cart.find((i) => i.product._id == item.product._id)
      if (isExist) {
        state.cart.map((i) => {
          if (i.product._id === item.product._id) i.quantity = item.quantity
        })
      } else {
        state.cart.push(item)
      }
      window.localStorage.setItem('cartItems', JSON.stringify(state.cart))
      return state

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.product._id != action.payload),
      }

    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload
      }
    default:
      return state
  }
}
