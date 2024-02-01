import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authInstance } from '../services/instance';


function PasswordReset() {
  const [email, setEmail] = useState('');
  const [mgs, setMgs] = useState('');

  const handleSendOTP = async (e) => {
    e.preventDefault();
    try {
      const res = await authInstance.post('/reset-password', { email });
      setMgs(res.data.message);
      setEmail('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='signup d-flex justify-content-center align-items-center vh-100'>
      <div className="outside">
        <form onSubmit={handleSendOTP}>
          <div>
            <h2 className='title'>Reset Password</h2>
            <label className='fs-4 text-black '>Email Id:</label>
            <br />
            <input
              className='mt-2 rounded'
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div>
              <button type="submit" className='submit mt-3 rounded '>Send Reset Link</button>
              <p className='message mt-3 fs-2 text-danger '>{mgs}</p>
            </div>
          </div>
        </form>
        <Link className='link text-danger fw-bolder fs-3 ' to="/">Login</Link>
      </div>
    </div>
  );
}

export default PasswordReset;
