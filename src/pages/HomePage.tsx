import React from 'react';
import { useArticles } from '../hooks/useArticles';
import { useCategories } from '../hooks/useCategories';
import { 
  TrendingUp, 
  Bot, 
  BookOpen, 
  Mic, 
  Calendar, 
  Users,
  ChevronRight,
  Share2,
  Bookmark,
  Clock,
  Eye,
  ArrowRight,
  Zap,
  Star,
  Play
} from 'lucide-react';
import ArticleCard from '../components/ArticleCard';
import CMSArticleCard from '../components/CMSArticleCard';

const HomePage = () => {
  // CMS データを取得
  const { articles: featuredArticles, loading: featuredLoading } = useArticles({ featured: true, limit: 1 });
  const { articles: trendingArticles, loading: trendingLoading } = useArticles({ trending: true, limit: 2 });
  const { articles: latestArticles, loading: latestLoading } = useArticles({ limit: 4 });
  const { categories, loading: categoriesLoading } = useCategories();

  const featuredArticle = {
    title: "AI革命が変える働き方：ChatGPT導入から6ヶ月の成果報告",
    excerpt: "社内でのAI活用事例を徹底分析。生産性向上と新たな課題について詳しく解説します。実際の導入プロセスから得られた知見を共有し、今後のAI活用戦略について考察します。",
    image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop",
    category: "AI活用",
    readTime: "8分",
    views: "2.1k",
    author: "田中 太郎",
    date: "2024年1月15日"
  };

  // CMS からのフィーチャード記事があれば使用
  const displayFeaturedArticle = featuredArticles.length > 0 ? featuredArticles[0] : null;

  const trendingArticles = [
    {
      title: "機械学習モデルの本番運用で気をつけるべき5つのポイント",
      excerpt: "MLOpsの観点から見た、機械学習システムの安定運用に必要な要素を解説。",
      image: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      category: "技術解説",
      readTime: "6分",
      views: "1.8k",
      date: "2024年1月12日"
    },
    {
      title: "【Podcast】AI時代のキャリア戦略 - 第15回",
      excerpt: "ゲストにAIスペシャリストの山田さんを迎え、これからのエンジニアキャリアについて語り合います。",
      image: "https://images.pexels.com/photos/7551662/pexels-photo-7551662.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      category: "Podcast",
      readTime: "45分",
      views: "3.2k",
      date: "2024年1月10日",
      isPodcast: true
    }
  ];

  const articles = [
    {
      title: "社内ハッカソン2024開催決定！テーマは「AIを活用した業務効率化」",
      excerpt: "3月開催予定の社内ハッカソンの詳細が決定。参加者募集開始とエントリー方法について。",
      image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      category: "イベント",
      readTime: "3分",
      views: "4.5k",
      date: "2024年1月8日"
    },
    {
      title: "プロンプトエンジニアリング基礎講座 - 効果的なAI活用法",
      excerpt: "ChatGPTやClaude等のAIツールをより効果的に活用するためのプロンプト設計テクニック。",
      image: "https://images.pexels.com/photos/8386422/pexels-photo-8386422.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      category: "学習",
      readTime: "12分",
      views: "2.7k",
      date: "2024年1月5日"
    }
  ];

  // CMS からのカテゴリーデータを使用（フォールバック付き）
  const categories = [
    { name: "AI系ニュース", icon: Bot, count: 24, color: "from-blue-500 to-cyan-500", path: "/ai-news" },
    { name: "技術解説", icon: BookOpen, count: 18, color: "from-green-500 to-emerald-500", path: "/tech-explanation" },
    { name: "学習", icon: TrendingUp, count: 32, color: "from-purple-500 to-pink-500", path: "/learning" },
    { name: "Podcast", icon: Mic, count: 15, color: "from-red-500 to-orange-500", path: "/podcast" },
    { name: "イベント", icon: Calendar, count: 8, color: "from-yellow-500 to-amber-500", path: "/events" },
    { name: "社内ニュース", icon: Users, count: 12, color: "from-indigo-500 to-purple-500", path: "/company-news" }
  ];

  const displayCategories = categories.length > 0 ? categories.map(cat => ({
    name: cat.attributes.name,
    icon: Bot, // デフォルトアイコン
    count: 0, // 記事数は別途計算が必要
    color: `from-${cat.attributes.color}-500 to-${cat.attributes.color}-600`,
    path: `/${cat.attributes.slug}`
  })) : categories;

  const trendingTopics = [
    { name: "ChatGPT活用法", count: "156記事" },
    { name: "機械学習基礎", count: "89記事" },
    { name: "プロンプトエンジニアリング", count: "67記事" },
    { name: "AI倫理", count: "45記事" },
    { name: "データサイエンス", count: "123記事" }
  ];

  const stats = [
    { label: "総記事数", value: "1,247", icon: BookOpen },
    { label: "月間読者数", value: "15.2K", icon: Users },
    { label: "Podcast再生数", value: "8.9K", icon: Play },
    { label: "イベント参加者", value: "2.1K", icon: Calendar }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-indigo-600/5 to-purple-600/10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.03%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 backdrop-blur-sm border border-blue-200/50 rounded-full px-4 py-2">
                  <Zap className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">最新のテクノロジー情報をお届け</span>
                </div>
                
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
                    Tech Innovation
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Hub
                  </span>
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  AI・テクノロジーの最前線から社内ニュースまで、
                  <span className="font-semibold text-gray-800">あなたの知識を加速させる</span>
                  プラットフォーム
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center space-x-2">
                  <span>最新記事を読む</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="group bg-white/80 backdrop-blur-sm text-gray-700 px-8 py-4 rounded-2xl font-semibold border border-gray-200/50 hover:bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center space-x-2">
                  <Play className="w-5 h-5" />
                  <span>Podcastを聴く</span>
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 rounded-3xl blur-3xl"></div>
              {featuredLoading ? (
                <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/50 p-8">
                  <div className="animate-pulse">
                    <div className="w-full h-64 sm:h-80 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ) : displayFeaturedArticle ? (
                <CMSArticleCard article={displayFeaturedArticle} size="large" />
              ) : (
                <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/50">
                  <img 
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    className="w-full h-64 sm:h-80 object-cover"
                  />
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-semibold rounded-full shadow-lg">
                      {featuredArticle.category}
                    </span>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{featuredArticle.readTime}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{featuredArticle.views}</span>
                      </span>
                      <span>{featuredArticle.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                      {featuredArticle.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                      {featuredArticle.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <button className="group text-blue-600 font-semibold flex items-center space-x-2 hover:text-blue-700 transition-colors">
                        <span>続きを読む</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Share2 className="w-4 h-4 text-gray-500" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Bookmark className="w-4 h-4 text-gray-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              コンテンツカテゴリー
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              あなたの興味に合わせて、最適な学習コンテンツを見つけましょう
            </p>
          </div>
          
          {categoriesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <div key={index} className="bg-white rounded-3xl p-8 shadow-lg animate-pulse">
                  <div className="w-16 h-16 bg-gray-200 rounded-2xl mb-6"></div>
                  <div className="h-6 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayCategories.map((category, index) => (
                <a 
                  key={index} 
                  href={category.path}
                  className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100/50 overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  <div className="relative">
                    <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <category.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{category.count}記事</p>
                    <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                      <span>詳しく見る</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Trending Articles */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">トレンド記事</h2>
              <p className="text-gray-600">今最も読まれている記事</p>
            </div>
            <button className="group text-blue-600 hover:text-blue-700 font-semibold flex items-center space-x-2 transition-colors">
              <span>すべて見る</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          {trendingLoading ? (
            <div className="grid lg:grid-cols-2 gap-8">
              {[1, 2].map((index) => (
                <div key={index} className="bg-white rounded-3xl shadow-lg overflow-hidden animate-pulse">
                  <div className="w-full h-64 bg-gray-200"></div>
                  <div className="p-8">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : trendingArticles.length > 0 ? (
            <div className="grid lg:grid-cols-2 gap-8">
              {trendingArticles.map((article, index) => (
                <CMSArticleCard key={article.id} article={article} size="large" isTrending={true} />
              ))}
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-8">
              {trendingArticles.map((article, index) => (
                <div key={index} className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100/50">
                  <div className="relative">
                    <img 
                      src={article.image}
                      alt={article.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-6 left-6">
                      <span className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold rounded-full shadow-lg">
                        {article.category}
                      </span>
                    </div>
                    {article.isPodcast && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm">
                          <Play className="w-8 h-8 text-white ml-1" />
                        </div>
                      </div>
                    )}
                    <div className="absolute top-6 right-6">
                      <div className="flex items-center space-x-1 bg-black/20 backdrop-blur-sm rounded-full px-3 py-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-white text-sm font-medium">トレンド</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{article.readTime}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{article.views}</span>
                      </span>
                      <span>{article.date}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                      {article.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <button className="group text-blue-600 hover:text-blue-700 font-semibold flex items-center space-x-2 transition-colors">
                        <span>続きを読む</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Share2 className="w-4 h-4 text-gray-500" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Bookmark className="w-4 h-4 text-gray-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">最新記事</h2>
              <p className="text-gray-600">新着コンテンツをチェック</p>
            </div>
            <button className="group text-blue-600 hover:text-blue-700 font-semibold flex items-center space-x-2 transition-colors">
              <span>すべて見る</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          {latestLoading ? (
            <div className="grid md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((index) => (
                <div key={index} className="bg-white rounded-3xl shadow-lg overflow-hidden animate-pulse">
                  <div className="w-full h-48 bg-gray-200"></div>
                  <div className="p-8">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : latestArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8">
              {latestArticles.map((article) => (
                <CMSArticleCard key={article.id} article={article} size="large" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {articles.map((article, index) => (
                <ArticleCard
                  key={index}
                  title={article.title}
                  excerpt={article.excerpt}
                  image={article.image}
                  category={article.category}
                  readTime={article.readTime}
                  views={article.views}
                  date={article.date}
                  size="large"
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Trending Topics */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">トレンドトピック</h2>
            <p className="text-blue-100 text-xl">いま注目されているキーワード</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingTopics.map((topic, index) => (
              <button 
                key={index}
                className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 text-left transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-white group-hover:text-blue-100 transition-colors">
                    #{topic.name}
                  </h3>
                  <TrendingUp className="w-5 h-5 text-blue-300 group-hover:text-blue-200 transition-colors" />
                </div>
                <p className="text-blue-200 text-sm">{topic.count}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-12">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Bot className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              週刊テックニュース
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              最新のAI・テクノロジー情報を毎週お届け。
              <span className="font-semibold">15,000人以上</span>が購読中
            </p>
            
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
              <input 
                type="email" 
                placeholder="メールアドレスを入力"
                className="flex-1 px-6 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                購読する
              </button>
            </div>
            
            <p className="text-sm text-gray-500 mt-4">
              いつでも配信停止できます。プライバシーポリシーに同意の上ご登録ください。
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
              <a 
                key={index} 
                href={category.path}
                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100/50 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                <div className="relative">
                  <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{category.count}記事</p>
                  <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                    <span>詳しく見る</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Articles */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">トレンド記事</h2>
              <p className="text-gray-600">今最も読まれている記事</p>
            </div>
            <button className="group text-blue-600 hover:text-blue-700 font-semibold flex items-center space-x-2 transition-colors">
              <span>すべて見る</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {trendingArticles.map((article, index) => (
              <div key={index} className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100/50">
                <div className="relative">
                  <img 
                    src={article.image}
                    alt={article.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold rounded-full shadow-lg">
                      {article.category}
                    </span>
                  </div>
                  {article.isPodcast && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Play className="w-8 h-8 text-white ml-1" />
                      </div>
                    </div>
                  )}
                  <div className="absolute top-6 right-6">
                    <div className="flex items-center space-x-1 bg-black/20 backdrop-blur-sm rounded-full px-3 py-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white text-sm font-medium">トレンド</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{article.readTime}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{article.views}</span>
                    </span>
                    <span>{article.date}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <button className="group text-blue-600 hover:text-blue-700 font-semibold flex items-center space-x-2 transition-colors">
                      <span>続きを読む</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Share2 className="w-4 h-4 text-gray-500" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Bookmark className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">最新記事</h2>
              <p className="text-gray-600">新着コンテンツをチェック</p>
            </div>
            <button className="group text-blue-600 hover:text-blue-700 font-semibold flex items-center space-x-2 transition-colors">
              <span>すべて見る</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {articles.map((article, index) => (
              <ArticleCard
                key={index}
                title={article.title}
                excerpt={article.excerpt}
                image={article.image}
                category={article.category}
                readTime={article.readTime}
                views={article.views}
                date={article.date}
                size="large"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Topics */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">トレンドトピック</h2>
            <p className="text-blue-100 text-xl">いま注目されているキーワード</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingTopics.map((topic, index) => (
              <button 
                key={index}
                className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 text-left transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-white group-hover:text-blue-100 transition-colors">
                    #{topic.name}
                  </h3>
                  <TrendingUp className="w-5 h-5 text-blue-300 group-hover:text-blue-200 transition-colors" />
                </div>
                <p className="text-blue-200 text-sm">{topic.count}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-12">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Bot className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              週刊テックニュース
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              最新のAI・テクノロジー情報を毎週お届け。
              <span className="font-semibold">15,000人以上</span>が購読中
            </p>
            
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
              <input 
                type="email" 
                placeholder="メールアドレスを入力"
                className="flex-1 px-6 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                購読する
              </button>
            </div>
            
            <p className="text-sm text-gray-500 mt-4">
              いつでも配信停止できます。プライバシーポリシーに同意の上ご登録ください。
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;