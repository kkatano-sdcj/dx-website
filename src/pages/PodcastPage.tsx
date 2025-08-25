import React, { useState } from 'react';
import { usePodcasts } from '../hooks/usePodcasts';
import { Mic, Play, Pause, Download, Share2, Clock, Calendar, Users } from 'lucide-react';

const PodcastPage = () => {
  const [playingEpisode, setPlayingEpisode] = useState<number | null>(null);
  
  // CMS データを取得
  const { podcasts, loading: podcastsLoading } = usePodcasts();

  const featuredEpisode = {
    id: 1,
    title: "AI時代のエンジニアキャリア戦略",
    description: "ChatGPTやGitHub Copilotなどのツールが普及する中、エンジニアはどのようにキャリアを築いていくべきか。業界のエキスパートと共に議論します。",
    duration: "45:32",
    publishDate: "2024年1月20日",
    guests: ["山田太郎（AIスペシャリスト）", "佐藤花子（プロダクトマネージャー）"],
    image: "https://images.pexels.com/photos/7551662/pexels-photo-7551662.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    plays: "3.2k",
    category: "キャリア"
  };

  const episodes = [
    {
      id: 2,
      title: "マイクロサービスアーキテクチャの実践と課題",
      description: "実際にマイクロサービスを導入した企業の事例を基に、メリット・デメリット、導入時の注意点について詳しく解説します。",
      duration: "38:15",
      publishDate: "2024年1月18日",
      guests: ["田中一郎（システムアーキテクト）"],
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      plays: "2.8k",
      category: "アーキテクチャ"
    },
    {
      id: 3,
      title: "データサイエンス入門：統計学からPythonまで",
      description: "データサイエンスの基礎となる統計学の概念から、Pythonを使った実践的なデータ分析手法まで初心者向けに解説。",
      duration: "42:20",
      publishDate: "2024年1月16日",
      guests: ["鈴木美咲（データサイエンティスト）"],
      image: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      plays: "3.1k",
      category: "データサイエンス"
    },
    {
      id: 4,
      title: "React 18の新機能とパフォーマンス最適化",
      description: "React 18で追加された新機能Concurrent Featuresの詳細解説と、実際のアプリケーションでのパフォーマンス最適化テクニック。",
      duration: "35:45",
      publishDate: "2024年1月14日",
      guests: ["高橋健太（フロントエンドエンジニア）"],
      image: "https://images.pexels.com/photos/8386422/pexels-photo-8386422.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      plays: "2.5k",
      category: "フロントエンド"
    },
    {
      id: 5,
      title: "クラウドネイティブ開発のベストプラクティス",
      description: "Kubernetes、Docker、CI/CDパイプラインを活用したモダンな開発手法について、実際の導入事例を交えて紹介。",
      duration: "41:10",
      publishDate: "2024年1月12日",
      guests: ["伊藤雅子（DevOpsエンジニア）"],
      image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      plays: "2.9k",
      category: "DevOps"
    },
    {
      id: 6,
      title: "セキュリティファーストな開発手法",
      description: "開発プロセスにセキュリティを組み込むDevSecOpsの実践方法と、よくある脆弱性の対策について詳しく解説。",
      duration: "39:28",
      publishDate: "2024年1月10日",
      guests: ["中村拓也（セキュリティエンジニア）"],
      image: "https://images.pexels.com/photos/7551662/pexels-photo-7551662.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      plays: "2.2k",
      category: "セキュリティ"
    }
  ];

  const categories = [
    { name: "すべて", count: 25 },
    { name: "キャリア", count: 8 },
    { name: "技術解説", count: 12 },
    { name: "アーキテクチャ", count: 5 },
    { name: "データサイエンス", count: 6 },
    { name: "フロントエンド", count: 7 },
    { name: "DevOps", count: 4 },
    { name: "セキュリティ", count: 3 }
  ];

  const togglePlay = (episodeId: number) => {
    setPlayingEpisode(playingEpisode === episodeId ? null : episodeId);
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'キャリア': 'bg-blue-100 text-blue-800',
      'アーキテクチャ': 'bg-green-100 text-green-800',
      'データサイエンス': 'bg-purple-100 text-purple-800',
      'フロントエンド': 'bg-orange-100 text-orange-800',
      'DevOps': 'bg-red-100 text-red-800',
      'セキュリティ': 'bg-gray-100 text-gray-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-pink-100">
      {/* Header Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-600 to-pink-600">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Mic className="w-8 h-8 text-white" />
            <h1 className="text-3xl lg:text-4xl font-bold text-white">TechTalk Podcast</h1>
          </div>
          <p className="text-red-100 text-lg max-w-2xl mx-auto">
            技術トレンドとキャリア戦略を専門家と共に深掘りするポッドキャスト
          </p>
        </div>
      </section>

      {/* Featured Episode */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative">
                <img 
                  src={featuredEpisode.image}
                  alt={featuredEpisode.title}
                  className="w-full h-64 lg:h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button 
                    onClick={() => togglePlay(featuredEpisode.id)}
                    className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors shadow-lg"
                  >
                    {playingEpisode === featuredEpisode.id ? (
                      <Pause className="w-8 h-8 text-white" />
                    ) : (
                      <Play className="w-8 h-8 text-white ml-1" />
                    )}
                  </button>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-red-600 text-white text-sm font-medium rounded-full">
                    最新エピソード
                  </span>
                </div>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{featuredEpisode.publishDate}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{featuredEpisode.duration}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{featuredEpisode.plays}</span>
                  </span>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  {featuredEpisode.title}
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {featuredEpisode.description}
                </p>
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">ゲスト</h4>
                  <ul className="text-sm text-gray-600">
                    {featuredEpisode.guests.map((guest, index) => (
                      <li key={index}>• {guest}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => togglePlay(featuredEpisode.id)}
                    className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
                  >
                    {playingEpisode === featuredEpisode.id ? (
                      <>
                        <Pause className="w-5 h-5" />
                        <span>一時停止</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5" />
                        <span>再生</span>
                      </>
                    )}
                  </button>
                  <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Download className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">カテゴリー</h3>
          <div className="flex flex-wrap gap-3">
            {categories.map((category, index) => (
              <button
                key={index}
                className="px-4 py-2 bg-white text-gray-700 rounded-full hover:bg-red-50 hover:text-red-600 transition-all duration-300 text-sm font-medium border border-gray-200"
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Episodes List */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-gray-900">エピソード一覧</h3>
            <span className="text-gray-500">{episodes.length}エピソード</span>
          </div>
          
          <div className="space-y-6">
            {podcastsLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
                  <div className="grid md:grid-cols-4 gap-0">
                    <div className="w-full h-32 md:h-full bg-gray-200"></div>
                    <div className="md:col-span-3 p-6">
                      <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                      <div className="h-6 bg-gray-200 rounded mb-3"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : podcasts.length > 0 ? (
              podcasts.map((podcast) => {
                const imageUrl = podcast.attributes.coverImage?.data?.attributes.url 
                  ? `http://localhost:1337${podcast.attributes.coverImage.data.attributes.url}`
                  : 'https://images.pexels.com/photos/7551662/pexels-photo-7551662.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop';
                
                const publishedDate = new Date(podcast.attributes.publishedDate || podcast.attributes.createdAt).toLocaleDateString('ja-JP');
                
                return (
                  <div key={podcast.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                    <div className="grid md:grid-cols-4 gap-0">
                      <div className="relative">
                        <img 
                          src={imageUrl}
                          alt={podcast.attributes.title}
                          className="w-full h-32 md:h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <button 
                            onClick={() => togglePlay(podcast.id)}
                            className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
                          >
                            {playingEpisode === podcast.id ? (
                              <Pause className="w-5 h-5 text-white" />
                            ) : (
                              <Play className="w-5 h-5 text-white ml-0.5" />
                            )}
                          </button>
                        </div>
                        <div className="absolute top-2 left-2">
                          <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                            {podcast.attributes.category}
                          </span>
                        </div>
                      </div>
                      
                      <div className="md:col-span-3 p-6">
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                          <span className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{publishedDate}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{podcast.attributes.duration}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{podcast.attributes.plays}</span>
                          </span>
                        </div>
                        
                        <h4 className="text-xl font-semibold text-gray-900 mb-2 hover:text-red-600 transition-colors cursor-pointer">
                          第{podcast.attributes.episodeNumber}回: {podcast.attributes.title}
                        </h4>
                        
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                          {podcast.attributes.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <div>
                            {podcast.attributes.guests && podcast.attributes.guests.length > 0 && (
                              <>
                                <span className="text-sm text-gray-500">ゲスト: </span>
                                <span className="text-sm text-gray-700">{podcast.attributes.guests.join(', ')}</span>
                              </>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                              <Download className="w-4 h-4 text-gray-500" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                              <Share2 className="w-4 h-4 text-gray-500" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              episodes.map((episode) => (
                <div key={episode.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                  <div className="grid md:grid-cols-4 gap-0">
                    <div className="relative">
                      <img 
                        src={episode.image}
                        alt={episode.title}
                        className="w-full h-32 md:h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button 
                          onClick={() => togglePlay(episode.id)}
                          className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
                        >
                          {playingEpisode === episode.id ? (
                            <Pause className="w-5 h-5 text-white" />
                          ) : (
                            <Play className="w-5 h-5 text-white ml-0.5" />
                          )}
                        </button>
                      </div>
                      <div className="absolute top-2 left-2">
                        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                          {episode.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="md:col-span-3 p-6">
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{episode.publishDate}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{episode.duration}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{episode.plays}</span>
                        </span>
                      </div>
                      
                      <h4 className="text-xl font-semibold text-gray-900 mb-2 hover:text-red-600 transition-colors cursor-pointer">
                        {episode.title}
                      </h4>
                      
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        {episode.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm text-gray-500">ゲスト: </span>
                          <span className="text-sm text-gray-700">{episode.guests.join(', ')}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <Download className="w-4 h-4 text-gray-500" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <Share2 className="w-4 h-4 text-gray-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-12 bg-gradient-to-r from-red-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            ポッドキャストを購読
          </h3>
          <p className="text-red-100 mb-8">
            最新エピソードの通知を受け取り、見逃すことなく学習を続けましょう
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            {['Apple Podcasts', 'Spotify', 'Google Podcasts', 'RSS'].map((platform) => (
              <button 
                key={platform}
                className="bg-white text-red-600 px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
              >
                {platform}で購読
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PodcastPage;