import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { protecdInstance } from '../services/instance';
import AdminNav from './Adminnav';

function AssignTickets() {
  const [get, setGet] = useState([]);
  const storedMenteeId = sessionStorage.getItem('User');
  const id = JSON.parse(storedMenteeId).user._id;

  const handleEditTicket = async (id) => {
    await protecdInstance.put(`admin/${id}`);
    handleData();
  };

  const handleData = async () => {
    try {
      const res = await protecdInstance.get(`/admin/${id}`);
      setGet(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleData();
  }, []);

  return (
      <div>
            <AdminNav/>
      <div>
        <div>
          <h2 className='title-a text-center m-3 text-black-50  '>My Assigned Tickets</h2>
          {get.length === 0 ? (
            <h2 className='no'>No Tickets Assigned</h2>
          ) : (
            <>
              <div className='table-responsive'>
                <table className='table table-striped table-bordered'>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Description</th>
                      <th>Status</th>
                      <th>Language</th>
                      <th>Close Ticket</th>
                    </tr>
                  </thead>
                  <tbody>
                    {get.map((ticket) => (
                      <tr key={ticket._id}>
                        <td>{ticket.title}</td>
                        <td>{ticket.category}</td>
                        <td>{ticket.description}</td>
                        <td>{ticket.status}</td>
                        <td>{ticket.language}</td>
                        <td>
                          <button
                            onClick={() => handleEditTicket(ticket._id)}
                            className='btn btn-danger'
                          >
                            Close
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AssignTickets;