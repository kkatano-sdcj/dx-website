import React from 'react';
import { Clock, Eye, Share2, Bookmark, ArrowRight, TrendingUp } from 'lucide-react';
import { Article } from '../services/api';

interface CMSArticleCardProps {
  article: Article;
  size?: 'small' | 'medium' | 'large';
  isTrending?: boolean;
}

const CMSArticleCard: React.FC<CMSArticleCardProps> = ({
  article,
  size = 'medium',
  isTrending = false
}) => {
  const sizeClasses = {
    small: 'h-32',
    medium: 'h-48',
    large: 'h-64'
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'AI系ニュース': 'from-blue-500 to-cyan-500',
      '技術解説': 'from-green-500 to-emerald-500',
      '学習': 'from-purple-500 to-pink-500',
      'Podcast': 'from-red-500 to-orange-500',
      'イベント': 'from-yellow-500 to-amber-500',
      '社内ニュース': 'from-indigo-500 to-purple-500',
      'AI活用': 'from-orange-500 to-red-500',
      'デフォルト': 'from-gray-500 to-gray-600'
    };
    return colors[category] || colors['デフォルト'];
  };

  const imageUrl = article.attributes.featuredImage?.data?.attributes.url 
    ? `http://localhost:1337${article.attributes.featuredImage.data.attributes.url}`
    : 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop';

  const categoryName = article.attributes.category?.data?.attributes.name || 'その他';
  const authorName = article.attributes.author?.data?.attributes.name || '匿名';
  const publishedDate = new Date(article.attributes.publishedDate || article.attributes.createdAt).toLocaleDateString('ja-JP');

  return (
    <article className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100/50 transform hover:-translate-y-2">
      <div className="relative overflow-hidden">
        <img 
          src={imageUrl}
          alt={article.attributes.title}
          className={`w-full ${sizeClasses[size]} object-cover group-hover:scale-110 transition-transform duration-700`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="absolute top-6 left-6">
          <span className={`px-4 py-2 bg-gradient-to-r ${getCategoryColor(categoryName)} text-white text-sm font-semibold rounded-full shadow-lg backdrop-blur-sm`}>
            {categoryName}
          </span>
        </div>
        
        {(isTrending || article.attributes.isTrending) && (
          <div className="absolute top-6 right-6">
            <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full px-3 py-1 shadow-lg">
              <TrendingUp className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-semibold">トレンド</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-8">
        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
          <span className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{article.attributes.readTime}分</span>
          </span>
          <span className="flex items-center space-x-1">
            <Eye className="w-4 h-4" />
            <span>{article.attributes.views.toLocaleString()}</span>
          </span>
          <span>{publishedDate}</span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors leading-tight line-clamp-2">
          {article.attributes.title}
        </h3>
        
        <p className="text-gray-600 leading-relaxed line-clamp-3 mb-6">
          {article.attributes.excerpt}
        </p>

        <div className="text-sm text-gray-500 mb-6 flex items-center space-x-2">
          <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-semibold">{authorName.charAt(0)}</span>
          </div>
          <span>執筆者: {authorName}</span>
        </div>
        
        <div className="flex items-center justify-between pt-6 border-t border-gray-100">
          <button className="group/btn text-blue-600 hover:text-blue-700 font-semibold flex items-center space-x-2 transition-colors">
            <span>続きを読む</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </button>
          <div className="flex items-center space-x-2">
            <button className="p-3 hover:bg-gray-100 rounded-xl transition-colors group/share">
              <Share2 className="w-4 h-4 text-gray-500 group-hover/share:text-blue-600 transition-colors" />
            </button>
            <button className="p-3 hover:bg-gray-100 rounded-xl transition-colors group/bookmark">
              <Bookmark className="w-4 h-4 text-gray-500 group-hover/bookmark:text-blue-600 transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CMSArticleCard;