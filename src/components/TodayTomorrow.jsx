import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Map,  Marker, Popup, TileLayer } from  'react-leaflet';
import { loadWeather } from '../store/actions/forecastActions';
import { getSelectedCity } from '../store/actions/citiesActions';
import { connect } from 'react-redux';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

const useStyles = makeStyles({
  today_tomorrow_main: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 30,
  },
  title: {
    fontWeight: 600,
    fontSize: 20
  },
  info: {
    flex: 2,
    paddingRight: 20,
  },
  map: {
    flex: 3,
    height: '300px'
  },
});

const TodayTomorrowForecast = ({ today, cities, forecast, loadWeather, getSelectedCity }) => {
  const classes = useStyles();

  const [dailyForecast, setDailyForecast] = useState([]);

  const now = new Date();
  const next = new Date();
  next.setDate(next.getDate()+1)
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const [day, setDay] = useState('')


  useEffect(() => {
    if (cities.selectedCityName) {
      loadWeather(cities.selectedCityName);
      getSelectedCity(cities.selectedCityName);
    }
  }, [cities.selectedCityName])

  useEffect(() => {
    if(forecast.selectedCityWeather) {
      if (today) {
        const today = `${now.getFullYear()}-${('0'+(next.getMonth()+1)).slice(-2)}-${('0'+(now.getDate())).slice(-2)}`
        setDailyForecast(forecast.selectedCityWeather.filter(item => item.dt_txt.includes(today)))
      } else {
        const tomorrow = `${next.getFullYear()}-${('0'+(next.getMonth()+1)).slice(-2)}-${('0'+(next.getDate())).slice(-2)}`
        setDailyForecast(forecast.selectedCityWeather.filter(item => item.dt_txt.includes(tomorrow)))
      }
    }
    setDay(
      today ? `${monthNames[now.getMonth()]} ${now.getDate()}`
            : `${monthNames[next.getMonth()]} ${next.getDate()}`
    )
  }, [forecast.selectedCityWeather, today])

  return (
    <div className={classes.today_tomorrow_main}>
      <div className={classes.info}>
        <div className={classes.today_tomorrow_title}>
          <Typography className={classes.title}>
            {today ? 'TODAY' : 'TOMORROW'}
          </Typography>
          <Typography>{day}</Typography>
        </div>
        { dailyForecast &&
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Time</TableCell>
                <TableCell>Weather</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dailyForecast.map((item) => (
                <TableRow key={item.dt}>
                  <TableCell>{item.dt_txt.slice(-8,-3)}</TableCell>
                  <TableCell>{item.main.temp + ' °C, ' + item.weather[0].main + ', Wind - ' + item.wind.speed + ' m/sec'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        }
      </div>
      <div className={classes.map}>
        { cities.selectedCity &&
          <Map center={[cities.selectedCity.coord.lat,cities.selectedCity.coord.lon]} zoom={13} style={{width:  '100%', height: '100%'}}>
            <Marker position={[cities.selectedCity.coord.lat,cities.selectedCity.coord.lon]}>
              <Popup className={classes.popup}>
                Tempreture: {cities.selectedCity.main.temp} °C<br />
                Feels like: {cities.selectedCity.main.feels_like} °C<br />
                {cities.selectedCity.weather[0].description[0].toUpperCase() + cities.selectedCity.weather[0].description.slice(1)}<br /> 
                Wind: {cities.selectedCity.wind.speed} m/sec
              </Popup>
            </Marker>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </Map>
        }
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  cities: state.citiesReducer,
  forecast: state.forecastReducer
})

const mapDispatchToProps = (dispatch) => ({
  loadWeather: (params) => dispatch(loadWeather(params)),
  getSelectedCity: (params) => dispatch(getSelectedCity(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TodayTomorrowForecast)
