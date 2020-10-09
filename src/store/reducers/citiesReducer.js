import * as citiesTypes from '../types/citiesTypes';

const initialState = {
  currentCityCoords: {
    lat: null,
    lon: null,
  },
  currentCity: null,
  isLoading: false,
  selectedCityName: null,
  selectedCity: null,
  savedCities: [],
}

export default function (state = initialState, {
  type,
  payload
}) {
  switch (type) {
    case citiesTypes.LOAD_CITY:
      return {
        ...state,
        isLoading: true,
      }
    case citiesTypes.GET_CURRENT_CITY_COORDS:
      return {
        ...state,
        currentCityCoords: {
          lat: payload.lat,
          lon: payload.lon,
        }
      }
    case citiesTypes.CURRENT_CITY_SUCCESS:
      return {
        ...state,
        currentCity: payload,
          isLoading: false,
      }
    case citiesTypes.SELECTED_CITY_SUCCESS:
      return {
        ...state,
        selectedCity: payload,
          isLoading: false,
      }
    case citiesTypes.SELECT_CITY:
      return {
        ...state,
        selectedCityName: payload,
        isLoading: true,
      }
    case citiesTypes.REMOVE_CITY: 
    {
      return {
        ...state,
        savedCities: state.savedCities.filter(item => item !== payload),
      }
    }
    case citiesTypes.ADD_CITY: 
    {
      return {
        ...state,
        savedCities: state.savedCities.includes(payload) ? [...state.savedCities] : [...state.savedCities, payload],
      }
    }
    case citiesTypes.ERROR_CITY:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}