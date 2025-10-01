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

// 管理画面コンポーネント
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ArticlesList from './pages/admin/ArticlesList';
import ArticleForm from './pages/admin/ArticleForm';
import CategoriesManagement from './pages/admin/CategoriesManagement';
import EventsList from './pages/admin/EventsList';
import EventForm from './pages/admin/EventForm';
import PodcastsList from './pages/admin/PodcastsList';
import PodcastForm from './pages/admin/PodcastForm';

function App() {
  return (
    <Router>
      <Routes>
        {/* 一般ページ */}
        <Route path="/" element={
          <div className="min-h-screen">
            <Header />
            <HomePage />
            <Footer />
          </div>
        } />
        <Route path="/ai-news" element={
          <div className="min-h-screen">
            <Header />
            <AINewsPage />
            <Footer />
          </div>
        } />
        <Route path="/tech-explanation" element={
          <div className="min-h-screen">
            <Header />
            <TechExplanationPage />
            <Footer />
          </div>
        } />
        <Route path="/learning" element={
          <div className="min-h-screen">
            <Header />
            <LearningPage />
            <Footer />
          </div>
        } />
        <Route path="/podcast" element={
          <div className="min-h-screen">
            <Header />
            <PodcastPage />
            <Footer />
          </div>
        } />
        <Route path="/events" element={
          <div className="min-h-screen">
            <Header />
            <EventsPage />
            <Footer />
          </div>
        } />
        <Route path="/company-news" element={
          <div className="min-h-screen">
            <Header />
            <CompanyNewsPage />
            <Footer />
          </div>
        } />
        
        {/* 管理画面ルート */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="articles" element={<ArticlesList />} />
          <Route path="articles/new" element={<ArticleForm />} />
          <Route path="articles/:id/edit" element={<ArticleForm />} />
          <Route path="categories" element={<CategoriesManagement />} />
          <Route path="events" element={<EventsList />} />
          <Route path="events/new" element={<EventForm />} />
          <Route path="events/:id/edit" element={<EventForm />} />
          <Route path="podcasts" element={<PodcastsList />} />
          <Route path="podcasts/new" element={<PodcastForm />} />
          <Route path="podcasts/:id/edit" element={<PodcastForm />} />
          <Route path="settings" element={<div className="text-center py-12">設定（準備中）</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;