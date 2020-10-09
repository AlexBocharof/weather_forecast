import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { selectCity } from '../store/actions/citiesActions';
import { loadCities } from '../services/cityService';
import useDebounce from '../hooks/useDebounce';
import Select from 'react-select';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  link: {
    color: 'white',
    padding: '0px 10px',
    textDecoration: 'none'
  },
}));

const customStyles = {
  container: (provided) => ({
    ...provided,
    maxWidth: 400,
    width: '100%',
  }),
  option: (provided) => ({
    ...provided,
    color: 'gray',
  }),
}

const Navbar = ({selectCity, cities}) => {
  const classes = useStyles();

  const [searchValue, setSearchValue] = useState('')
  const [searchOptions, setSearchOptions] = useState([])

  const debouncedSearchValue = useDebounce(searchValue, 500);

  useEffect(() => {
    if (debouncedSearchValue) {
      findCity(debouncedSearchValue)
    }
  }, [debouncedSearchValue])

  useEffect(() => {
    if (cities.currentCity) {
      selectCity({value: cities.selectedCityName || cities.currentCity.name})
    }
  }, [cities.currentCity])

  const findCity = async (city) => {
    if (city && city.length > 2) {
      const data = await loadCities(city)
      setSearchOptions(
        data.results.filter(item => {
          return item.components._type === 'city'
        }).map(item => { 
          return { 
            label: `${item.components.city}, ${item.components.country}`,
            value: item.components.city
          }
        })
      )
    }
    
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            <Link to="/" className={classes.link}>
              HOME
            </Link>
            <Link to="/today" className={classes.link}>
              TODAY
            </Link>
            <Link to="/tomorrow" className={classes.link}>
              TOMORROW
            </Link>
            <Link to="/week" className={classes.link}>
              WEEK
            </Link>
          </Typography>
          <Select
            isClearable
            isSearchable
            styles={customStyles}
            name="city"
            options={searchOptions}
            onInputChange={value => setSearchValue(value)}
            onChange={value => {
              if (value) {
                selectCity(value)
              } else {
                selectCity({value: cities.currentCity.name})
              }
            }}
          />
        </Toolbar>
      </AppBar>
    </div>
  )
}

const mapStateToProps = (state) => ({
  cities: state.citiesReducer,
})

const mapDispatchToProps = (dispatch) => ({
  selectCity: (params) => dispatch(selectCity(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
