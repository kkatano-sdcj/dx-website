import React, { useState, useEffect } from 'react';
import { aiTechApi, Article } from '../services/api';
import { BookOpen, Code, Database, Cpu, Globe, Shield, Clock, Eye } from 'lucide-react';

const TechExplanationPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [articlesLoading, setArticlesLoading] = useState(true);
  const [featuredArticle, setFeaturedArticle] = useState<Article | null>(null);

  // Strapiから記事を取得
  useEffect(() => {
    const fetchArticles = async () => {
      setArticlesLoading(true);
      try {
        // テクニカルターム解説カテゴリーの記事を取得
        const response = await aiTechApi.getAll({
          populate: 'featuredImage,category,author,tags',
          sort: 'publishedDate:desc'
        });

        const articles = response.data || [];
        setAllArticles(articles);
        setFilteredArticles(articles);

        // フィーチャード記事を選択（最新または特集フラグがある記事）
        const featured = articles.find((article: Article) => article.attributes.isFeatured) || articles[0];
        setFeaturedArticle(featured);
      } catch (error) {
        console.error('Error fetching articles:', error);
        // API失敗時はフォールバックデータを使用
        setAllArticles(fallbackArticles);
        setFilteredArticles(fallbackArticles);
        setFeaturedArticle(fallbackArticles[0]);
      } finally {
        setArticlesLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // カテゴリーでフィルタリング
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredArticles(allArticles);
    } else {
      // タグでフィルタリング
      const filtered = allArticles.filter((article: Article) => {
        const tags = article.attributes.tags?.data || [];
        return tags.some(tag => tag.attributes.slug === selectedCategory);
      });
      setFilteredArticles(filtered);
    }
  }, [selectedCategory, allArticles]);

  const categories = [
    { id: 'all', name: 'すべて', icon: BookOpen },
    { id: 'programming', name: 'プログラミング', icon: Code },
    { id: 'database', name: 'データベース', icon: Database },
    { id: 'infrastructure', name: 'インフラ', icon: Cpu },
    { id: 'web', name: 'Web技術', icon: Globe },
    { id: 'security', name: 'セキュリティ', icon: Shield },
    { id: 'ai', name: 'AI', icon: Cpu },
    { id: 'vibecoding', name: 'バイブコーディング', icon: Code }
  ];

  // フォールバック用のダミーデータ
  const fallbackArticles = [
    {
      id: 1,
      attributes: {
        title: "Docker完全ガイド：コンテナ技術の基礎から実践まで",
        excerpt: "Dockerの基本概念から実際の開発環境での活用方法まで、初心者にも分かりやすく解説します。",
        readTime: 12,
        views: 4200,
        publishedDate: "2024-01-20",
        isFeatured: true,
        featuredImage: {
          data: {
            attributes: {
              url: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
            }
          }
        },
        category: {
          data: {
            attributes: {
              name: "技術解説",
              slug: "tech-explanation"
            }
          }
        },
        author: {
          data: {
            attributes: {
              name: "佐藤",
              position: "インフラエンジニア"
            }
          }
        },
        tags: {
          data: [
            { attributes: { name: "インフラ", slug: "infrastructure" } }
          ]
        }
      }
    },
    {
      id: 2,
      attributes: {
        title: "React Hooksの基礎：useState、useEffectを完全理解",
        excerpt: "React Hooksの中でも特に重要なuseStateとuseEffectについて、実例を交えながら詳しく解説します。",
        readTime: 10,
        views: 3800,
        publishedDate: "2024-01-18",
        isFeatured: false,
        featuredImage: {
          data: {
            attributes: {
              url: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
            }
          }
        },
        category: {
          data: {
            attributes: {
              name: "技術解説",
              slug: "tech-explanation"
            }
          }
        },
        author: {
          data: {
            attributes: {
              name: "田中",
              position: "フロントエンドエンジニア"
            }
          }
        },
        tags: {
          data: [
            { attributes: { name: "プログラミング", slug: "programming" } }
          ]
        }
      }
    },
    {
      id: 3,
      attributes: {
        title: "PostgreSQL vs MySQL：どちらを選ぶべきか",
        excerpt: "PostgreSQLとMySQLの特徴を比較し、プロジェクトに最適なデータベースの選び方を解説します。",
        readTime: 15,
        views: 5100,
        publishedDate: "2024-01-15",
        isFeatured: false,
        featuredImage: {
          data: {
            attributes: {
              url: "https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
            }
          }
        },
        category: {
          data: {
            attributes: {
              name: "技術解説",
              slug: "tech-explanation"
            }
          }
        },
        author: {
          data: {
            attributes: {
              name: "鈴木",
              position: "データベースエンジニア"
            }
          }
        },
        tags: {
          data: [
            { attributes: { name: "データベース", slug: "database" } }
          ]
        }
      }
    },
    {
      id: 4,
      attributes: {
        title: "REST API設計のベストプラクティス",
        excerpt: "REST APIを設計する際に知っておくべき原則とベストプラクティスを実例付きで紹介します。",
        readTime: 13,
        views: 4500,
        publishedDate: "2024-01-12",
        isFeatured: false,
        featuredImage: {
          data: {
            attributes: {
              url: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
            }
          }
        },
        category: {
          data: {
            attributes: {
              name: "技術解説",
              slug: "tech-explanation"
            }
          }
        },
        author: {
          data: {
            attributes: {
              name: "山田",
              position: "バックエンドエンジニア"
            }
          }
        },
        tags: {
          data: [
            { attributes: { name: "Web技術", slug: "web" } }
          ]
        }
      }
    },
    {
      id: 5,
      attributes: {
        title: "セキュアなWebアプリケーション開発入門",
        excerpt: "XSS、CSRF、SQLインジェクションなど、Webアプリケーションの主要なセキュリティ脅威と対策方法を学びます。",
        readTime: 18,
        views: 6200,
        publishedDate: "2024-01-10",
        isFeatured: false,
        featuredImage: {
          data: {
            attributes: {
              url: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
            }
          }
        },
        category: {
          data: {
            attributes: {
              name: "技術解説",
              slug: "tech-explanation"
            }
          }
        },
        author: {
          data: {
            attributes: {
              name: "高橋",
              position: "セキュリティエンジニア"
            }
          }
        },
        tags: {
          data: [
            { attributes: { name: "セキュリティ", slug: "security" } }
          ]
        }
      }
    },
    {
      id: 6,
      attributes: {
        title: "AI・機械学習の基礎：初心者向けガイド",
        excerpt: "AI・機械学習の基本概念から、実際のプロジェクトへの応用方法まで、わかりやすく解説します。",
        readTime: 14,
        views: 7300,
        publishedDate: "2024-01-08",
        isFeatured: false,
        featuredImage: {
          data: {
            attributes: {
              url: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
            }
          }
        },
        category: {
          data: {
            attributes: {
              name: "技術解説",
              slug: "tech-explanation"
            }
          }
        },
        author: {
          data: {
            attributes: {
              name: "中村",
              position: "AIエンジニア"
            }
          }
        },
        tags: {
          data: [
            { attributes: { name: "AI", slug: "ai" } }
          ]
        }
      }
    }
  ] as Article[];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`;
    }
    return views.toString();
  };

  const getImageUrl = (article: Article) => {
    const imageUrl = article.attributes.featuredImage?.data?.attributes?.url;
    return imageUrl ? (imageUrl.startsWith('http') ? imageUrl : `http://localhost:1337${imageUrl}`) : 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop';
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
      {featuredArticle && (
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative">
                  <img
                    src={getImageUrl(featuredArticle)}
                    alt={featuredArticle.attributes.title}
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
                    <span>{formatDate(featuredArticle.attributes.publishedDate)}</span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {featuredArticle.attributes.readTime}分
                    </span>
                    <span className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {formatViews(featuredArticle.attributes.views)}
                    </span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                    {featuredArticle.attributes.title}
                  </h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {featuredArticle.attributes.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300">
                      ガイドを読む
                    </button>
                    {featuredArticle.attributes.author?.data && (
                      <span className="text-sm text-gray-500">
                        執筆者: {featuredArticle.attributes.author.data.attributes.position} {featuredArticle.attributes.author.data.attributes.name}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

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
            <span className="text-gray-500">{filteredArticles.length}件の記事</span>
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
            ) : filteredArticles.length > 0 ? (
              filteredArticles.map((article) => (
                <div key={article.id} className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100/50 transform hover:-translate-y-2">
                  <div className="relative overflow-hidden group">
                    <img
                      src={getImageUrl(article)}
                      alt={article.attributes.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-6 left-6">
                      <span className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-semibold rounded-full shadow-lg backdrop-blur-sm">
                        {article.attributes.category?.data?.attributes.name || '技術解説'}
                      </span>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {article.attributes.readTime}分
                      </span>
                      <span className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {formatViews(article.attributes.views)}
                      </span>
                      <span>{formatDate(article.attributes.publishedDate)}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight line-clamp-2">
                      {article.attributes.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed line-clamp-3 mb-6">
                      {article.attributes.excerpt}
                    </p>
                    {article.attributes.author?.data && (
                      <div className="text-sm text-gray-500">
                        執筆者: {article.attributes.author.data.attributes.position} {article.attributes.author.data.attributes.name}
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">現在、技術解説記事はありません。</p>
              </div>
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