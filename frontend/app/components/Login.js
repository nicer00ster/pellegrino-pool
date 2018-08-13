import React from 'react';
import { Link } from 'react-router-dom';

const Login = props => (
  <div className="auth">
    <h1>PELLEGRINO & POOL</h1>
    <p>Login</p>
    <input onChange={(e) => props.handleEmail(e)} type="email" placeholder="Email" />
    <input onChange={(e) => props.handlePassword(e)} type="password" placeholder="Password" />
    <button onClick={() => props.onLogin()}>Login</button>
    <div className="auth__register">
      <span>No account? Register<Link style={{ fontWeight: '800' }} to="/register">here</Link></span>
    </div>
  </div>
);

export default Login;
