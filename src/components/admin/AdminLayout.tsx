import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  Home, 
  FileText, 
  Tag, 
  Calendar, 
  Mic, 
  Settings,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';

const AdminLayout: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/admin', icon: Home, label: 'ダッシュボード', exact: true },
    { path: '/admin/articles', icon: FileText, label: '記事管理' },
    { path: '/admin/categories', icon: Tag, label: 'カテゴリー管理' },
    { path: '/admin/events', icon: Calendar, label: 'イベント管理' },
    { path: '/admin/podcasts', icon: Mic, label: 'ポッドキャスト管理' },
    { path: '/admin/settings', icon: Settings, label: '設定' },
  ];

  const isActive = (path: string, exact: boolean = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 管理画面ヘッダー */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">TechNews Hub 管理画面</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                サイトに戻る
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* サイドバー */}
        <nav className="w-64 bg-white border-r border-gray-200">
          <div className="p-4">
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path, item.exact);
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                        active
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center">
                        <Icon className="w-5 h-5 mr-3" />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      {active && <ChevronRight className="w-4 h-4" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        {/* メインコンテンツ */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;