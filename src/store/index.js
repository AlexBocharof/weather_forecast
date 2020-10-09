import { combineReducers } from 'redux'
import citiesReducer from './reducers/citiesReducer'
import forecastReducer from './reducers/forecastReducer'

export default combineReducers({
  citiesReducer,
  forecastReducer
})