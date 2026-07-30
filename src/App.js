

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import BlogList from './pages/BlogList';
import NginxBlog from './pages/Blog-NGINX';
import MicroserviceBlog from './pages/Blog-MicroService-architecture';
import VpsDeploymentBlog from './pages/Blog-VpsDeployment'
import HardwareSoftwareServersBlog from './pages/Blog-HardwareSoftwareServers';
import './App.css';

function AppContent() {
  const location = useLocation();
  const isBlogPage = location.pathname.startsWith('/blog');

  return (
    <>
      {!isBlogPage && (
        <video className="app__bg-video" autoPlay loop muted playsInline src="/background.mp4" />
      )}
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
          <Route path="/blog/deploying-to-a-real-server" element={<VpsDeploymentBlog />} />
          <Route path="/blog/hardware-software-servers" element={<HardwareSoftwareServersBlog />} />

        </Routes>
      </main>

      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;