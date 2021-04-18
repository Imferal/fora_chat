import dataReducer from './data.reducer'
import loginReducer from "./login.reducer"
import {combineReducers, createStore} from "redux";

// Собираем редюсеры
let reducers = combineReducers({
  data: dataReducer,
  login: loginReducer,
})

let store = createStore(reducers)

export default store