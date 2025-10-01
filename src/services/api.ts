import { api, strapiQuery, cachedApi } from '../utils/api';
import { getImageUrl } from '../config/environment';

// 型定義
export interface Article {
  id: number;
  attributes: {
    title: string;
    excerpt: string;
    content: string;
    slug: string;
    readTime: number;
    views: number;
    isFeatured: boolean;
    isTrending: boolean;
    publishedDate: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    featuredImage?: {
      data?: {
        attributes: {
          url: string;
          alternativeText?: string;
        };
      };
    };
    category?: {
      data?: {
        attributes: {
          name: string;
          slug: string;
          color: string;
        };
      };
    };
    author?: {
      data?: {
        attributes: {
          name: string;
          position?: string;
          department?: string;
        };
      };
    };
    tags?: {
      data: Array<{
        attributes: {
          name: string;
          slug: string;
        };
      }>;
    };
  };
}

export interface Category {
  id: number;
  attributes: {
    name: string;
    slug: string;
    description?: string;
    color: string;
    icon?: string;
  };
}

export interface Author {
  id: number;
  attributes: {
    name: string;
    email: string;
    bio?: string;
    position?: string;
    department?: string;
    avatar?: {
      data?: {
        attributes: {
          url: string;
          alternativeText?: string;
        };
      };
    };
  };
}

export interface Podcast {
  id: number;
  attributes: {
    title: string;
    description: string;
    duration: string;
    episodeNumber: number;
    guests?: string[];
    category: string;
    plays: number;
    publishedDate: string;
    coverImage?: {
      data?: {
        attributes: {
          url: string;
          alternativeText?: string;
        };
      };
    };
    audioFile?: {
      data?: {
        attributes: {
          url: string;
        };
      };
    };
  };
}

export interface Event {
  id: number;
  attributes: {
    title: string;
    description: string;
    startDate: string;
    endDate?: string;
    location: string;
    eventType: string;
    maxParticipants?: number;
    currentParticipants: number;
    status: string;
    tags?: string[];
    organizer: string;
    featuredImage?: {
      data?: {
        attributes: {
          url: string;
          alternativeText?: string;
        };
      };
    };
  };
}

// API関数
export const aiTechApi = {
  // 全記事取得（キャッシュ付き）
  getAll: async (params?: {
    populate?: string;
    filters?: any;
    sort?: string;
    pagination?: { page: number; pageSize: number };
  }) => {
    return await cachedApi.get('/ai-techs', { params });
  },

  // 記事詳細取得
  getBySlug: async (slug: string) => {
    const response = await api.get(`/ai-techs`,
      strapiQuery.build(
        strapiQuery.filters({ slug: { $eq: slug } }),
        strapiQuery.populate(['featuredImage', 'category', 'author', 'tags'])
      )
    );
    return response.data[0];
  },

  // カテゴリー別記事取得（キャッシュ付き）
  getByCategory: async (categorySlug: string) => {
    return await cachedApi.get('/ai-techs',
      strapiQuery.build(
        strapiQuery.filters({ category: { slug: { $eq: categorySlug } } }),
        strapiQuery.populate(['featuredImage', 'category', 'author', 'tags']),
        strapiQuery.sort('publishedDate:desc')
      )
    );
  },

  // フィーチャード記事取得（キャッシュ付き）
  getFeatured: async () => {
    return await cachedApi.get('/ai-techs',
      strapiQuery.build(
        strapiQuery.filters({ isFeatured: { $eq: true } }),
        strapiQuery.populate(['featuredImage', 'category', 'author', 'tags']),
        strapiQuery.sort('publishedDate:desc'),
        strapiQuery.pagination(1, 3)
      )
    );
  },

  // トレンド記事取得（キャッシュ付き）
  getTrending: async () => {
    return await cachedApi.get('/ai-techs',
      strapiQuery.build(
        strapiQuery.filters({ isTrending: { $eq: true } }),
        strapiQuery.populate(['featuredImage', 'category', 'author', 'tags']),
        strapiQuery.sort('views:desc'),
        strapiQuery.pagination(1, 5)
      )
    );
  },
};

export const articlesApi = {
  // 全記事取得（キャッシュ付き）
  getAll: async (params?: {
    populate?: string;
    filters?: any;
    sort?: string;
    pagination?: { page: number; pageSize: number };
  }) => {
    return await cachedApi.get('/articles', { params });
  },

  // 記事詳細取得
  getBySlug: async (slug: string) => {
    const response = await api.get(`/articles`,
      strapiQuery.build(
        strapiQuery.filters({ slug: { $eq: slug } }),
        strapiQuery.populate(['featuredImage', 'category', 'author', 'tags'])
      )
    );
    return response.data[0];
  },

  // カテゴリー別記事取得（キャッシュ付き）
  getByCategory: async (categorySlug: string) => {
    return await cachedApi.get('/articles',
      strapiQuery.build(
        strapiQuery.filters({ category: { slug: { $eq: categorySlug } } }),
        strapiQuery.populate(['featuredImage', 'category', 'author', 'tags']),
        strapiQuery.sort('publishedDate:desc')
      )
    );
  },

  // フィーチャード記事取得（キャッシュ付き）
  getFeatured: async () => {
    return await cachedApi.get('/articles',
      strapiQuery.build(
        strapiQuery.filters({ isFeatured: { $eq: true } }),
        strapiQuery.populate(['featuredImage', 'category', 'author', 'tags']),
        strapiQuery.sort('publishedDate:desc'),
        strapiQuery.pagination(1, 3)
      )
    );
  },

  // トレンド記事取得（キャッシュ付き）
  getTrending: async () => {
    return await cachedApi.get('/articles',
      strapiQuery.build(
        strapiQuery.filters({ isTrending: { $eq: true } }),
        strapiQuery.populate(['featuredImage', 'category', 'author', 'tags']),
        strapiQuery.sort('views:desc'),
        strapiQuery.pagination(1, 5)
      )
    );
  },
};

export const categoriesApi = {
  getAll: async () => {
    return await cachedApi.get('/categories', {}, 10 * 60 * 1000); // 10分キャッシュ
  },

  getBySlug: async (slug: string) => {
    const response = await cachedApi.get('/categories',
      strapiQuery.build(
        strapiQuery.filters({ slug: { $eq: slug } })
      ),
      10 * 60 * 1000
    );
    return response.data[0];
  },
};

export const authorsApi = {
  getAll: async () => {
    return await cachedApi.get('/authors',
      strapiQuery.build(
        strapiQuery.populate(['avatar'])
      ),
      10 * 60 * 1000
    );
  },

  getById: async (id: number) => {
    return await api.get(`/authors/${id}`,
      strapiQuery.build(
        strapiQuery.populate(['avatar', 'articles'])
      )
    );
  },
};

export const podcastsApi = {
  getAll: async () => {
    return await cachedApi.get('/podcasts',
      strapiQuery.build(
        strapiQuery.populate(['coverImage', 'audioFile']),
        strapiQuery.sort('episodeNumber:desc')
      )
    );
  },

  getById: async (id: number) => {
    return await api.get(`/podcasts/${id}`,
      strapiQuery.build(
        strapiQuery.populate(['coverImage', 'audioFile'])
      )
    );
  },
};

export const eventsApi = {
  getAll: async () => {
    return await cachedApi.get('/events',
      strapiQuery.build(
        strapiQuery.populate(['featuredImage']),
        strapiQuery.sort('startDate:desc')
      )
    );
  },

  getUpcoming: async () => {
    return await api.get('/events',
      strapiQuery.build(
        strapiQuery.filters({
          startDate: { $gte: new Date().toISOString() },
          status: { $eq: '募集中' },
        }),
        strapiQuery.populate(['featuredImage']),
        strapiQuery.sort('startDate:asc')
      )
    );
  },

  getPast: async () => {
    return await api.get('/events',
      strapiQuery.build(
        strapiQuery.filters({
          $or: [
            { endDate: { $lt: new Date().toISOString() } },
            { status: { $eq: '終了' } },
          ],
        }),
        strapiQuery.populate(['featuredImage']),
        strapiQuery.sort('startDate:desc')
      )
    );
  },
};

// 画像URL取得ユーティリティをエクスポート
export { getImageUrl } from '../config/environment';

// APIユーティリティをエクスポート
export { api, strapiQuery, handleApiError } from '../utils/api';