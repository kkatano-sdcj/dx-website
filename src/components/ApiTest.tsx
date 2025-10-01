import { useEffect, useState } from 'react';
import { articlesApi, categoriesApi, podcastsApi, eventsApi } from '../services/api';

const ApiTest = () => {
  const [connectionStatus, setConnectionStatus] = useState<{
    articles: 'testing' | 'success' | 'error';
    categories: 'testing' | 'success' | 'error';
    podcasts: 'testing' | 'success' | 'error';
    events: 'testing' | 'success' | 'error';
  }>({
    articles: 'testing',
    categories: 'testing',
    podcasts: 'testing',
    events: 'testing'
  });

  const [data, setData] = useState<any>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testConnections = async () => {
      // Test Articles API
      try {
        const articlesResponse = await articlesApi.getAll({
          populate: 'featuredImage,category,author,tags',
          pagination: { page: 1, pageSize: 3 }
        });
        setConnectionStatus(prev => ({ ...prev, articles: 'success' }));
        setData(prev => ({ ...prev, articles: articlesResponse }));
      } catch (err) {
        setConnectionStatus(prev => ({ ...prev, articles: 'error' }));
        setError(`Articles API Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }

      // Test Categories API
      try {
        const categoriesResponse = await categoriesApi.getAll();
        setConnectionStatus(prev => ({ ...prev, categories: 'success' }));
        setData(prev => ({ ...prev, categories: categoriesResponse }));
      } catch (err) {
        setConnectionStatus(prev => ({ ...prev, categories: 'error' }));
        setError(prev => `${prev}\nCategories API Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }

      // Test Podcasts API
      try {
        const podcastsResponse = await podcastsApi.getAll();
        setConnectionStatus(prev => ({ ...prev, podcasts: 'success' }));
        setData(prev => ({ ...prev, podcasts: podcastsResponse }));
      } catch (err) {
        setConnectionStatus(prev => ({ ...prev, podcasts: 'error' }));
        setError(prev => `${prev}\nPodcasts API Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }

      // Test Events API
      try {
        const eventsResponse = await eventsApi.getAll();
        setConnectionStatus(prev => ({ ...prev, events: 'success' }));
        setData(prev => ({ ...prev, events: eventsResponse }));
      } catch (err) {
        setConnectionStatus(prev => ({ ...prev, events: 'error' }));
        setError(prev => `${prev}\nEvents API Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }
    };

    testConnections();
  }, []);

  const getStatusColor = (status: 'testing' | 'success' | 'error') => {
    switch(status) {
      case 'testing': return 'text-yellow-600';
      case 'success': return 'text-green-600';
      case 'error': return 'text-red-600';
    }
  };

  const getStatusIcon = (status: 'testing' | 'success' | 'error') => {
    switch(status) {
      case 'testing': return '⏳';
      case 'success': return '✅';
      case 'error': return '❌';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Strapi API Connection Test</h2>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Connection Status:</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span>{getStatusIcon(connectionStatus.articles)}</span>
            <span className={getStatusColor(connectionStatus.articles)}>
              Articles API: {connectionStatus.articles}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span>{getStatusIcon(connectionStatus.categories)}</span>
            <span className={getStatusColor(connectionStatus.categories)}>
              Categories API: {connectionStatus.categories}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span>{getStatusIcon(connectionStatus.podcasts)}</span>
            <span className={getStatusColor(connectionStatus.podcasts)}>
              Podcasts API: {connectionStatus.podcasts}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span>{getStatusIcon(connectionStatus.events)}</span>
            <span className={getStatusColor(connectionStatus.events)}>
              Events API: {connectionStatus.events}
            </span>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded">
          <h3 className="text-red-800 font-semibold mb-2">Errors:</h3>
          <pre className="text-red-600 text-sm whitespace-pre-wrap">{error}</pre>
        </div>
      )}

      {Object.keys(data).length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Data Retrieved:</h3>
          <div className="space-y-4">
            {data.articles?.data && (
              <div>
                <h4 className="font-medium text-gray-700">Articles ({data.articles.data.length} items)</h4>
                <ul className="ml-4 mt-2 space-y-1">
                  {data.articles.data.map((article: any) => (
                    <li key={article.id} className="text-sm text-gray-600">
                      • {article.attributes?.title || 'No title'}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {data.categories?.data && (
              <div>
                <h4 className="font-medium text-gray-700">Categories ({data.categories.data.length} items)</h4>
                <ul className="ml-4 mt-2 space-y-1">
                  {data.categories.data.map((category: any) => (
                    <li key={category.id} className="text-sm text-gray-600">
                      • {category.attributes?.name || 'No name'}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {data.podcasts?.data && (
              <div>
                <h4 className="font-medium text-gray-700">Podcasts ({data.podcasts.data.length} items)</h4>
                <ul className="ml-4 mt-2 space-y-1">
                  {data.podcasts.data.map((podcast: any) => (
                    <li key={podcast.id} className="text-sm text-gray-600">
                      • {podcast.attributes?.title || 'No title'}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {data.events?.data && (
              <div>
                <h4 className="font-medium text-gray-700">Events ({data.events.data.length} items)</h4>
                <ul className="ml-4 mt-2 space-y-1">
                  {data.events.data.map((event: any) => (
                    <li key={event.id} className="text-sm text-gray-600">
                      • {event.attributes?.title || 'No title'}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="p-4 bg-blue-50 border border-blue-200 rounded">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> This component tests the connection between the React frontend and Strapi backend.
          Make sure Strapi is running on http://localhost:1337
        </p>
      </div>
    </div>
  );
};

export default ApiTest;