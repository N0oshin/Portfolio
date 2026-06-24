

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import BlogList from './pages/BlogList';
import NginxBlog from './pages/Blog-NGINX';
import MicroserviceBlog from './pages/Blog-MicroService-architecture';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      
      <main style={{ minHeight: '80vh' }}>
        <Routes>
          {/* Main Portfolio Page */}
          <Route path="/" element={<Home />} />
          
          {/* Blog Overview Page */}
          <Route path="/blog" element={<BlogList />} />
          
          {/* Individual Blog View (Dynamic Route) */}
          <Route path="/blog/nginx-explained" element={<NginxBlog />} />
          <Route path="/blog/microservice-architecture" element={<MicroserviceBlog />} />

        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;