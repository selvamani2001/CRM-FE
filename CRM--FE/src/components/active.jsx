import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { protecdInstance } from '../services/instance';

function Active() {
    const[info,setInfo]=useState('')
    const handleactive = async (e) => {
      e.preventDefault();
      const currentURL = window.location.href;
      const match = currentURL.match(/\/activate-account\/(\w{10})/);
  
      if (match) {
        const activationToken = match[1];
        try {
          const res = await protecdInstance.get(`/active/${activationToken}`);
          // console.log('Response:', res);
          
          if (res.data) {
            console.log('Activation successful:', res.data);
            setInfo(res.data.message)
          } else {
            console.error('No data received in the response');
          }
        } catch (error) {
          console.error('Error occurred during activation', error);
        }
      } else {
        console.error("URL format doesn't match the expected pattern");
      }
    };
  
  return (
    <div>
      <div className="m-5">
        <h2>Active page for Zen Class </h2>
        <h3 className='m-3 mx-auto '>To below, click the Active button to activate your account</h3>
        <button className='btn btn-success mx-auto ' onClick={handleactive} id='btn'>Activate</button>
        <p className='fs-3 text-danger '>{info}</p>
        <Link to='/' className='fs-3 text-decoration-none '>Login</Link>
      </div>
    </div>
  );
}

export default Active