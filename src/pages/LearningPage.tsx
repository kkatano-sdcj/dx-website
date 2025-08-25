import React, { useState } from 'react';
import { TrendingUp, Play, BookOpen, Award, Clock, Users } from 'lucide-react';
import ArticleCard from '../components/ArticleCard';

const LearningPage = () => {
  const [selectedLevel, setSelectedLevel] = useState('all');

  const levels = [
    { id: 'all', name: 'すべて' },
    { id: 'beginner', name: '初級' },
    { id: 'intermediate', name: '中級' },
    { id: 'advanced', name: '上級' }
  ];

  const courses = [
    {
      title: "Python機械学習入門コース",
      description: "Pythonを使った機械学習の基礎から実践まで学べる包括的なコース",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      level: "初級",
      duration: "8週間",
      lessons: 24,
      students: 156,
      progress: 0
    },
    {
      title: "React.js完全マスターコース",
      description: "モダンなReact開発に必要なスキルを体系的に習得",
      image: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      level: "中級",
      duration: "6週間",
      lessons: 18,
      students: 203,
      progress: 35
    },
    {
      title: "AWS クラウドアーキテクチャ設計",
      description: "スケーラブルなクラウドインフラの設計と運用を学ぶ",
      image: "https://images.pexels.com/photos/8386422/pexels-photo-8386422.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      level: "上級",
      duration: "10週間",
      lessons: 30,
      students: 89,
      progress: 0
    }
  ];

  const articles = [
    {
      title: "プログラミング学習ロードマップ2024：効率的なスキル習得法",
      excerpt: "2024年に学ぶべきプログラミング言語とフレームワークを体系的に整理。初心者から上級者まで、レベル別の学習計画を詳しく解説します。",
      image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      category: "学習",
      readTime: "12分",
      views: "5.2k",
      date: "2024年1月20日",
      author: "学習支援チーム"
    },
    {
      title: "データサイエンス入門：統計学からPythonまで",
      excerpt: "データサイエンスの基礎となる統計学の概念から、Pythonを使った実践的なデータ分析手法まで、初心者向けに分かりやすく解説。",
      image: "https://images.pexels.com/photos/7551662/pexels-photo-7551662.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      category: "学習",
      readTime: "15分",
      views: "4.1k",
      date: "2024年1月18日",
      author: "データサイエンティスト 田中"
    },
    {
      title: "Git & GitHub完全ガイド：チーム開発のベストプラクティス",
      excerpt: "バージョン管理システムGitの基本操作から、GitHubを使ったチーム開発のワークフローまで、実践的なスキルを身につけます。",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      category: "学習",
      readTime: "18分",
      views: "3.8k",
      date: "2024年1月16日",
      author: "開発チームリーダー 佐藤"
    },
    {
      title: "UI/UXデザイン基礎講座：ユーザー中心設計の原則",
      excerpt: "優れたユーザーエクスペリエンスを提供するためのデザイン原則と実践方法。Figmaを使った実際のデザインプロセスも紹介。",
      image: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      category: "学習",
      readTime: "14分",
      views: "2.9k",
      date: "2024年1月14日",
      author: "UXデザイナー 山田"
    },
    {
      title: "アジャイル開発入門：スクラムとカンバンの実践",
      excerpt: "アジャイル開発手法の基本概念から、スクラムとカンバンの具体的な実践方法まで、チーム開発の効率化に必要な知識を学習。",
      image: "https://images.pexels.com/photos/8386422/pexels-photo-8386422.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      category: "学習",
      readTime: "16分",
      views: "3.3k",
      date: "2024年1月12日",
      author: "プロジェクトマネージャー 鈴木"
    },
    {
      title: "セキュリティ基礎：Webアプリケーションの脆弱性対策",
      excerpt: "Webアプリケーション開発で注意すべきセキュリティ脆弱性と対策方法。OWASP Top 10を基にした実践的なセキュリティ対策を解説。",
      image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      category: "学習",
      readTime: "20分",
      views: "2.7k",
      date: "2024年1月10日",
      author: "セキュリティエンジニア 高橋"
    }
  ];

  const getLevelColor = (level: string) => {
    const colors: { [key: string]: string } = {
      '初級': 'bg-green-100 text-green-800',
      '中級': 'bg-yellow-100 text-yellow-800',
      '上級': 'bg-red-100 text-red-800'
    };
    return colors[level] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100">
      {/* Header Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-indigo-600">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <TrendingUp className="w-8 h-8 text-white" />
            <h1 className="text-3xl lg:text-4xl font-bold text-white">学習コンテンツ</h1>
          </div>
          <p className="text-purple-100 text-lg max-w-2xl mx-auto">
            体系的な学習コースと実践的なチュートリアルでスキルアップを支援
          </p>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">おすすめコース</h2>
            <div className="flex space-x-2">
              {levels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => setSelectedLevel(level.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedLevel === level.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-purple-50 border border-gray-200'
                  }`}
                >
                  {level.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <img 
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${getLevelColor(course.level)}`}>
                      {course.level}
                    </span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/50">
                    <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-medium flex items-center space-x-2">
                      <Play className="w-5 h-5" />
                      <span>コースを開始</span>
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{course.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{course.lessons}レッスン</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{course.students}人</span>
                    </span>
                  </div>

                  {course.progress > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">進捗</span>
                        <span className="text-purple-600 font-medium">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300">
                    {course.progress > 0 ? '続きを学習' : 'コースを開始'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Articles */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-gray-900">学習記事</h3>
            <span className="text-gray-500">{articles.length}件の記事</span>
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

      {/* Learning Path */}
      <section className="py-12 bg-gradient-to-r from-purple-600 to-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">学習パス</h3>
            <p className="text-purple-100">目標に応じた体系的な学習計画</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                title: "フロントエンド開発者", 
                description: "HTML/CSS → JavaScript → React → TypeScript",
                icon: "🎨",
                duration: "3-6ヶ月"
              },
              { 
                title: "バックエンド開発者", 
                description: "Python/Node.js → データベース → API設計 → クラウド",
                icon: "⚙️",
                duration: "4-8ヶ月"
              },
              { 
                title: "データサイエンティスト", 
                description: "統計学 → Python → 機械学習 → データ可視化",
                icon: "📊",
                duration: "6-12ヶ月"
              },
              { 
                title: "DevOpsエンジニア", 
                description: "Linux → Docker → Kubernetes → CI/CD",
                icon: "🚀",
                duration: "4-8ヶ月"
              }
            ].map((path, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300">
                <div className="text-3xl mb-3">{path.icon}</div>
                <h4 className="text-lg font-bold text-white mb-2">{path.title}</h4>
                <p className="text-purple-100 text-sm mb-3 leading-relaxed">{path.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-purple-200 text-xs">{path.duration}</span>
                  <Award className="w-4 h-4 text-purple-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LearningPage;