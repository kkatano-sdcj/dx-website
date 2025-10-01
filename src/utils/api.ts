import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { env, getApiUrl } from '../config/environment';

// APIクライアントの作成
const createApiClient = () => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // APIトークンがある場合は認証ヘッダーを追加
  if (env.STRAPI_API_TOKEN) {
    headers['Authorization'] = `Bearer ${env.STRAPI_API_TOKEN}`;
  }

  return axios.create({
    baseURL: getApiUrl(),
    headers,
    timeout: 30000, // 30秒のタイムアウト
  });
};

// APIクライアントインスタンス
export const apiClient = createApiClient();

// リクエストインターセプター
apiClient.interceptors.request.use(
  (config) => {
    // リクエストログ（開発環境のみ）
    if (!env.IS_PRODUCTION) {
      console.log('API Request:', {
        method: config.method,
        url: config.url,
        params: config.params,
      });
    }
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// レスポンスインターセプター
apiClient.interceptors.response.use(
  (response) => {
    // レスポンスログ（開発環境のみ）
    if (!env.IS_PRODUCTION) {
      console.log('API Response:', {
        status: response.status,
        url: response.config.url,
        data: response.data,
      });
    }
    return response;
  },
  (error) => {
    // エラーハンドリング
    if (error.response) {
      // サーバーからのエラーレスポンス
      console.error('API Error Response:', {
        status: error.response.status,
        data: error.response.data,
        url: error.config?.url,
      });

      // エラーメッセージの抽出
      const message = error.response.data?.error?.message ||
                     error.response.data?.message ||
                     `API Error: ${error.response.status}`;

      // 認証エラーの場合の処理
      if (error.response.status === 401) {
        console.error('Authentication failed. Please check your API token.');
      }

      // カスタムエラーオブジェクトを作成
      const customError = new Error(message);
      (customError as any).status = error.response.status;
      (customError as any).data = error.response.data;

      return Promise.reject(customError);
    } else if (error.request) {
      // リクエストは送信されたがレスポンスがない
      console.error('No response from server:', error.request);
      return Promise.reject(new Error('No response from server. Please check your connection.'));
    } else {
      // リクエスト設定時のエラー
      console.error('Request setup error:', error.message);
      return Promise.reject(error);
    }
  }
);

// 汎用的なAPI関数
export const api = {
  // GET リクエスト
  get: async <T = any>(
    endpoint: string,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response = await apiClient.get<T>(endpoint, config);
    return response.data;
  },

  // POST リクエスト
  post: async <T = any>(
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response = await apiClient.post<T>(endpoint, data, config);
    return response.data;
  },

  // PUT リクエスト
  put: async <T = any>(
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response = await apiClient.put<T>(endpoint, data, config);
    return response.data;
  },

  // DELETE リクエスト
  delete: async <T = any>(
    endpoint: string,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response = await apiClient.delete<T>(endpoint, config);
    return response.data;
  },

  // ファイルアップロード
  upload: async (
    endpoint: string,
    formData: FormData,
    onProgress?: (progress: number) => void
  ): Promise<any> => {
    const response = await apiClient.post(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(progress);
        }
      },
    });
    return response.data;
  },
};

// Strapiのクエリビルダー
export const strapiQuery = {
  // フィルター構築
  filters: (filters: Record<string, any>) => {
    return { filters };
  },

  // ソート構築
  sort: (fields: string | string[]) => {
    return { sort: Array.isArray(fields) ? fields : [fields] };
  },

  // ページネーション構築
  pagination: (page: number = 1, pageSize: number = 25) => {
    return {
      pagination: {
        page,
        pageSize
      }
    };
  },

  // Populate構築
  populate: (fields: string | string[] | '*') => {
    return {
      populate: fields === '*' ? '*' : Array.isArray(fields) ? fields.join(',') : fields
    };
  },

  // クエリパラメータの結合
  build: (...params: Record<string, any>[]): AxiosRequestConfig => {
    return {
      params: Object.assign({}, ...params)
    };
  },
};

// エラーハンドリングユーティリティ
export const handleApiError = (error: any): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'An unexpected error occurred';
};

// キャッシュ付きAPI呼び出し
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5分

export const cachedApi = {
  get: async <T = any>(
    endpoint: string,
    config?: AxiosRequestConfig,
    cacheDuration: number = CACHE_DURATION
  ): Promise<T> => {
    const cacheKey = `${endpoint}${JSON.stringify(config?.params || {})}`;
    const cached = cache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < cacheDuration) {
      if (!env.IS_PRODUCTION) {
        console.log('Returning cached data for:', endpoint);
      }
      return cached.data;
    }

    const data = await api.get<T>(endpoint, config);
    cache.set(cacheKey, { data, timestamp: Date.now() });

    // キャッシュサイズ制限（100エントリまで）
    if (cache.size > 100) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }

    return data;
  },

  clear: () => {
    cache.clear();
  },
};