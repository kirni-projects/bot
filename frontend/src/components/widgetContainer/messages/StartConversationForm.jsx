// src/components/widgetContainer/messages/StartConversationForm.jsx
import React, { useState } from "react";
import { BsSend } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import { SlArrowLeft } from "react-icons/sl";
import axios from "axios";
import { useAuthContext } from './AuthContext.jsx';

const StartConversationForm = () => {
  const [formData, setFormData] = useState({ username: "", message: "" });
  const [error, setError] = useState(null);
  const { setUser } = useAuthContext();
  const navigate = useNavigate();

  // Function to extract the 'eid' from the script tag's attribute
  const getEID = () => {
    const scriptTag = document.querySelector('script[src*="widget.js"]');
    if (scriptTag) {
      return scriptTag.getAttribute('eid'); // Extract the 'eid' attribute
    }
    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous error

    const eid = getEID(); // Get the EID from the script tag
    if (!eid) {
      setError('Unable to identify chat widget (EID missing)');
      return;
    }

    try {
      const response = await axios.post('/api/start-conversation', {
        ...formData,
        eid // Send EID in the request body
      });

      console.log('Response:', response.data);
      
      if (response.status === 201) { // Check for successful response
        const { usertoken, ...userData } = response.data;
        console.log('Form submitted successfully');
        localStorage.setItem('token', usertoken); // Store the token
        setUser({ ...userData, token: usertoken, eid }); // Set user context with token and eid
        navigate('/message'); // Navigate to the /message page
      } else {
        console.log('Form submission failed - status is not 201');
        setError("Submission failed: Server response was not successful.");
      }
    } catch (err) {
      console.error('Error starting conversation:', err);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <div className="card-home-body bg-orange-500 h-36 p-5 content-top">
        <div className="icon-to-home text-white">
          <Link to='/'>
            <SlArrowLeft />
          </Link>
        </div>
        <h1 className="text-center align-center text-4xl font-semibold text-white">
          Hi there 👋
        </h1>
      </div>
      <div className="start-conversation">
        <form onSubmit={handleSubmit} className="p-3">
          <div className="form-control mb-5">
            <label className="mb-2"> Name </label>
            <input
              type="text"
              name="username"
              placeholder="Name"
              className="input input-bordered w-full input-md"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-control">
            <label className="mb-2"> Question </label>
            <textarea
              name="message"
              className="textarea textarea-bordered w-full"
              placeholder="Question"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit" className="btn bg-orange-500 hover:bg-orange-400 btn-block text-lg text-white">
            <BsSend /> Start Chat
          </button>
          {error && <p className="error-message text-red-500 mt-2">{error}</p>}
        </form>
      </div>
    </>
  );
};

export default StartConversationForm; 