export const loadCities = (city) => {
  if (city && city.length > 2) {
    return fetch(`https://api.opencagedata.com/geocode/v1/json?key=${process.env.REACT_APP_FORECAST_APP_OPENCAGEDATA_API_KEY}&q=${city}&pretty=1&no_annotations=1`)
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.log(error);
      })
  }
}