import * as forecastTypes from '../types/forecastTypes';

const initialState = {
  isLoading: false,
  selectedCityWeather: [],
  weeklyForecast: [],
  error: [],
}

export default function (state = initialState, {
  type,
  payload
}) {
  switch (type) {
    case forecastTypes.LOAD_FORECAST:
      return {
        ...state,
        isLoading: true,
      }
    case forecastTypes.SUCCESS_FORECAST:
      return {
        ...state,
        selectedCityWeather: payload,
          isLoading: false,
      }
    case forecastTypes.SUCCESS_WEEKLY_FORECAST:
      return {
        ...state,
        weeklyForecast: payload,
          isLoading: false,
      }
    case forecastTypes.ERROR_FORECAST:
      return {
        ...state,
        isLoading: false,
        error: payload,
      }
    default:
      return state
  }
}