import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { getCurrentCity, getCoordsCurrentCity, addCity, removeCity } from '../store/actions/citiesActions';
import { connect } from 'react-redux';

const useStyles = makeStyles({
  main: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 30,
    paddingBottom: 30,
  },
  temp: {
    display: 'flex',
    justifyContent: 'center',
    fontWeight: 600,
    fontSize: 30
  },
  info: {
    display: 'flex',
    justifyContent: 'center',
  },
  add_button: {
    position: 'absolute',
    right: 10
  }
});

const CurrentCity = ({ cities, getCurrentCity, getCoordsCurrentCity, home, addCity, removeCity}) => {
  const classes = useStyles();

  const [city, setCity] = useState(null)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getCoordsCurrentCity({lat: position.coords.latitude, lon: position.coords.longitude});
    })
  }, [])

  useEffect(() => {
    getCurrentCity({ lat: cities.currentCityCoords.lat, lon: cities.currentCityCoords.lon});
  }, [cities.currentCityCoords])

  useEffect(() => {
    if (home) {
      setCity(cities.currentCity)
    } else {
      setCity(cities.selectedCity)
    }
  })


  return (
    <>
    <div className={classes.main}>
      {city &&
        <>
          <Typography className={classes.temp}>
            {city.main.temp} °C
          </Typography>
          <Typography className={classes.info}>
            {city.name}, {city.sys.country} <br />
          </Typography>
          <Typography className={classes.info}>
            {city.weather[0].description[0].toUpperCase() + city.weather[0].description.slice(1)}, wind: {cities.currentCity.wind.speed} m/sec
          </Typography>
          <div className={classes.add_button}>
            { cities.savedCities.includes(city.name)
              ? <CheckCircleOutlineIcon onClick={() => removeCity(city.name)} fontSize='large'/>
              : <AddCircleOutlineIcon onClick={() => addCity(city.name)} fontSize='large'/>
            }
          </div>
        </>
      }
    </div>
    <Divider />
    </>
  );
}

const mapStateToProps = (state) => ({
  cities: state.citiesReducer,
})

const mapDispatchToProps = (dispatch) => ({
  getCurrentCity: (params) => dispatch(getCurrentCity(params)),
  getCoordsCurrentCity: (params) => dispatch(getCoordsCurrentCity(params)),
  addCity: (params) => dispatch(addCity(params)),
  removeCity: (params) => dispatch(removeCity(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CurrentCity)