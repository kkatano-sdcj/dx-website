import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, X, FileText } from 'lucide-react';
import { articlesManager, categoriesManager, StorageArticle } from '../../utils/localStorage';

const ArticleForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;
  const categories = categoriesManager.getAll();

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    slug: '',
    category: '',
    author: '管理者',
    tags: [] as string[],
    featuredImage: '',
    status: 'draft' as 'draft' | 'published',
    publishedDate: new Date().toISOString().split('T')[0],
  });

  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (isEdit && id) {
      const article = articlesManager.getById(id);
      if (article) {
        setFormData({
          title: article.title,
          excerpt: article.excerpt,
          content: article.content,
          slug: article.slug,
          category: article.category,
          author: article.author,
          tags: article.tags,
          featuredImage: article.featuredImage || '',
          status: article.status,
          publishedDate: article.publishedDate.split('T')[0],
        });
      }
    }
  }, [id, isEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEdit && id) {
      articlesManager.update(id, formData);
    } else {
      articlesManager.create(formData);
    }
    
    navigate('/admin/articles');
  };

  const handleSlugGeneration = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    setFormData({ ...formData, slug });
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

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          {isEdit ? '記事編集' : '新規記事作成'}
        </h2>
        <p className="mt-1 text-gray-600">
          {isEdit ? '記事の内容を編集します' : '新しい記事を作成します'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 space-y-6">
            {/* タイトル */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                タイトル *
              </label>
              <input
                type="text"
                id="title"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* スラッグ */}
            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                スラッグ (URL) *
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  id="slug"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="flex-1 block w-full border border-gray-300 rounded-l-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={handleSlugGeneration}
                  className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm hover:bg-gray-100"
                >
                  自動生成
                </button>
              </div>
            </div>

            {/* 抜粋 */}
            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">
                抜粋 *
              </label>
              <textarea
                id="excerpt"
                required
                rows={2}
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* 本文 */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                本文 *
              </label>
              <textarea
                id="content"
                required
                rows={10}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">選択してください</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.slug}>
                      {cat.name}
                    </option>
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
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'draft' | 'published' })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="draft">下書き</option>
                  <option value="published">公開</option>
                </select>
              </div>
            </div>

            {/* タグ */}
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
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
                  className="flex-1 block w-full border border-gray-300 rounded-l-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 text-blue-600 hover:text-blue-800"
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
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* 公開日 */}
            <div>
              <label htmlFor="publishedDate" className="block text-sm font-medium text-gray-700">
                公開日
              </label>
              <input
                type="date"
                id="publishedDate"
                value={formData.publishedDate}
                onChange={(e) => setFormData({ ...formData, publishedDate: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* アクションボタン */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/admin/articles')}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            キャンセル
          </button>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Save className="w-4 h-4 mr-2" />
            {isEdit ? '更新' : '作成'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ArticleForm;