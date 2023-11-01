import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import Axios from 'axios';

import './Forms.css';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    image: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
    setErrors({ ...errors, [input.name]: '' }); // Clear errors when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = 'https://opendevweb-51212536012a.herokuapp.com/api/createUser';
      const { data: res } = await Axios.post(url, data);
      console.log(res.message);
      window.location = '/SignIn';
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        const errorData = error.response.data;
        setErrors({
          username: errorData.username ? errorData.username : 'User name already exists!',
          email: errorData.email ? errorData.email : 'Email belongs to an existing account!',
          password: errorData.password ? errorData.password : '',
        });
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      <form className="form">
        <label>Username:</label>
        <input className='uname' id='username' onChange={handleChange} name="username" type="text" placeholder="Enter your username" required />
        {errors.username && <p className='signup-username-error-message'>{errors.username}</p>}

        <label>Email:</label>
        <input className='email' id='email' onChange={handleChange} name="email" type="email" placeholder="Enter your email" required />
        {errors.email && <p className='signup-email-error-message'>{errors.email}</p>}

        <label>Password:</label>
        <input className='password' id='password' onChange={handleChange} name="password" type="password" placeholder="Enter your password" required />
        {errors.password && <p className='signup-password-error-message'>{errors.password}</p>}

        <br></br>

        <div className="form-footer">
          <p> Already Have An Account? <Nav.Link href='/SignIn' style={{ textDecoration: 'none', color: '#fc525e', fontWeight: '700' }}>Login</Nav.Link></p>
        </div>
      </form>
      <br></br>
      <br></br>
      <button className='subbut' onClick={handleSubmit}>Done</button>
    </div>
  );
};

export default SignUp;