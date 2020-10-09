import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { selectCity, removeCity } from '../store/actions/citiesActions';
import { connect } from 'react-redux';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  cityList: {
    display: 'flex',
    padding: 30,
    flexWrap: 'wrap',
  },
  city_card: {
    position: 'relative',
    marginRight: 20,
    marginBottom: 20,
    '&:hover': {
      cursor: 'pointer'
    }
  },
  title: {
    fontWeight: 600,
    fontSize: 20,
    paddingTop: 30,
    paddingLeft: 30,
  },
  card_title: {
    display: 'flex',
    justifyContent: 'center',
    fontWeight: 600,
    fontSize: 30,
  },
  remove_icon: {
    position: 'absolute',
    right: 0,
  }
});

const SavedCities = ({cities, selectCity, removeCity, history}) => {
  const classes = useStyles();

  return (
    <>
      <Typography className={classes.title}>SAVED CITIES</Typography>
      <div className={classes.cityList}>
        { cities.savedCities.length !== 0 && cities.savedCities.map(item => 
          <Card className={classes.city_card} key={item} onClick={() => {
            selectCity({value: item});
            history.push('/today');
          }}>
            <HighlightOffIcon className={classes.remove_icon} onClick={() => removeCity(item)}/>
            <CardContent>
              <Typography className={classes.card_title}>{item}</Typography>
            </CardContent>
          </Card>
        )
        }
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  cities: state.citiesReducer,
})

const mapDispatchToProps = (dispatch) => ({
  selectCity: (params) => dispatch(selectCity(params)),
  removeCity: (params) => dispatch(removeCity(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SavedCities)