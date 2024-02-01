import React, { useState } from 'react';
import './login.css'; 
import { ColorRing } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import { authInstance } from '../services/instance';

const Login = () => {
  const [activeForm, setActiveForm] = useState('login');
  const [userRole, setUserRole] = useState('customer');
  const [msg, setMsg] = useState('');
  const [msg1, setMsg1] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    userRole: 'customer',
  });

  const switchForm = (formType) => {
    setActiveForm(formType);
  };

  const handleRoleChange = (e) => {
    setUserRole(e.target.value);
  };

  const handleLoginChange = (e) => {
    const { name, value, type } = e.target;
    setLoginData({
      ...loginData,
      [name]: type === 'radio' ? value : value,
    });
  };

  const handleSignupChange = (e) => {
    const { name, value, type } = e.target;
    setSignupData({
      ...signupData,
      [name]: type === 'radio' ? value : value,
    });
  };

  const signupSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      // console.log('Registering the User...');

      const res = await authInstance.post('/', signupData);

      if (res.data) {
        // console.log('User Registered successfully ', res.data);
            
        const email = signupData.email;
                
        const activationMail = await authInstance.post(`/active-link/${email}`, { email });
        if (activationMail) {
          setLoading(false);
        
          setSignupData({
            name: '',
            email: '',
            password: '',
            userRole: 'customer',
          });
          return setMsg('Activation Mail Sent Successfull to your Mail');
        }
        else {
          return setMsg("Can't sent Activation Link");
        }
      }
    } catch (error) {
      return setMsg('Error While SigningUp', error);
    }
        
  };

  const loginSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const user = await authInstance.post('/signin', loginData)
      sessionStorage.setItem('User', JSON.stringify(user.data));
      console.log(user.data)
      setLoading(false);
      setMsg1(user.data.message)
      console.log('login Done', user.data)
      if (msg1 == 'Password is incorrect' || msg1 == 'User not found!') {
        sessionStorage.clear();
        setLoading(false);
        setMsg1('Password is incorrect or User not found!');
      }
      else {
        if (user.data.user.userRole == 'admin') {
          navigate('/dashboard')
        }
        else {
          navigate('/products')
        }
      }
      setLoginData({
        email: '',
        password: ''
      })
    } catch (e) {
      console.log('Error in signin', e);
    }

  };

  return (
    <div className=' container-fluid color'>
       <section className="forms-section">
      <h1 className="section-title">Welcome to CRM</h1>
      <div className="forms">
        <div className={`form-wrapper ${activeForm === 'login' ? 'is-active' : ''}`}>
          <button
            type="button"
            className="switcher switcher-login"
            onClick={() => switchForm('login')}
          >
            Login
            <span className="underline"></span>
          </button>
          <form className={`form form-login ${activeForm === 'login' ? 'is-active' : ''}`} onSubmit={loginSubmit}>
            <fieldset>
              <legend>Please, enter your email and password for login.</legend>
              <div className="input-block">
                <label htmlFor="login-email">E-mail</label>
                <input
                  id="login-email"
                  type="email"
                  name="email"
                  required
                  value={loginData.email}
                  onChange={handleLoginChange}
                />
              </div>
              <div className="input-block">
                <label htmlFor="login-password">Password</label>
                <input
                  id="login-password"
                  type="password"
                  name="password"
                  required
                  value={loginData.password}
                  onChange={handleLoginChange}
                />
              </div>
            </fieldset>
            {
              <h3>{msg1}</h3>
            }
               
            <div>
              {loading ? (
                <button type="submit" className="btn-login"><ColorRing
                  visible={true}
                  height="40"
                  width="40"
                  ariaLabel="color-ring-loading"
                  wrapperStyle={{}}
                  wrapperClass="color-ring-wrapper"
                  colors={['#abbd81', '#f8b26a', '#849b87', '#e15b64', '#f47e60']}
                /></button>
              ) : (
                <button type="submit" className="btn-login">Login</button>
              )}
              <h3><Link to='/reset-password' className='mx-3'>Reset Password</Link></h3>
            </div>
          </form>
        </div>
        <div className={`form-wrapper ${activeForm === 'signup' ? 'is-active' : ''}`}>
          <button
            type="button"
            className="switcher switcher-signup"
            onClick={() => switchForm('signup')}
          >
            Sign Up
            <span className="underline"></span>
          </button>
          <form className={`form form-signup ${activeForm === 'signup' ? 'is-active' : ''}`} onSubmit={signupSubmit}>
            <fieldset>
              <legend>Please, enter your email, password, and password confirmation for sign up.</legend>
              <div className="input-block">
                <label htmlFor="signup-name">Name</label>
                <input
                  id="signup-name"
                  type="text"
                  name="name"
                  required
                  value={signupData.name}
                  onChange={handleSignupChange}
                />
              </div>
              <div className="input-block">
                <label htmlFor="signup-email">E-mail</label>
                <input
                  id="signup-email"
                  type="email"
                  name="email"
                  required
                  value={signupData.email}
                  onChange={handleSignupChange}
                />
              </div>
              <div className="input-block">
                <label htmlFor="signup-password">Password</label>
                <input
                  id="signup-password"
                  type="password"
                  name="password"
                  required
                  value={signupData.password}
                  onChange={handleSignupChange}
                />
              </div>
              <div>
                <label className='ur'>User Role</label><br /><br />
                <label>
                  <input
                    type="radio"
                    className='radio'
                    name="userRole"
                    value="admin"
                    checked={signupData.userRole === 'admin'}
                    onChange={handleSignupChange}
                  />
                  Admin
                </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <label>
                  <input
                    type="radio"
                    className='radio'
                    name="userRole"
                    value="customer"
                    checked={signupData.userRole === 'customer'}
                    onChange={handleSignupChange}
                  />
                  Customer
                </label>
              </div>
            </fieldset>
            {
              <h3>{msg}</h3>
            }
            <div>
              {loading ? (
                <button type="submit" className="btn-signup"><ColorRing
                  visible={true}
                  height="40"
                  width="40"
                  ariaLabel="color-ring-loading"
                  wrapperStyle={{}}
                  wrapperClass="color-ring-wrapper"
                  colors={['#abbd81', '#f8b26a', '#849b87', '#e15b64', '#f47e60']}
                /></button>
              ) : (
                <button type="submit" className="btn-signup">Continue</button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
   </div>
  );
};

export default Login;