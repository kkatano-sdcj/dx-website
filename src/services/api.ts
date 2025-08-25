import axios from 'axios';

const API_BASE_URL = 'http://localhost:1337/api';

// Axios インスタンスの作成
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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
export const articlesApi = {
  // 全記事取得
  getAll: async (params?: {
    populate?: string;
    filters?: any;
    sort?: string;
    pagination?: { page: number; pageSize: number };
  }) => {
    const response = await api.get('/articles', { params });
    return response.data;
  },

  // 記事詳細取得
  getBySlug: async (slug: string) => {
    const response = await api.get(`/articles`, {
      params: {
        filters: { slug: { $eq: slug } },
        populate: ['featuredImage', 'category', 'author', 'tags'],
      },
    });
    return response.data.data[0];
  },

  // カテゴリー別記事取得
  getByCategory: async (categorySlug: string) => {
    const response = await api.get('/articles', {
      params: {
        filters: { category: { slug: { $eq: categorySlug } } },
        populate: ['featuredImage', 'category', 'author', 'tags'],
        sort: ['publishedDate:desc'],
      },
    });
    return response.data;
  },

  // フィーチャード記事取得
  getFeatured: async () => {
    const response = await api.get('/articles', {
      params: {
        filters: { isFeatured: { $eq: true } },
        populate: ['featuredImage', 'category', 'author', 'tags'],
        sort: ['publishedDate:desc'],
        pagination: { page: 1, pageSize: 3 },
      },
    });
    return response.data;
  },

  // トレンド記事取得
  getTrending: async () => {
    const response = await api.get('/articles', {
      params: {
        filters: { isTrending: { $eq: true } },
        populate: ['featuredImage', 'category', 'author', 'tags'],
        sort: ['views:desc'],
        pagination: { page: 1, pageSize: 5 },
      },
    });
    return response.data;
  },
};

export const categoriesApi = {
  getAll: async () => {
    const response = await api.get('/categories');
    return response.data;
  },

  getBySlug: async (slug: string) => {
    const response = await api.get('/categories', {
      params: {
        filters: { slug: { $eq: slug } },
      },
    });
    return response.data.data[0];
  },
};

export const authorsApi = {
  getAll: async () => {
    const response = await api.get('/authors', {
      params: {
        populate: ['avatar'],
      },
    });
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get(`/authors/${id}`, {
      params: {
        populate: ['avatar', 'articles'],
      },
    });
    return response.data;
  },
};

export const podcastsApi = {
  getAll: async () => {
    const response = await api.get('/podcasts', {
      params: {
        populate: ['coverImage', 'audioFile'],
        sort: ['episodeNumber:desc'],
      },
    });
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get(`/podcasts/${id}`, {
      params: {
        populate: ['coverImage', 'audioFile'],
      },
    });
    return response.data;
  },
};

export const eventsApi = {
  getAll: async () => {
    const response = await api.get('/events', {
      params: {
        populate: ['featuredImage'],
        sort: ['startDate:desc'],
      },
    });
    return response.data;
  },

  getUpcoming: async () => {
    const response = await api.get('/events', {
      params: {
        filters: {
          startDate: { $gte: new Date().toISOString() },
          status: { $eq: '募集中' },
        },
        populate: ['featuredImage'],
        sort: ['startDate:asc'],
      },
    });
    return response.data;
  },

  getPast: async () => {
    const response = await api.get('/events', {
      params: {
        filters: {
          $or: [
            { endDate: { $lt: new Date().toISOString() } },
            { status: { $eq: '終了' } },
          ],
        },
        populate: ['featuredImage'],
        sort: ['startDate:desc'],
      },
    });
    return response.data;
  },
};

export default api;