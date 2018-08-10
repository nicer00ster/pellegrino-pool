import React from 'react';
import NProgress from 'nprogress';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import App from './App';
import NotFound from './NotFound';
import Home from './Home';
import Ranking from './Ranking';
import Matches from './Matches';

const routes = [
  {
    title: 'Home',
    path: '/',
    exact: true,
    component: Home
  },
  {
    title: 'Register',
    path: '/register',
    component: Home
  },
  {
    title: 'Ranking',
    path: '/ranking',
    component: Ranking
  },
  {
    title: 'Matches',
    path: '/matches',
    component: Matches
  }
];

class Path extends React.Component {
  componentWillMount () {
    NProgress.start()
  };

  componentDidMount () {
    NProgress.done()
  };
  render() {
    return (
      <Route {...this.props} />
    );
  };
};

export default class Routes extends React.Component {
  componentWillMount () {
    NProgress.start()
  };

  componentDidMount () {
    NProgress.done()
  };
  render() {
    return (
      <Router>
        <App>
          <Switch>
            {routes.map((route, i) =>
              <Path key={i} {...route} />
            )}
          </Switch>
        </App>
      </Router>
    );
  };
};
