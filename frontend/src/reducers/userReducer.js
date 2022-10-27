export const userReducer = (state = { user: null }, action) => {
  switch (action.type) {
    case "LOAD_USER_REQUEST":
      return {
        ...state,
        isAuthenticated: false,
        userLoading: true
      }
    case "LOAD_USER_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        userLoading: false
      }
    case "LOAD_USER_FAIL":
      return {
        ...state,
        userLoading: false,
        isAuthenticated: false,
        user: {},
        error: action.payload
      }

    default:
      return state
  }
}
