import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, X, Mic, Clock, Users, Plus, Trash2, Link as LinkIcon } from 'lucide-react';
import { podcastsManager, StoragePodcast } from '../../utils/localStorage';

const PodcastForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    episodeNumber: 1,
    duration: '',
    audioUrl: '',
    coverImage: '',
    guests: [] as string[],
    category: 'AI技術',
    publishedDate: new Date().toISOString().split('T')[0],
  });

  const [guestInput, setGuestInput] = useState('');

  useEffect(() => {
    if (isEdit && id) {
      const podcast = podcastsManager.getById(id);
      if (podcast) {
        setFormData({
          title: podcast.title,
          description: podcast.description,
          episodeNumber: podcast.episodeNumber,
          duration: podcast.duration,
          audioUrl: podcast.audioUrl || '',
          coverImage: podcast.coverImage || '',
          guests: podcast.guests || [],
          category: podcast.category,
          publishedDate: podcast.publishedDate.split('T')[0],
        });
      }
    } else {
      // 新規作成時は最新のエピソード番号+1を設定
      const allPodcasts = podcastsManager.getAll();
      if (allPodcasts.length > 0) {
        const maxEpisodeNumber = Math.max(...allPodcasts.map(p => p.episodeNumber));
        setFormData(prev => ({ ...prev, episodeNumber: maxEpisodeNumber + 1 }));
      }
    }
  }, [id, isEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEdit && id) {
      podcastsManager.update(id, formData);
    } else {
      podcastsManager.create(formData);
    }
    
    navigate('/admin/podcasts');
  };

  const handleAddGuest = () => {
    if (guestInput.trim() && !formData.guests.includes(guestInput.trim())) {
      setFormData({
        ...formData,
        guests: [...formData.guests, guestInput.trim()],
      });
      setGuestInput('');
    }
  };

  const handleRemoveGuest = (guest: string) => {
    setFormData({
      ...formData,
      guests: formData.guests.filter(g => g !== guest),
    });
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 自動的に時間形式（HH:MM）にフォーマット
    const numbers = value.replace(/[^\d]/g, '');
    if (numbers.length <= 2) {
      setFormData({ ...formData, duration: numbers });
    } else if (numbers.length <= 4) {
      const hours = numbers.slice(0, -2);
      const minutes = numbers.slice(-2);
      setFormData({ ...formData, duration: `${hours}:${minutes}` });
    }
  };

  const podcastCategories = ['AI技術', 'テクノロジー', '学習', 'インタビュー', 'ニュース', 'その他'];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          {isEdit ? 'ポッドキャスト編集' : '新規ポッドキャスト作成'}
        </h2>
        <p className="mt-1 text-gray-600">
          {isEdit ? 'ポッドキャストエピソードを編集します' : '新しいポッドキャストエピソードを作成します'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 space-y-6">
            {/* 基本情報 */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Mic className="w-5 h-5 mr-2" />
                エピソード情報
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {/* エピソード番号 */}
                <div>
                  <label htmlFor="episodeNumber" className="block text-sm font-medium text-gray-700">
                    エピソード番号 *
                  </label>
                  <div className="mt-1 relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      EP.
                    </span>
                    <input
                      type="number"
                      id="episodeNumber"
                      required
                      min="1"
                      value={formData.episodeNumber}
                      onChange={(e) => setFormData({ ...formData, episodeNumber: parseInt(e.target.value) || 1 })}
                      className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                </div>

                {/* カテゴリー */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    カテゴリー *
                  </label>
                  <select
                    id="category"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
                  >
                    {podcastCategories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* 公開日 */}
                <div>
                  <label htmlFor="publishedDate" className="block text-sm font-medium text-gray-700">
                    公開日 *
                  </label>
                  <input
                    type="date"
                    id="publishedDate"
                    required
                    value={formData.publishedDate}
                    onChange={(e) => setFormData({ ...formData, publishedDate: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
                  />
                </div>
              </div>

              {/* タイトル */}
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  タイトル *
                </label>
                <input
                  type="text"
                  id="title"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="例: AIの最新トレンドについて語る"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
                />
              </div>

              {/* 説明 */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  説明 *
                </label>
                <textarea
                  id="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="このエピソードの内容について詳しく説明してください..."
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>

            {/* メディア情報 */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">メディア情報</h3>
              
              {/* 音声ファイルURL */}
              <div className="mb-4">
                <label htmlFor="audioUrl" className="block text-sm font-medium text-gray-700">
                  <LinkIcon className="w-4 h-4 inline mr-1" />
                  音声ファイルURL
                </label>
                <input
                  type="url"
                  id="audioUrl"
                  value={formData.audioUrl}
                  onChange={(e) => setFormData({ ...formData, audioUrl: e.target.value })}
                  placeholder="https://example.com/podcast-episode.mp3"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
                />
              </div>

              {/* カバー画像URL */}
              <div className="mb-4">
                <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">
                  カバー画像URL
                </label>
                <input
                  type="url"
                  id="coverImage"
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  placeholder="https://example.com/cover-image.jpg"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
                />
              </div>

              {/* 再生時間 */}
              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                  <Clock className="w-4 h-4 inline mr-1" />
                  再生時間 (MM:SS または HH:MM:SS)
                </label>
                <input
                  type="text"
                  id="duration"
                  value={formData.duration}
                  onChange={handleDurationChange}
                  placeholder="例: 45:30"
                  pattern="^([0-9]{1,2}:)?[0-9]{1,2}:[0-9]{2}$"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>

            {/* ゲスト情報 */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2" />
                ゲスト
              </h3>
              
              <div>
                <label htmlFor="guests" className="block text-sm font-medium text-gray-700">
                  ゲスト名
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    id="guests"
                    value={guestInput}
                    onChange={(e) => setGuestInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddGuest())}
                    placeholder="ゲスト名を入力してEnterキー"
                    className="flex-1 block w-full border border-gray-300 rounded-l-md py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddGuest}
                    className="inline-flex items-center px-4 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm hover:bg-gray-100"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                {formData.guests.length > 0 && (
                  <div className="mt-3">
                    <div className="space-y-2">
                      {formData.guests.map((guest, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2"
                        >
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                              <Users className="w-4 h-4 text-red-600" />
                            </div>
                            <span className="text-sm font-medium text-gray-900">{guest}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveGuest(guest)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* アクションボタン */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/admin/podcasts')}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            キャンセル
          </button>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <Save className="w-4 h-4 mr-2" />
            {isEdit ? '更新' : '作成'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PodcastForm;