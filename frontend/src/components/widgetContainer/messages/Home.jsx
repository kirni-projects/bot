
// src/components/widgetContainer/messages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { BsSend } from 'react-icons/bs';
import { SlArrowLeft } from "react-icons/sl";

const Home = () => {
  return (
    <>
      <div className="card-home-body bg-orange-500 h-52 p-5 content-center">
        <h1 className="text-center align-center text-4xl font-semibold text-white">
          Hi there 👋
        </h1>
      </div>

      <div className="start-conversation">
        {/* Use Link component for navigation */}
        <Link to="/start-conversation" className="btn bg-orange-500 hover:bg-orange-400 btn-block text-lg text-white">
          <BsSend /> Start New Conversation
        </Link>
      </div>
    </>
  );
};

export default Home;