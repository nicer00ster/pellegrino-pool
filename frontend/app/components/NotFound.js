import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <React.Fragment>
    <h2>Page Not Found</h2>

    <Link to="/">Go home</Link>
  </React.Fragment>
);

export default NotFound;
