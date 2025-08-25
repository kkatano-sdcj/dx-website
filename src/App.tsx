import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AINewsPage from './pages/AINewsPage';
import TechExplanationPage from './pages/TechExplanationPage';
import LearningPage from './pages/LearningPage';
import PodcastPage from './pages/PodcastPage';
import EventsPage from './pages/EventsPage';
import CompanyNewsPage from './pages/CompanyNewsPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ai-news" element={<AINewsPage />} />
          <Route path="/tech-explanation" element={<TechExplanationPage />} />
          <Route path="/learning" element={<LearningPage />} />
          <Route path="/podcast" element={<PodcastPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/company-news" element={<CompanyNewsPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;