//frontend/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import ScriptCheck from './components/ScriptCheck.jsx';
import WidgetContainer from './components/widgetContainer';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/script-check" element={<ScriptCheck />} />
        <Route path="/widget" element={<WidgetContainer />} />
      </Routes>
    </Router>
  );
};

export default App;
