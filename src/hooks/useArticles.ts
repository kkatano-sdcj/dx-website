import { useState, useEffect } from 'react';
import { articlesApi, Article } from '../services/api';

export const useArticles = (params?: {
  category?: string;
  featured?: boolean;
  trending?: boolean;
  limit?: number;
}) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        let response;

        if (params?.featured) {
          response = await articlesApi.getFeatured();
        } else if (params?.trending) {
          response = await articlesApi.getTrending();
        } else if (params?.category) {
          response = await articlesApi.getByCategory(params.category);
        } else {
          response = await articlesApi.getAll({
            populate: ['featuredImage', 'category', 'author', 'tags'],
            sort: ['publishedDate:desc'],
            pagination: params?.limit ? { page: 1, pageSize: params.limit } : undefined,
          });
        }

        setArticles(response.data || []);
      } catch (err) {
        setError('記事の取得に失敗しました');
        console.error('Error fetching articles:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [params?.category, params?.featured, params?.trending, params?.limit]);

  return { articles, loading, error };
};

export const useArticle = (slug: string) => {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const response = await articlesApi.getBySlug(slug);
        setArticle(response);
      } catch (err) {
        setError('記事の取得に失敗しました');
        console.error('Error fetching article:', err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  return { article, loading, error };
};