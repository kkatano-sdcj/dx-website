import React, { useState } from 'react';
import { Users, Briefcase, Award, Coffee, TrendingUp, Calendar } from 'lucide-react';
import ArticleCard from '../components/ArticleCard';

const CompanyNewsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'すべて' },
    { id: 'announcement', name: '重要なお知らせ' },
    { id: 'team', name: 'チーム紹介' },
    { id: 'achievement', name: '成果・実績' },
    { id: 'culture', name: '社内文化' },
    { id: 'recruitment', name: '採用情報' }
  ];

  const articles = [
    {
      title: "新CTO就任のお知らせ：技術戦略の新たな展開",
      excerpt: "この度、弊社の新しいCTOとして田中太郎氏が就任いたしました。豊富な経験を活かし、技術組織のさらなる発展を目指します。",
      image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      category: "社内ニュース",
      readTime: "5分",
      views: "2.8k",
      date: "2024年1月20日",
      author: "人事部"
    },
    {
      title: "エンジニア採用強化：新メンバー10名が入社",
      excerpt: "2024年第1四半期に新たに10名のエンジニアが入社しました。フロントエンド、バックエンド、インフラ各分野の専門家が加わり、開発体制が大幅に強化されます。",
      image: "https://images.pexels.com/photos/7551662/pexels-photo-7551662.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      category: "社内ニュース",
      readTime: "4分",
      views: "3.2k",
      date: "2024年1月18日",
      author: "採用チーム"
    },
    {
      title: "社内AI活用プロジェクト：生産性20%向上を達成",
      excerpt: "昨年開始したAI活用プロジェクトが大きな成果を上げています。ChatGPTやGitHub Copilotの導入により、開発効率が大幅に改善されました。",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      category: "社内ニュース",
      readTime: "8分",
      views: "4.1k",
      date: "2024年1月16日",
      author: "技術推進部"
    },
    {
      title: "リモートワーク制度の拡充：週4日在宅勤務が可能に",
      excerpt: "働き方改革の一環として、リモートワーク制度を拡充しました。週4日まで在宅勤務が可能となり、ワークライフバランスの向上を図ります。",
      image: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      category: "社内ニュース",
      readTime: "6分",
      views: "2.9k",
      date: "2024年1月14日",
      author: "人事部"
    },
    {
      title: "社内表彰制度「Tech Excellence Award」第1回受賞者発表",
      excerpt: "技術的な貢献を評価する新しい表彰制度の第1回受賞者が決定しました。革新的なソリューションを開発したメンバーを表彰します。",
      image: "https://images.pexels.com/photos/8386422/pexels-photo-8386422.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      category: "社内ニュース",
      readTime: "7分",
      views: "3.5k",
      date: "2024年1月12日",
      author: "技術推進部"
    },
    {
      title: "新オフィス開設：大阪支社が業務開始",
      excerpt: "関西地区での事業拡大に伴い、大阪支社を開設しました。関西圏の優秀な人材確保と顧客サービス向上を目指します。",
      image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      category: "社内ニュース",
      readTime: "5分",
      views: "2.3k",
      date: "2024年1月10日",
      author: "経営企画部"
    }
  ];

  const featuredNews = {
    title: "2024年度事業計画発表：AI技術を核とした新戦略",
    excerpt: "2024年度の事業計画が発表されました。AI技術を核とした新しいサービス開発と、技術組織の大幅な拡充を予定しています。全社員向けの説明会も開催予定です。",
    image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop",
    category: "社内ニュース",
    readTime: "12分",
    views: "5.8k",
    date: "2024年1月22日",
    author: "経営陣"
  };

  const quickUpdates = [
    {
      title: "社内カフェメニュー更新",
      time: "2時間前",
      icon: Coffee,
      color: "bg-amber-100 text-amber-800"
    },
    {
      title: "月次全体会議の資料公開",
      time: "4時間前",
      icon: Briefcase,
      color: "bg-blue-100 text-blue-800"
    },
    {
      title: "新入社員歓迎会の開催決定",
      time: "6時間前",
      icon: Users,
      color: "bg-green-100 text-green-800"
    },
    {
      title: "Q1業績目標達成のお知らせ",
      time: "1日前",
      icon: Award,
      color: "bg-purple-100 text-purple-800"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-100">
      {/* Header Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Users className="w-8 h-8 text-white" />
            <h1 className="text-3xl lg:text-4xl font-bold text-white">社内ニュース</h1>
          </div>
          <p className="text-indigo-100 text-lg max-w-2xl mx-auto">
            会社の最新情報、チームの動向、重要なお知らせをお届けします
          </p>
        </div>
      </section>

      {/* Quick Updates */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">最新の更新</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickUpdates.map((update, index) => (
              <div key={index} className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${update.color}`}>
                    <update.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900 line-clamp-2">{update.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{update.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured News */}
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
                  <span className="px-3 py-1 bg-indigo-600 text-white text-sm font-medium rounded-full flex items-center space-x-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>重要なお知らせ</span>
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
                  <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300">
                    詳細を読む
                  </button>
                  <span className="text-sm text-gray-500">発信者: {featuredNews.author}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">カテゴリー</h3>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 border border-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* News Articles */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-gray-900">社内ニュース一覧</h3>
            <span className="text-gray-500">{articles.length}件のニュース</span>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                author={article.author}
                size="medium"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="py-12 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">会社の現在</h3>
            <p className="text-indigo-100">数字で見る私たちの成長</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "従業員数", value: "248名", icon: Users },
              { label: "エンジニア", value: "156名", icon: Briefcase },
              { label: "プロジェクト", value: "42件", icon: TrendingUp },
              { label: "表彰実績", value: "28件", icon: Award }
            ].map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-white/20 transition-all duration-300">
                <stat.icon className="w-8 h-8 text-white mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-indigo-200 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal Communication */}
      <section className="py-12 bg-white/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            社内コミュニケーション
          </h3>
          <p className="text-gray-600 mb-8">
            質問や提案がありましたら、お気軽にお声がけください
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300">
              社内チャットを開く
            </button>
            <button className="border-2 border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-indigo-50 transition-all duration-300">
              提案ボックス
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CompanyNewsPage;