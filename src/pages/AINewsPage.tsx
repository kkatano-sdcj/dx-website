import React, { useState } from 'react';
import { useArticles } from '../hooks/useArticles';
import { Bot, Filter, TrendingUp, Calendar } from 'lucide-react';
import CMSArticleCard from '../components/CMSArticleCard';

const AINewsPage = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  // CMS データを取得
  const { articles: featuredArticles, loading: featuredLoading } = useArticles({ featured: true, limit: 1 });
  const { articles: allArticles, loading: articlesLoading } = useArticles({ category: 'ai-news' });

  const filters = [
    { id: 'all', name: 'すべて' },
    { id: 'chatgpt', name: 'ChatGPT' },
    { id: 'claude', name: 'Claude' },
    { id: 'gemini', name: 'Gemini' },
    { id: 'openai', name: 'OpenAI' },
    { id: 'google', name: 'Google AI' }
  ];

  const articles = [
    {
      title: "OpenAI、GPT-4 Turboの新機能を発表 - より高速で正確な応答を実現",
      excerpt: "OpenAIが最新のGPT-4 Turboモデルをリリース。処理速度の向上と精度の改善により、企業での活用がさらに促進されることが期待されます。",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      category: "AI系ニュース",
      readTime: "5分",
      views: "3.2k",
      date: "2024年1月20日",
      author: "AI研究チーム"
    },
    {
      title: "Google Gemini Ultra、ベンチマークテストでGPT-4を上回る性能を記録",
      excerpt: "Googleの最新AI「Gemini Ultra」が複数のベンチマークテストでGPT-4を上回る結果を示し、AI業界に新たな競争をもたらしています。",
      image: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      category: "AI系ニュース",
      readTime: "7分",
      views: "2.8k",
      date: "2024年1月18日",
      author: "テクノロジー分析部"
    },
    {
      title: "Claude 3の新機能：長文処理能力が大幅向上、200万トークンまで対応",
      excerpt: "Anthropic社のClaude 3が大幅なアップデートを実施。長文処理能力の向上により、より複雑な文書分析や要約作業が可能になりました。",
      image: "https://images.pexels.com/photos/8386422/pexels-photo-8386422.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      category: "AI系ニュース",
      readTime: "6分",
      views: "2.1k",
      date: "2024年1月16日",
      author: "AI研究チーム"
    },
    {
      title: "Microsoft Copilot、Office 365全製品に統合完了 - 生産性向上への期待",
      excerpt: "MicrosoftがCopilotをOffice 365の全製品に統合完了。Word、Excel、PowerPointでのAI支援機能により、業務効率化が大幅に向上する見込みです。",
      image: "https://images.pexels.com/photos/7551662/pexels-photo-7551662.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      category: "AI系ニュース",
      readTime: "8分",
      views: "4.1k",
      date: "2024年1月14日",
      author: "ビジネステクノロジー部"
    },
    {
      title: "AI画像生成技術の最新動向：DALL-E 3とMidjourney V6の比較分析",
      excerpt: "最新のAI画像生成技術を徹底比較。DALL-E 3とMidjourney V6の性能差、使用用途、コストパフォーマンスについて詳しく解説します。",
      image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      category: "AI系ニュース",
      readTime: "10分",
      views: "3.5k",
      date: "2024年1月12日",
      author: "クリエイティブAI研究室"
    },
    {
      title: "ChatGPT Enterprise版の新機能：カスタムGPTsで業務特化型AIを構築",
      excerpt: "ChatGPT Enterprise版に追加されたカスタムGPTs機能により、企業独自の業務に特化したAIアシスタントの構築が可能になりました。",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      category: "AI系ニュース",
      readTime: "9分",
      views: "2.9k",
      date: "2024年1月10日",
      author: "エンタープライズAI部"
    }
  ];

  const featuredNews = {
    title: "AI業界2024年第1四半期レポート：主要プレイヤーの動向と市場予測",
    excerpt: "2024年第1四半期のAI業界動向を総括。OpenAI、Google、Anthropicの最新動向と、今後の市場予測について詳しく分析します。",
    image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop",
    category: "AI系ニュース",
    readTime: "15分",
    views: "5.2k",
    date: "2024年1月22日",
    author: "AI市場分析チーム"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Bot className="w-8 h-8 text-white" />
            <h1 className="text-3xl lg:text-4xl font-bold text-white">AI系ニュース</h1>
          </div>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            最新のAI技術動向、製品リリース、業界ニュースをお届けします
          </p>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative">
                <img 
                  src={featuredNews.image}
                  alt={featuredNews.title}
                  className="w-full h-64 lg:h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full flex items-center space-x-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>注目記事</span>
                  </span>
                </div>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{featuredNews.date}</span>
                  </span>
                  <span>{featuredNews.readTime}</span>
                  <span>{featuredNews.views} views</span>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  {featuredNews.title}
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {featuredNews.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300">
                    記事を読む
                  </button>
                  <span className="text-sm text-gray-500">執筆者: {featuredNews.author}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-4 mb-6">
            <Filter className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">フィルター</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedFilter === filter.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-200'
                }`}
              >
                {filter.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-gray-900">最新のAIニュース</h3>
            <span className="text-gray-500">{articles.length}件の記事</span>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articlesLoading ? (
              // ローディング状態
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-white rounded-3xl shadow-lg overflow-hidden animate-pulse">
                  <div className="w-full h-48 bg-gray-200"></div>
                  <div className="p-8">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              ))
            ) : allArticles.length > 0 ? (
              // CMS データがある場合
              allArticles.map((article) => (
                <CMSArticleCard
                  key={article.id}
                  article={article}
                  size="medium"
                />
              ))
            ) : (
              // フォールバック（静的データ）
              articles.map((article, index) => (
                <div key={index} className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100/50 transform hover:-translate-y-2">
                  <div className="relative overflow-hidden">
                    <img 
                      src={article.image}
                      alt={article.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-6 left-6">
                      <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-semibold rounded-full shadow-lg backdrop-blur-sm">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                      <span>{article.readTime}</span>
                      <span>{article.views}</span>
                      <span>{article.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed line-clamp-3 mb-6">
                      {article.excerpt}
                    </p>
                    <div className="text-sm text-gray-500 mb-6">
                      執筆者: {article.author}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Load More */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <button className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition-all duration-300">
            さらに記事を読み込む
          </button>
        </div>
      </section>
    </div>
  );
};

export default AINewsPage;