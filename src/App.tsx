import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import BlogPost from './pages/BlogPost';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const basename = import.meta.env.BASE_URL.replace(/\/$/, '');
  return (
    <Router basename={basename}>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:slug" element={<BlogPost />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;