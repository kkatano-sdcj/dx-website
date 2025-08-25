import { useState, useEffect } from 'react';
import { eventsApi, Event } from '../services/api';

export const useEvents = (type?: 'upcoming' | 'past' | 'all') => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        let response;

        switch (type) {
          case 'upcoming':
            response = await eventsApi.getUpcoming();
            break;
          case 'past':
            response = await eventsApi.getPast();
            break;
          default:
            response = await eventsApi.getAll();
        }

        setEvents(response.data || []);
      } catch (err) {
        setError('イベントの取得に失敗しました');
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [type]);

  return { events, loading, error };
};