import React from 'react'
import {  Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './components/login';
import PasswordReset from './components/passwordreset';
import NewPassword from './components/newpassword';
import Active from './components/active';
import Products from './components/products';
import Ticket from './components/Ticket';
import CreateTicket from './components/CreateTicket';
import Profile from './components/Dashboard';
import Admin from './components/Admin';
import AssignTickets from './components/AsignTickets';
import CreateProduct from './components/createProduct';
import MyProducts from './components/MyProducts';

function App() {
  return (
    <div>
      <Router>
        <div>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/reset-password' element={<PasswordReset />} />
            <Route path='/reset-password/new-password/:OTP' element={<NewPassword />} />
            <Route path='/activate-account/:activationToken' element={<Active />} />
            <Route path='/dashboard' element={<Profile />} />
            <Route path='/ticket' element={<Ticket />} />
            <Route path='/create' element={<CreateTicket />} />
            <Route path='/products' element={<Products />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='/mytickets' element={<AssignTickets />} />
            <Route path='/createproduct' element={<CreateProduct />} />
            <Route path='/myproduct' element={<MyProducts />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;