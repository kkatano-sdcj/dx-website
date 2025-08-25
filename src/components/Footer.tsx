import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, ArrowRight, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.02%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center">
                <Bot className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold">TechNews Hub</h3>
            </div>
            <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-md">
              社内向けテクノロジーニュースサイト。AI・技術情報を分かりやすくお届けし、
              チーム全体の技術力向上をサポートします。
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail className="w-5 h-5 text-blue-400" />
                <span>contact@technews-hub.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone className="w-5 h-5 text-blue-400" />
                <span>03-1234-5678</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span>東京都渋谷区 1-2-3</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">コンテンツ</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/ai-news" className="group text-gray-400 hover:text-white transition-colors flex items-center space-x-2">
                  <span>AI系ニュース</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </Link>
              </li>
              <li>
                <Link to="/tech-explanation" className="group text-gray-400 hover:text-white transition-colors flex items-center space-x-2">
                  <span>技術解説</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </Link>
              </li>
              <li>
                <Link to="/learning" className="group text-gray-400 hover:text-white transition-colors flex items-center space-x-2">
                  <span>学習コンテンツ</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </Link>
              </li>
              <li>
                <Link to="/podcast" className="group text-gray-400 hover:text-white transition-colors flex items-center space-x-2">
                  <span>Podcast</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">社内情報</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/events" className="group text-gray-400 hover:text-white transition-colors flex items-center space-x-2">
                  <span>イベント</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </Link>
              </li>
              <li>
                <Link to="/company-news" className="group text-gray-400 hover:text-white transition-colors flex items-center space-x-2">
                  <span>社内ニュース</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </Link>
              </li>
              <li>
                <a href="#" className="group text-gray-400 hover:text-white transition-colors flex items-center space-x-2">
                  <span>ハッカソン</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </a>
              </li>
              <li>
                <a href="#" className="group text-gray-400 hover:text-white transition-colors flex items-center space-x-2">
                  <span>勉強会</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2024 TechNews Hub. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">プライバシーポリシー</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">利用規約</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">お問い合わせ</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;