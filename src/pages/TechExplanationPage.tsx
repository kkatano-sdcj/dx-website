import React, { useState } from 'react';
import { useArticles } from '../hooks/useArticles';
import { BookOpen, Code, Database, Cpu, Globe, Shield } from 'lucide-react';
import CMSArticleCard from '../components/CMSArticleCard';

const TechExplanationPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // CMS データを取得
  const { articles: allArticles, loading: articlesLoading } = useArticles({ category: 'tech-explanation' });

  const categories = [
    { id: 'all', name: 'すべて', icon: BookOpen },
    { id: 'programming', name: 'プログラミング', icon: Code },
    { id: 'database', name: 'データベース', icon: Database },
    { id: 'infrastructure', name: 'インフラ', icon: Cpu },
    { id: 'web', name: 'Web技術', icon: Globe },
    { id: 'security', name: 'セキュリティ', icon: Shield }
  ];

  const articles = [
    {
      title: "Docker完全ガイド：コンテナ技術の基礎から実践まで",
      excerpt: "Dockerの基本概念から実際の開発環境での活用方法まで、初心者にも分かりやすく解説します。コンテナ化のメリットと実装のポイントを詳しく説明。",
      image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      category: "技術解説",
      readTime: "12分",
      views: "4.2k",
      date: "2024年1月20日",
      author: "インフラエンジニア 佐藤"
    },
    {
      title: "React Hooks完全マスター：useEffect、useState、カスタムフック",
      excerpt: "React Hooksの基本から応用まで徹底解説。useEffect、useStateの正しい使い方と、カスタムフックの作成方法について実例を交えて説明します。",
      image: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      category: "技術解説",
      readTime: "15分",
      views: "3.8k",
      date: "2024年1月18日",
      author: "フロントエンド開発者 田中"
    },
    {
      title: "PostgreSQL vs MySQL：データベース選択の決定要因",
      excerpt: "PostgreSQLとMySQLの特徴を比較分析。パフォーマンス、機能、運用面での違いを詳しく解説し、プロジェクトに最適なデータベースの選び方を紹介。",
      image: "https://images.pexels.com/photos/8386422/pexels-photo-8386422.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      category: "技術解説",
      readTime: "10分",
      views: "2.9k",
      date: "2024年1月16日",
      author: "データベースエンジニア 山田"
    },
    {
      title: "Kubernetes入門：オーケストレーションの基礎概念",
      excerpt: "Kubernetesの基本概念であるPod、Service、Deploymentについて分かりやすく解説。コンテナオーケストレーションの重要性と実装方法を学びます。",
      image: "https://images.pexels.com/photos/7551662/pexels-photo-7551662.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      category: "技術解説",
      readTime: "18分",
      views: "3.1k",
      date: "2024年1月14日",
      author: "クラウドアーキテクト 鈴木"
    },
    {
      title: "GraphQL vs REST API：モダンAPI設計の比較",
      excerpt: "GraphQLとREST APIの特徴を詳細比較。それぞれのメリット・デメリット、使用場面、実装時の注意点について実例を交えて解説します。",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      category: "技術解説",
      readTime: "13分",
      views: "2.7k",
      date: "2024年1月12日",
      author: "バックエンド開発者 高橋"
    },
    {
      title: "TypeScript型システム完全ガイド：ジェネリクスと高度な型",
      excerpt: "TypeScriptの型システムを深く理解するための完全ガイド。ジェネリクス、ユニオン型、インターセクション型など高度な型の使い方を詳しく解説。",
      image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      category: "技術解説",
      readTime: "20分",
      views: "4.5k",
      date: "2024年1月10日",
      author: "TypeScript専門家 伊藤"
    }
  ];

  const featuredTutorial = {
    title: "マイクロサービスアーキテクチャ設計パターン完全ガイド",
    excerpt: "マイクロサービスアーキテクチャの設計パターンを体系的に解説。サービス分割の原則、通信パターン、データ管理戦略について実践的なアプローチで説明します。",
    image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop",
    category: "技術解説",
    readTime: "25分",
    views: "6.1k",
    date: "2024年1月22日",
    author: "システムアーキテクト 中村"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100">
      {/* Header Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <BookOpen className="w-8 h-8 text-white" />
            <h1 className="text-3xl lg:text-4xl font-bold text-white">技術解説</h1>
          </div>
          <p className="text-green-100 text-lg max-w-2xl mx-auto">
            最新技術から基礎概念まで、エンジニアに必要な知識を分かりやすく解説
          </p>
        </div>
      </section>

      {/* Featured Tutorial */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative">
                <img 
                  src={featuredTutorial.image}
                  alt={featuredTutorial.title}
                  className="w-full h-64 lg:h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-green-600 text-white text-sm font-medium rounded-full flex items-center space-x-1">
                    <BookOpen className="w-4 h-4" />
                    <span>詳細ガイド</span>
                  </span>
                </div>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <span>{featuredTutorial.date}</span>
                  <span>{featuredTutorial.readTime}</span>
                  <span>{featuredTutorial.views} views</span>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  {featuredTutorial.title}
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {featuredTutorial.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300">
                    ガイドを読む
                  </button>
                  <span className="text-sm text-gray-500">執筆者: {featuredTutorial.author}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">技術カテゴリー</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-xl text-center transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-green-600 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-green-50 hover:text-green-600 border border-gray-200'
                }`}
              >
                <category.icon className="w-6 h-6 mx-auto mb-2" />
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-gray-900">技術解説記事</h3>
            <span className="text-gray-500">{articles.length}件の記事</span>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articlesLoading ? (
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
              allArticles.map((article) => (
                <CMSArticleCard
                  key={article.id}
                  article={article}
                  size="medium"
                />
              ))
            ) : (
              articles.map((article, index) => (
                <div key={index} className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100/50 transform hover:-translate-y-2">
                  <div className="relative overflow-hidden">
                    <img 
                      src={article.image}
                      alt={article.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-6 left-6">
                      <span className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-semibold rounded-full shadow-lg backdrop-blur-sm">
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

      {/* Technical Terms Section */}
      <section className="py-12 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">テクニカルターム辞典</h3>
            <p className="text-green-100">よく使われる技術用語を分かりやすく解説</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { term: "API", definition: "Application Programming Interface - アプリケーション間の通信を可能にするインターフェース" },
              { term: "CI/CD", definition: "Continuous Integration/Continuous Deployment - 継続的インテグレーション・デプロイメント" },
              { term: "ORM", definition: "Object-Relational Mapping - オブジェクトとリレーショナルデータベースのマッピング技術" },
              { term: "SPA", definition: "Single Page Application - 単一ページで動作するWebアプリケーション" }
            ].map((item, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300">
                <h4 className="text-xl font-bold text-white mb-2">{item.term}</h4>
                <p className="text-green-100 text-sm leading-relaxed">{item.definition}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300">
              用語辞典をもっと見る
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TechExplanationPage;