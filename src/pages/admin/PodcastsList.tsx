import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Mic, Clock, Users, Play, Search } from 'lucide-react';
import { podcastsManager, StoragePodcast } from '../../utils/localStorage';

const PodcastsList: React.FC = () => {
  const [podcasts, setPodcasts] = useState<StoragePodcast[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    loadPodcasts();
  }, []);

  const loadPodcasts = () => {
    setPodcasts(podcastsManager.getAll());
  };

  const handleDelete = (id: string) => {
    if (window.confirm('このポッドキャストエピソードを削除してもよろしいですか？')) {
      podcastsManager.delete(id);
      loadPodcasts();
    }
  };

  const filteredPodcasts = podcasts.filter(podcast => {
    const matchesSearch = podcast.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          podcast.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || podcast.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const formatDuration = (duration: string) => {
    return duration || '00:00';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryBadge = (category: string) => {
    const styles: { [key: string]: string } = {
      'AI技術': 'bg-blue-100 text-blue-800',
      'テクノロジー': 'bg-purple-100 text-purple-800',
      '学習': 'bg-green-100 text-green-800',
      'インタビュー': 'bg-yellow-100 text-yellow-800',
      'ニュース': 'bg-red-100 text-red-800',
      'その他': 'bg-gray-100 text-gray-800',
    };
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[category] || styles['その他']}`}>
        {category}
      </span>
    );
  };

  const podcastCategories = ['AI技術', 'テクノロジー', '学習', 'インタビュー', 'ニュース', 'その他'];

  return (
    <div>
      {/* ヘッダー */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">ポッドキャスト管理</h2>
          <p className="mt-1 text-gray-600">ポッドキャストエピソードの一覧と管理</p>
        </div>
        <Link
          to="/admin/podcasts/new"
          className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          新規エピソード作成
        </Link>
      </div>

      {/* フィルター */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="エピソードを検索..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>
            <div className="md:w-48">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="">すべてのカテゴリー</option>
                {podcastCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* ポッドキャストテーブル */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                エピソード
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                カテゴリー
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ゲスト
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                時間
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                公開日
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                アクション
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPodcasts.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                  ポッドキャストエピソードがありません
                </td>
              </tr>
            ) : (
              filteredPodcasts.map((podcast) => (
                <tr key={podcast.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                          <Mic className="w-6 h-6 text-red-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center">
                          <span className="text-xs font-medium text-gray-500 mr-2">
                            EP.{String(podcast.episodeNumber).padStart(3, '0')}
                          </span>
                        </div>
                        <div className="text-sm font-medium text-gray-900">{podcast.title}</div>
                        <div className="text-sm text-gray-500">
                          {podcast.description.substring(0, 60)}...
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getCategoryBadge(podcast.category)}
                  </td>
                  <td className="px-6 py-4">
                    {podcast.guests && podcast.guests.length > 0 ? (
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1 text-gray-400" />
                        <span className="text-sm text-gray-900">
                          {podcast.guests.slice(0, 2).join(', ')}
                          {podcast.guests.length > 2 && ` 他${podcast.guests.length - 2}名`}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <Clock className="w-4 h-4 mr-1 text-gray-400" />
                      {formatDuration(podcast.duration)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(podcast.publishedDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      {podcast.audioUrl && (
                        <a
                          href={podcast.audioUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 hover:text-green-900"
                        >
                          <Play className="w-4 h-4" />
                        </a>
                      )}
                      <Link
                        to={`/admin/podcasts/${podcast.id}/edit`}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(podcast.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 統計情報 */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-red-100 rounded-lg p-3">
              <Mic className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">総エピソード数</p>
              <p className="text-2xl font-bold text-gray-900">{podcasts.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">総再生時間</p>
              <p className="text-2xl font-bold text-gray-900">
                {podcasts.reduce((total, p) => {
                  const [h, m] = (p.duration || '0:0').split(':').map(Number);
                  return total + (h * 60 + m);
                }, 0)} 分
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-green-100 rounded-lg p-3">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">ゲスト総数</p>
              <p className="text-2xl font-bold text-gray-900">
                {podcasts.reduce((total, p) => total + (p.guests?.length || 0), 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-purple-100 rounded-lg p-3">
              <Mic className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">最新エピソード</p>
              <p className="text-lg font-bold text-gray-900">
                {podcasts.length > 0 ? `EP.${Math.max(...podcasts.map(p => p.episodeNumber))}` : '-'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PodcastsList;