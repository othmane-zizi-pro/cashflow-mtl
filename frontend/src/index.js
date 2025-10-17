import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import BusinessPlan from './components/BusinessPlan';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import TechnicalGuide from './pages/TechnicalGuide';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/business-plan/:centrisId" element={<BusinessPlan />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/technical-guide" element={<TechnicalGuide />} />
        <Route path="/disclaimer" element={<Terms />} />
        <Route path="/cookies" element={<PrivacyPolicy />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
