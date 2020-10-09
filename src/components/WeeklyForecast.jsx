import React, { useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { loadWeather, loadWeeklyForecast } from '../store/actions/forecastActions';
import { getSelectedCity } from '../store/actions/citiesActions';
import { connect } from 'react-redux';

const useStyles = makeStyles({
  weekly_title: {
    paddingLeft: 30,
    paddingTop: 30,
  },
  weekly_forecast: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: 30,
  },
  day_card: {
    maxHeight: 150,
    width: 300,
    marginRight: 20,
    marginBottom: 20,
    padding: '30px 0px',
    display: 'flex',
    justifyContent: 'center',
    color: '#646464'
  },
  title: {
    fontWeight: 600,
    fontSize: 20
  }
});

const WeeklyForecast = ({ cities, forecast, loadWeeklyForecast, getSelectedCity }) => {
  const classes = useStyles();
  
  const start = new Date();
  const end = new Date();
  end.setDate(end.getDate()+5);
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const dayStart = `${monthNames[start.getMonth()]} ${start.getDate()}`;
  const dayEnd = `${monthNames[end.getMonth()]} ${end.getDate()}`;

  useEffect(() => {
    if (!cities.selectedCityName && cities.currentCityCoords) {
      loadWeeklyForecast({lat: cities.currentCityCoords.lat, lon: cities.currentCityCoords.lon});
    }
  }, [cities.currentCityCoords])

  useEffect(() => {
    if (cities.selectedCityName) {
      getSelectedCity(cities.selectedCityName);
    }
  }, [cities.selectedCityName])

  useEffect(() => {
    if (cities.selectedCity) {
      loadWeeklyForecast({lat: cities.selectedCity.coord.lat, lon: cities.selectedCity.coord.lon});
    }
  }, [cities.selectedCity])

  return (
    <>
      <div className={classes.weekly_title}>
        <Typography className={classes.title}>
          WEEK
        </Typography>
        <Typography>{dayStart}-{dayEnd}</Typography>
      </div>
      <div className={classes.weekly_forecast}>
        { !forecast.isLoading && forecast.weeklyForecast && forecast.weeklyForecast.slice(0,7).map(item => 
          <Card key={item.dt} className={classes.day_card}>
            <CardContent>
              <Typography className={classes.title}>
                {`${new Date(item.dt * 1000)}`.slice(4, 16)}
              </Typography>
              <Typography className={classes.card_info}>
                {item.weather[0].main} <br />
                {item.temp.min}-{item.temp.max} °C<br />
                Wind {item.wind_speed} m/sec
              </Typography>
            </CardContent>
          </Card>
        )
        }
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  cities: state.citiesReducer,
  forecast: state.forecastReducer
})

const mapDispatchToProps = (dispatch) => ({
  loadWeather: (params) => dispatch(loadWeather(params)),
  getSelectedCity: (params) => dispatch(getSelectedCity(params)),
  loadWeeklyForecast: (params) => dispatch(loadWeeklyForecast(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(WeeklyForecast)
