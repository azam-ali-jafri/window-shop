import axios from "axios"

export const loadUser = () => async dispatch => {
  try {
    dispatch({ type: "LOAD_USER_REQUEST" })
    const { data } = await axios.get("/api/v1/loaduser")
    dispatch({ type: "LOAD_USER_SUCCESS", payload: data.user })
  } catch (error) {
    dispatch({ type: "LOAD_USER_FAIL", payload: error.response.data.message })
  }
}
