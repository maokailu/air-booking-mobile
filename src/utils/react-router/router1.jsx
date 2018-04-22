import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';

import PullView from '../PullView';


const App = () => (
  <div>
    <h1>App</h1>
    <ul>
      <li><Link to="/pullView">PullView</Link></li>
    </ul>
  </div>
);

const Home = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/pullView" component={PullView} />
    </Switch>
  </Router>
);

export default Home
;
