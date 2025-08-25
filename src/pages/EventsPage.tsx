import React, { useState } from 'react';
import { useEvents } from '../hooks/useEvents';
import { Calendar, MapPin, Users, Clock, ExternalLink, Filter } from 'lucide-react';

const EventsPage = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  // CMS データを取得
  const { events: upcomingEvents, loading: upcomingLoading } = useEvents('upcoming');
  const { events: pastEvents, loading: pastLoading } = useEvents('past');

  const filters = [
    { id: 'all', name: 'すべて' },
    { id: 'upcoming', name: '開催予定' },
    { id: 'online', name: 'オンライン' },
    { id: 'offline', name: 'オフライン' },
    { id: 'workshop', name: 'ワークショップ' },
    { id: 'seminar', name: 'セミナー' }
  ];

  const upcomingEventsStatic = [
    {
      id: 1,
      title: "社内ハッカソン2024：AIを活用した業務効率化",
      description: "3日間にわたる社内ハッカソンイベント。AIツールを活用した業務効率化ソリューションの開発に挑戦します。優秀作品には賞金と実装支援を提供。",
      date: "2024年3月15日 - 17日",
      time: "9:00 - 18:00",
      location: "本社オフィス + オンライン",
      type: "ハッカソン",
      participants: "50名",
      status: "募集中",
      image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      tags: ["AI", "ハッカソン", "業務効率化"],
      organizer: "技術推進部"
    },
    {
      id: 2,
      title: "React 18 & Next.js 14 実践ワークショップ",
      description: "最新のReact 18とNext.js 14の新機能を実際に手を動かしながら学ぶワークショップ。Server ComponentsやApp Routerの実装方法を詳しく解説。",
      date: "2024年2月28日",
      time: "13:00 - 17:00",
      location: "オンライン（Zoom）",
      type: "ワークショップ",
      participants: "30名",
      status: "募集中",
      image: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      tags: ["React", "Next.js", "フロントエンド"],
      organizer: "フロントエンド開発チーム"
    },
    {
      id: 3,
      title: "データサイエンス勉強会：機械学習モデルの評価手法",
      description: "機械学習モデルの性能評価に関する勉強会。交差検証、ROC曲線、混同行列など、実際のプロジェクトで使える評価手法を学習します。",
      date: "2024年2月25日",
      time: "19:00 - 21:00",
      location: "会議室A + オンライン",
      type: "勉強会",
      participants: "25名",
      status: "募集中",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      tags: ["データサイエンス", "機械学習", "評価手法"],
      organizer: "データサイエンスチーム"
    },
    {
      id: 4,
      title: "クラウドセキュリティセミナー：AWS環境の脅威対策",
      description: "AWS環境におけるセキュリティベストプラクティスとよくある脅威への対策方法を解説。IAM、VPC、CloudTrailの設定方法も実演します。",
      date: "2024年2月22日",
      time: "14:00 - 16:00",
      location: "オンライン（Teams）",
      type: "セミナー",
      participants: "40名",
      status: "募集中",
      image: "https://images.pexels.com/photos/8386422/pexels-photo-8386422.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      tags: ["AWS", "セキュリティ", "クラウド"],
      organizer: "セキュリティチーム"
    }
  ];

  const pastEventsStatic = [
    {
      id: 5,
      title: "新年キックオフ：2024年技術トレンド予測",
      description: "2024年の技術トレンドを予測し、チームの学習計画を立てるキックオフイベント。",
      date: "2024年1月15日",
      time: "10:00 - 12:00",
      location: "本社オフィス",
      type: "キックオフ",
      participants: "80名",
      status: "終了",
      image: "https://images.pexels.com/photos/7551662/pexels-photo-7551662.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      tags: ["トレンド", "キックオフ", "計画"],
      organizer: "技術推進部"
    },
    {
      id: 6,
      title: "Docker & Kubernetes 実践講座",
      description: "コンテナ技術の基礎から本番運用まで、実際の環境を使って学ぶ実践講座。",
      date: "2024年1月10日",
      time: "13:00 - 18:00",
      location: "研修室B",
      type: "講座",
      participants: "20名",
      status: "終了",
      image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      tags: ["Docker", "Kubernetes", "インフラ"],
      organizer: "インフラチーム"
    }
  ];

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      '募集中': 'bg-green-100 text-green-800',
      '満員': 'bg-red-100 text-red-800',
      '終了': 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'ハッカソン': 'bg-purple-600',
      'ワークショップ': 'bg-blue-600',
      '勉強会': 'bg-green-600',
      'セミナー': 'bg-orange-600',
      'キックオフ': 'bg-indigo-600',
      '講座': 'bg-red-600'
    };
    return colors[type] || 'bg-gray-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-amber-100">
      {/* Header Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-600 to-amber-600">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Calendar className="w-8 h-8 text-white" />
            <h1 className="text-3xl lg:text-4xl font-bold text-white">イベント</h1>
          </div>
          <p className="text-orange-100 text-lg max-w-2xl mx-auto">
            技術勉強会、ワークショップ、ハッカソンなど様々な学習イベントを開催
          </p>
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
                    ? 'bg-orange-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600 border border-gray-200'
                }`}
              >
                {filter.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">開催予定のイベント</h2>
            <span className="text-gray-500">{upcomingEventsStatic.length}件のイベント</span>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {upcomingLoading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-sm overflow-hidden animate-pulse">
                  <div className="w-full h-48 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              ))
            ) : upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => {
                const imageUrl = event.attributes.featuredImage?.data?.attributes.url 
                  ? `http://localhost:1337${event.attributes.featuredImage.data.attributes.url}`
                  : 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop';
                
                const startDate = new Date(event.attributes.startDate).toLocaleDateString('ja-JP');
                const startTime = new Date(event.attributes.startDate).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
                const endTime = event.attributes.endDate ? new Date(event.attributes.endDate).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' }) : null;
                
                return (
                  <div key={event.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
                    <div className="relative">
                      <img 
                        src={imageUrl}
                        alt={event.attributes.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-orange-600 text-white text-sm font-medium rounded-full">
                          {event.attributes.eventType}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                          {event.attributes.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 hover:text-orange-600 transition-colors cursor-pointer">
                        {event.attributes.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        {event.attributes.description}
                      </p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>{startDate}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>{startTime}{endTime && ` - ${endTime}`}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>{event.attributes.location}</span>
                        </div>
                        {event.attributes.maxParticipants && (
                          <div className="flex items-center text-sm text-gray-500">
                            <Users className="w-4 h-4 mr-2" />
                            <span>定員: {event.attributes.maxParticipants}名 (現在: {event.attributes.currentParticipants}名)</span>
                          </div>
                        )}
                      </div>

                      {event.attributes.tags && event.attributes.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {event.attributes.tags.map((tag: string, index: number) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <span className="text-sm text-gray-500">主催: {event.attributes.organizer}</span>
                        <button className="bg-gradient-to-r from-orange-600 to-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300 flex items-center space-x-1">
                          <span>参加申込</span>
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              upcomingEventsStatic.map((event) => (
                <div key={event.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <div className="relative">
                    <img 
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 ${getTypeColor(event.type)} text-white text-sm font-medium rounded-full`}>
                        {event.type}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(event.status)}`}>
                        {event.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 hover:text-orange-600 transition-colors cursor-pointer">
                      {event.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {event.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Users className="w-4 h-4 mr-2" />
                        <span>定員: {event.participants}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {event.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-sm text-gray-500">主催: {event.organizer}</span>
                      <button className="bg-gradient-to-r from-orange-600 to-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300 flex items-center space-x-1">
                        <span>参加申込</span>
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">過去のイベント</h2>
            <span className="text-gray-500">{pastLoading ? '...' : pastEvents.length}件のイベント</span>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastLoading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden opacity-75 animate-pulse">
                  <div className="w-full h-32 bg-gray-200"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              ))
            ) : pastEvents.length > 0 ? (
              pastEvents.map((event) => {
                const imageUrl = event.attributes.featuredImage?.data?.attributes.url 
                  ? `http://localhost:1337${event.attributes.featuredImage.data.attributes.url}`
                  : 'https://images.pexels.com/photos/7551662/pexels-photo-7551662.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop';
                
                const startDate = new Date(event.attributes.startDate).toLocaleDateString('ja-JP');
                
                return (
                  <div key={event.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden opacity-75">
                    <div className="relative">
                      <img 
                        src={imageUrl}
                        alt={event.attributes.title}
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute top-2 left-2">
                        <span className="px-2 py-1 bg-orange-600 text-white text-xs font-medium rounded-full">
                          {event.attributes.eventType}
                        </span>
                      </div>
                      <div className="absolute top-2 right-2">
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
                          {event.attributes.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {event.attributes.title}
                      </h4>
                      
                      <div className="space-y-1 mb-3">
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="w-3 h-3 mr-1" />
                          <span>{startDate}</span>
                        </div>
                        {event.attributes.maxParticipants && (
                          <div className="flex items-center text-xs text-gray-500">
                            <Users className="w-3 h-3 mr-1" />
                            <span>{event.attributes.currentParticipants}名参加</span>
                          </div>
                        )}
                      </div>

                      {event.attributes.tags && event.attributes.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {event.attributes.tags.slice(0, 2).map((tag: string, index: number) => (
                            <span key={index} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <button className="text-orange-600 hover:text-orange-800 text-sm font-medium">
                        レポートを見る
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              pastEventsStatic.map((event) => (
                <div key={event.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden opacity-75">
                  <div className="relative">
                    <img 
                      src={event.image}
                      alt={event.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <span className={`px-2 py-1 ${getTypeColor(event.type)} text-white text-xs font-medium rounded-full`}>
                        {event.type}
                      </span>
                    </div>
                    <div className="absolute top-2 right-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(event.status)}`}>
                        {event.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {event.title}
                    </h4>
                    
                    <div className="space-y-1 mb-3">
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Users className="w-3 h-3 mr-1" />
                        <span>{event.participants}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {event.tags.slice(0, 2).map((tag, index) => (
                        <span key={index} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <button className="text-orange-600 hover:text-orange-800 text-sm font-medium">
                      レポートを見る
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Event Calendar */}
      <section className="py-12 bg-gradient-to-r from-orange-600 to-amber-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            イベントカレンダー
          </h3>
          <p className="text-orange-100 mb-8">
            今後のイベントスケジュールを確認し、参加予定を管理しましょう
          </p>
          
          <button className="bg-white text-orange-600 px-8 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center space-x-2 mx-auto">
            <Calendar className="w-5 h-5" />
            <span>カレンダーを開く</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default EventsPage;