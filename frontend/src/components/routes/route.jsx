// routes/route.jsx
import React from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../widgetContainer/messages/Home.jsx';
import StartConversationForm from '../widgetContainer/messages/StartConversationForm.jsx';
import { AuthProvider } from "../widgetContainer/messages/AuthContext.jsx";
import Message from '../widgetContainer/messages/message.jsx';

const RouteContainer = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/start-conversation" element={<StartConversationForm />} />
          <Route path="/message" element={<Message />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default RouteContainer;
