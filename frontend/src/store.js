import { combineReducers, createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { userReducer } from "./reducers/userReducer"

const reducer = combineReducers({
  user: userReducer
})

const middleware = [thunk] // thunk middleware for making async calls in dispatch funtions

const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)))

export default store
