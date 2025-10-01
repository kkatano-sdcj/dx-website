import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, X, Calendar, MapPin, Users, Tag } from 'lucide-react';
import { eventsManager, StorageEvent } from '../../utils/localStorage';

const EventForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    location: '',
    eventType: 'セミナー',
    status: '募集中',
    organizer: '管理者',
    maxParticipants: 0,
    currentParticipants: 0,
    tags: [] as string[],
    featuredImage: '',
  });

  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (isEdit && id) {
      const event = eventsManager.getById(id);
      if (event) {
        setFormData({
          title: event.title,
          description: event.description,
          startDate: event.startDate.split('T')[0] + 'T' + event.startDate.split('T')[1]?.substring(0, 5) || '00:00',
          endDate: event.endDate ? event.endDate.split('T')[0] + 'T' + event.endDate.split('T')[1]?.substring(0, 5) : '',
          location: event.location,
          eventType: event.eventType,
          status: event.status,
          organizer: event.organizer,
          maxParticipants: event.maxParticipants || 0,
          currentParticipants: event.currentParticipants,
          tags: event.tags || [],
          featuredImage: event.featuredImage || '',
        });
      }
    }
  }, [id, isEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const eventData = {
      ...formData,
      maxParticipants: formData.maxParticipants || undefined,
    };

    if (isEdit && id) {
      eventsManager.update(id, eventData);
    } else {
      eventsManager.create(eventData);
    }
    
    navigate('/admin/events');
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(t => t !== tag),
    });
  };

  const eventTypes = ['セミナー', 'ワークショップ', 'カンファレンス', 'ミートアップ', 'ウェビナー', 'その他'];
  const statusOptions = ['募集中', '開催中', '終了', 'キャンセル'];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          {isEdit ? 'イベント編集' : '新規イベント作成'}
        </h2>
        <p className="mt-1 text-gray-600">
          {isEdit ? 'イベント情報を編集します' : '新しいイベントを作成します'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 space-y-6">
            {/* 基本情報 */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">基本情報</h3>
              
              {/* タイトル */}
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  イベント名 *
                </label>
                <input
                  type="text"
                  id="title"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              {/* 説明 */}
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  説明 *
                </label>
                <textarea
                  id="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* イベントタイプ */}
                <div>
                  <label htmlFor="eventType" className="block text-sm font-medium text-gray-700">
                    イベントタイプ *
                  </label>
                  <select
                    id="eventType"
                    required
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  >
                    {eventTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* ステータス */}
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                    ステータス
                  </label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* 日時・場所 */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                日時・場所
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* 開始日時 */}
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                    開始日時 *
                  </label>
                  <input
                    type="datetime-local"
                    id="startDate"
                    required
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>

                {/* 終了日時 */}
                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                    終了日時
                  </label>
                  <input
                    type="datetime-local"
                    id="endDate"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>

              {/* 場所 */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  場所 *
                </label>
                <input
                  type="text"
                  id="location"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="例: 東京都渋谷区〇〇ビル 3F / オンライン"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>

            {/* 参加者情報 */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2" />
                参加者情報
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* 最大参加者数 */}
                <div>
                  <label htmlFor="maxParticipants" className="block text-sm font-medium text-gray-700">
                    最大参加者数
                  </label>
                  <input
                    type="number"
                    id="maxParticipants"
                    min="0"
                    value={formData.maxParticipants}
                    onChange={(e) => setFormData({ ...formData, maxParticipants: parseInt(e.target.value) || 0 })}
                    placeholder="0 = 無制限"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>

                {/* 現在の参加者数 */}
                <div>
                  <label htmlFor="currentParticipants" className="block text-sm font-medium text-gray-700">
                    現在の参加者数
                  </label>
                  <input
                    type="number"
                    id="currentParticipants"
                    min="0"
                    value={formData.currentParticipants}
                    onChange={(e) => setFormData({ ...formData, currentParticipants: parseInt(e.target.value) || 0 })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>

                {/* 主催者 */}
                <div>
                  <label htmlFor="organizer" className="block text-sm font-medium text-gray-700">
                    主催者
                  </label>
                  <input
                    type="text"
                    id="organizer"
                    value={formData.organizer}
                    onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>
            </div>

            {/* タグ・画像 */}
            <div>
              {/* タグ */}
              <div className="mb-4">
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                  <Tag className="w-4 h-4 inline mr-1" />
                  タグ
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    id="tags"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    placeholder="タグを入力してEnterキー"
                    className="flex-1 block w-full border border-gray-300 rounded-l-md py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm hover:bg-gray-100"
                  >
                    追加
                  </button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 text-purple-600 hover:text-purple-800"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* アイキャッチ画像URL */}
              <div>
                <label htmlFor="featuredImage" className="block text-sm font-medium text-gray-700">
                  アイキャッチ画像URL
                </label>
                <input
                  type="url"
                  id="featuredImage"
                  value={formData.featuredImage}
                  onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* アクションボタン */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/admin/events')}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            キャンセル
          </button>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            <Save className="w-4 h-4 mr-2" />
            {isEdit ? '更新' : '作成'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;