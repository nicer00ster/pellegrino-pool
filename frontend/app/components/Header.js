import React from 'react';
import { Link } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

const Header = props => (
  <header>
    <Link to="/"><img className="logo" src="http://freevector.co/wp-content/uploads/2013/05/75755-billiard-balls-with-triangle.png"  alt="Cool looking pool logo" /></Link>
    <nav>
      <Link to="/rankings">RANKINGS</Link>
      <Link to="/matches">MATCHES</Link>
      <FiLogOut className="logout" onClick={() => props.onLogout()} size={25}/>
      <hr />
    </nav>

  </header>
);

export default Header;
