// File: frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PublicHome from './pages/PublicHome';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Chat from './pages/Chat'; // if you have a separate Chat page
import TryChatbot from './pages/TryChat'; // if this is separate

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/try-chat" element={<TryChatbot />} />
      </Routes>
    </Router>
  );
}

export default App;
