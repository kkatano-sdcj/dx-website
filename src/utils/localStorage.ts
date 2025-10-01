// ローカルストレージを使用したデータ管理ユーティリティ

export interface StorageArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  category: string;
  author: string;
  tags: string[];
  featuredImage?: string;
  status: 'draft' | 'published';
  publishedDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface StorageCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color: string;
  icon?: string;
}

export interface StorageEvent {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: string;
  eventType: string;
  status: string;
  organizer: string;
  maxParticipants?: number;
  currentParticipants: number;
  tags?: string[];
  featuredImage?: string;
}

export interface StoragePodcast {
  id: string;
  title: string;
  description: string;
  episodeNumber: number;
  duration: string;
  audioUrl?: string;
  coverImage?: string;
  guests?: string[];
  category: string;
  publishedDate: string;
}

const STORAGE_KEYS = {
  ARTICLES: 'cms_articles',
  CATEGORIES: 'cms_categories',
  EVENTS: 'cms_events',
  PODCASTS: 'cms_podcasts',
} as const;

// 汎用的なCRUD操作
class LocalStorageManager<T extends { id: string }> {
  constructor(private storageKey: string) {}

  getAll(): T[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  getById(id: string): T | undefined {
    const items = this.getAll();
    return items.find(item => item.id === id);
  }

  create(item: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): T {
    const items = this.getAll();
    const newItem = {
      ...item,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as T;
    items.push(newItem);
    localStorage.setItem(this.storageKey, JSON.stringify(items));
    return newItem;
  }

  update(id: string, updates: Partial<T>): T | undefined {
    const items = this.getAll();
    const index = items.findIndex(item => item.id === id);
    if (index === -1) return undefined;
    
    items[index] = {
      ...items[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    } as T;
    localStorage.setItem(this.storageKey, JSON.stringify(items));
    return items[index];
  }

  delete(id: string): boolean {
    const items = this.getAll();
    const filteredItems = items.filter(item => item.id !== id);
    if (items.length === filteredItems.length) return false;
    
    localStorage.setItem(this.storageKey, JSON.stringify(filteredItems));
    return true;
  }
}

// 各エンティティ用のマネージャーをエクスポート
export const articlesManager = new LocalStorageManager<StorageArticle>(STORAGE_KEYS.ARTICLES);
export const categoriesManager = new LocalStorageManager<StorageCategory>(STORAGE_KEYS.CATEGORIES);
export const eventsManager = new LocalStorageManager<StorageEvent>(STORAGE_KEYS.EVENTS);
export const podcastsManager = new LocalStorageManager<StoragePodcast>(STORAGE_KEYS.PODCASTS);

// 初期データの設定
export const initializeDefaultData = () => {
  // カテゴリーの初期データ
  if (categoriesManager.getAll().length === 0) {
    const defaultCategories: Omit<StorageCategory, 'id' | 'createdAt' | 'updatedAt'>[] = [
      { name: 'AI系ニュース', slug: 'ai-news', color: '#3B82F6', description: 'AI・機械学習の最新ニュース' },
      { name: 'AI活用情報', slug: 'ai-insights', color: '#10B981', description: 'AI活用のベストプラクティス' },
      { name: 'テクニカルターム解説', slug: 'tech-terms', color: '#8B5CF6', description: '技術用語の解説' },
      { name: '学習コンテンツ', slug: 'learning', color: '#F59E0B', description: '学習用教材' },
      { name: 'Podcast', slug: 'podcast', color: '#EF4444', description: 'ポッドキャスト' },
      { name: '社内ニュース', slug: 'company-news', color: '#6366F1', description: '社内のニュース' },
      { name: 'イベント告知', slug: 'events', color: '#EC4899', description: 'イベント情報' },
    ];
    defaultCategories.forEach(cat => categoriesManager.create(cat));
  }
};

// APIレスポンス形式に変換
export const formatAsApiResponse = <T>(items: T[]) => {
  return {
    data: items.map(item => ({
      id: (item as any).id,
      attributes: item,
    })),
    meta: {
      pagination: {
        page: 1,
        pageSize: 25,
        pageCount: 1,
        total: items.length,
      },
    },
  };
};