import React from 'react';
import { IoMdArrowBack } from 'react-icons/io';

const Register = props => (
  <div className="auth">
    <p>Sign Up</p>
    <input onChange={(e) => props.handleFirstName(e)} type="text" placeholder="First Name" />
    <input onChange={(e) => props.handleLastName(e)} type="text" placeholder="Last name" />
    <input onChange={(e) => props.handleEmail(e)} type="email" placeholder="Email" />
    <input onChange={(e) => props.handlePassword(e)} type="password" placeholder="Password" />
    <button onClick={() => props.onRegister()}>Register</button>
    <IoMdArrowBack onClick={() => props.history.goBack()} size={50} className="back__arrow" />
  </div>
);

export default Register;
