import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { protecdInstance } from '../services/instance';
import Navlink from './Navbar/Navbar';

function CreateTicket() {
 const navigate=useNavigate()
    const [ticket, setTicket] = useState({ title: '', category: '', description: '', language: '' });
    const handleCreateTicket = (e) => {
        e.preventDefault();
        navigate('/ticket')
      };
    
      const handleTitleChange = (e) => {
        setTicket({ ...ticket, title: e.target.value });
      };
    
      const handleCategoryChange = (e) => {
        setTicket({ ...ticket, category: e.target.value });
      };
    
      const handleLanguageChange = (e) => {
        setTicket({ ...ticket, language: e.target.value });
      };
    
      const handleDescriptionChange = (e) => {
        setTicket({ ...ticket, description: e.target.value });
      };
      const isFormValid = () => {
        return ticket.title !== '' && ticket.category !== '' && ticket.description !== '' && ticket.language !== ''&&ticket.language!=='selectAnyOne';
      };
    
      const handleSubmit = async(e) => {
        e.preventDefault();
        if (isFormValid()) {
          try {
            const res = await protecdInstance.post('/ticket', ticket)
            setTicket({ title: '', category: '', description: '', language: '' })
            navigate('/ticket')
            // console.log('Ticket submitted:',res.data.message);
          }
          catch (e) {
            console.log(e, 'create error')
            navigate('/signin')
          }
        } else {
          alert('Please fill in all required fields.');
        }
      };
  return (
    <div><Navlink/><div>
      <form onSubmit={handleSubmit} className='create mx-auto '>
        <h2 className="text-center m-3">Create Ticket :</h2>
      <p className='ti'>Title:</p>
      <select value={ticket.title} onChange={handleTitleChange} required>
        <option value="selectAnyOne">--Select Any one--</option>
        <option value="Product Related">Product Related</option>
        <option value="ExchangeRelated">Exchange Related</option>
                  <option value="Payments">Payments</option>
                  <option value="Others">Others</option>
      </select>

      <div>
        <p className='ti mt-3'>Category:</p>
        {ticket.title === 'Product Related' ? (
          <select value={ticket.category} onChange={handleCategoryChange} required>
            <option value="selectAnyOne">--Select Any one--</option>
            <option value="Return Product">Return Product</option>
            <option value="Replacement">Replace product</option>
            <option value="Waranty Related">Waranty Related</option>
            <option value="Product more Info">Product more Info</option>
          </select>
        ) : ticket.title === 'ExchangeRelated' ? (
          <select value={ticket.category} onChange={handleCategoryChange}>
            <option value="selectAnyOne">--Select Any one--</option>
            <option value="Old Product Price">Old Product Price</option>
            <option value="Old Product warenty">Old Product warenty</option>
            <option value="Damage">Damage</option>
          </select>
        ) : ticket.title === 'Others' ? (
          <select value={ticket.category} onChange={handleCategoryChange} required>
            <option value="selectAnyOne">--Select Any one--</option>
            <option value="feedback">Feedback</option>
            <option value="Others">Others</option>
          </select>
        ) : ticket.title === 'Payments' ? (
          <select value={ticket.category} onChange={handleCategoryChange} required>
            <option value="selectAnyOne">--Select Any one--</option>
            <option value="UPI Transation">UPI Transaction</option>
            <option value="Net banking">Net banking</option>
            <option value="EMI option">EMI Option</option>
          </select>
        ) : (
          <div>
            <select>
              <option value="selectAnyOne">--Select Any one--</option>
            </select>
          </div>
        )}
      </div>
      <div>
        <label className='ti mt-3 mb-2'>Description:</label>
        <br />
          <textarea
            className='textbox'
          type="text"
          value={ticket.description}
          onChange={handleDescriptionChange}
          required
        ></textarea>
      </div>
      <div>
        <p className='ti mt-3'>Language:</p>
        <select value={ticket.language} onChange={handleLanguageChange} required>
          <option value="selectAnyOne">--Select Any one--</option>
          <option value="Tamil">Tamil</option>
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
        </select>
      </div>
        <div className='mt-3 handlebtn'>
          <button className='btn btn-outline-dark btn-create' onClick={handleCreateTicket}>Back</button>
          <button className='btn btn-outline-success m-3 btn-create' type="submit">Submit</button>
     </div>
    </form>
   
  </div></div>
  )
}

export default CreateTicket