import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';

import PullView from '../PullView';


const Home = () => (
  <Router>
    <div>
      <h1>App</h1>
      <ul>
        <li><Link to="/pullView">PullView</Link></li>
      </ul>
      <Route path="/pullView" component={PullView} />
    </div>
  </Router>
)

export default Home