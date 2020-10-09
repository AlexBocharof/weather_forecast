import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import SavedCities from './components/SavedCities';
import TodayTomorrow from './components/TodayTomorrow';
import Navbar from './components/Navbar';
import CurrentCity from './components/CurrentCity';
import WeeklyForecast from './components/WeeklyForecast'

const App = () => {

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={({history}) => (
          <>
            <CurrentCity home />
            <SavedCities history={history} />
          </>
        )}/>
        <Route path="/today">
          <CurrentCity />
          <TodayTomorrow today />
        </Route>
        <Route path="/tomorrow">
          <CurrentCity />
          <TodayTomorrow />
        </Route>      
        <Route path="/week">
          <CurrentCity />
          <WeeklyForecast />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
