import * as citiesTypes from '../types/citiesTypes';

export const selectCity = (city) => (dispatch) => {
  if (city && city.value) {
    dispatch({
      type: citiesTypes.SELECT_CITY,
      payload: city.value,
    })
  }
}

export const addCity = (data) => (dispatch) => {(
  dispatch({
    type: citiesTypes.ADD_CITY,
    payload: data
  })
)}

export const removeCity = (data) => (dispatch) => {(
  dispatch({
    type: citiesTypes.REMOVE_CITY,
    payload: data
  })
)}

export const getCoordsCurrentCity = (data) => (dispatch) => {(
  dispatch({
    type: citiesTypes.GET_CURRENT_CITY_COORDS,
    payload: {lat: data.lat, lon: data.lon}
  })
)}

export const getCurrentCity = (data) => (dispatch) => {
  if (data.lat && data.lon) {
    dispatch({
      type: citiesTypes.LOAD_CITY,
    })

    fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${data.lat}&lon=${data.lon}&appid=${process.env.REACT_APP_FORECAST_APP_OPENWEATHERMAP_API_KEY}`)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      dispatch({
        type: citiesTypes.CURRENT_CITY_SUCCESS,
        payload: data,
      })
    })
    .catch((err) => {
      dispatch({
        type: citiesTypes.ERROR_CITY,
        payload: err,
      })
    })
  }
}

export const getSelectedCity = (city) => (dispatch) => {
  if (city) {
    dispatch({
      type: citiesTypes.LOAD_CITY,
    })

    fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${process.env.REACT_APP_FORECAST_APP_OPENWEATHERMAP_API_KEY}`)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      dispatch({
        type: citiesTypes.SELECTED_CITY_SUCCESS,
        payload: data,
      })
    })
    .catch((err) => {
      dispatch({
        type: citiesTypes.ERROR_CITY,
        payload: err,
      })
    })
  }
}