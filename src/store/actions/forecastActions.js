import * as forecastTypes from '../types/forecastTypes';

export const loadWeather = (city) => (dispatch) => {
  dispatch({
    type: forecastTypes.LOAD_FORECAST,
  })

  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${process.env.REACT_APP_FORECAST_APP_OPENWEATHERMAP_API_KEY}`)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      dispatch({
        type: forecastTypes.SUCCESS_FORECAST,
        payload: data.list,
      })
    })
    .catch((err) => {
      dispatch({
        type: forecastTypes.ERROR_FORECAST,
        payload: err,
      })
    })
}

export const loadWeeklyForecast = (city) => (dispatch) => {
  if (city.lat) {
    dispatch({
      type: forecastTypes.LOAD_FORECAST,
    })

    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.lon}&units=metric&exclude=hourly,minutely&appid=${process.env.REACT_APP_FORECAST_APP_OPENWEATHERMAP_API_KEY}`)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        dispatch({
          type: forecastTypes.SUCCESS_WEEKLY_FORECAST,
          payload: data.daily,
        })
      })
      .catch((err) => {
        dispatch({
          type: forecastTypes.ERROR_FORECAST,
          payload: err,
        })
      })
  }
  
}