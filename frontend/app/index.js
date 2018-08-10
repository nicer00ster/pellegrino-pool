import React from 'react';
import { render } from 'react-dom';
import Routes from './components/Routes';

import './styles/index.scss';

render((
  <Routes />
), document.getElementById('app'));
