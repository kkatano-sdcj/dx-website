import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Tag, 
  Calendar, 
  Mic,
  TrendingUp,
  Users,
  Eye,
  Plus
} from 'lucide-react';
import { articlesManager, categoriesManager, eventsManager, podcastsManager, initializeDefaultData } from '../../utils/localStorage';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    articles: 0,
    categories: 0,
    events: 0,
    podcasts: 0,
  });

  useEffect(() => {
    // 初期データをセットアップ
    initializeDefaultData();
    
    // 統計情報を取得
    setStats({
      articles: articlesManager.getAll().length,
      categories: categoriesManager.getAll().length,
      events: eventsManager.getAll().length,
      podcasts: podcastsManager.getAll().length,
    });
  }, []);

  const statCards = [
    { 
      label: '記事数', 
      value: stats.articles, 
      icon: FileText, 
      link: '/admin/articles',
      color: 'bg-blue-500' 
    },
    { 
      label: 'カテゴリー数', 
      value: stats.categories, 
      icon: Tag, 
      link: '/admin/categories',
      color: 'bg-green-500' 
    },
    { 
      label: 'イベント数', 
      value: stats.events, 
      icon: Calendar, 
      link: '/admin/events',
      color: 'bg-purple-500' 
    },
    { 
      label: 'ポッドキャスト数', 
      value: stats.podcasts, 
      icon: Mic, 
      link: '/admin/podcasts',
      color: 'bg-red-500' 
    },
  ];

  const quickActions = [
    { label: '新規記事作成', icon: FileText, link: '/admin/articles/new', color: 'text-blue-600' },
    { label: '新規イベント作成', icon: Calendar, link: '/admin/events/new', color: 'text-purple-600' },
    { label: '新規ポッドキャスト', icon: Mic, link: '/admin/podcasts/new', color: 'text-red-600' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">ダッシュボード</h2>
        <p className="mt-1 text-gray-600">コンテンツ管理システムの概要</p>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              to={card.link}
              className="bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{card.label}</p>
                    <p className="mt-2 text-3xl font-bold text-gray-900">{card.value}</p>
                  </div>
                  <div className={`${card.color} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm text-gray-600">
                  <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
                  <span>詳細を見る</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* クイックアクション */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">クイックアクション</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.label}
                  to={action.link}
                  className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className={`p-2 bg-white rounded-lg ${action.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="ml-3 font-medium text-gray-900">{action.label}</span>
                  <Plus className="w-4 h-4 ml-auto text-gray-400" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* 最近のアクティビティ */}
      <div className="mt-8 bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">最近のアクティビティ</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center text-gray-600">
              <Eye className="w-5 h-5 mr-3" />
              <span>ローカルストレージを使用してデータを管理しています</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Users className="w-5 h-5 mr-3" />
              <span>Strapi CMSと同じデータ構造で管理できます</span>
            </div>
            <div className="flex items-center text-gray-600">
              <FileText className="w-5 h-5 mr-3" />
              <span>作成したコンテンツはブラウザに保存されます</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;