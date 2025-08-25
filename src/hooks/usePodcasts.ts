import { useState, useEffect } from 'react';
import { podcastsApi, Podcast } from '../services/api';

export const usePodcasts = () => {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        setLoading(true);
        const response = await podcastsApi.getAll();
        setPodcasts(response.data || []);
      } catch (err) {
        setError('ポッドキャストの取得に失敗しました');
        console.error('Error fetching podcasts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, []);

  return { podcasts, loading, error };
};