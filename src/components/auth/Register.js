import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    action: 'create_user',
    display_name: '',
    user_email: '',
    user_pass: ''
  });

  const { action, display_name, user_email, user_pass, password2 } = formData;
  // 'setState' of a copy of 'formData' with the new 'e.target.value'
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (user_pass !== password2) {
      console.log('Password differ');
    } else {
      console.log(formData);
      const newUser = {
        action,
        display_name,
        user_email,
        user_pass
      };
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };
        const body = JSON.stringify(newUser);
        const res = await axios.post(
          '/?wpwhpro_action=user_email&wpwhpro_api_key=w18calz44khe1bquays7yvio8bhp0dkkqumz0gkmvialfx2vmylxmlwdtalmme3y',
          body,
          config
        );
        console.log(res.data);
      } catch (err) {
        console.error(err.message);
      }
    }
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Register</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="display_name"
            value={display_name}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="user_email"
            value={user_email}
            onChange={e => onChange(e)}
            required
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="user_pass"
            minLength="6"
            value={user_pass}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value={password2}
            onChange={e => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};

export default Register;
