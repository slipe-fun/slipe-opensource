import { useEffect, useState } from 'react';

export function useCacheFetcher(url, fetcher) {
  const [data, setData] = useState(() => {
    // Инициализируем состояние значением из кеша, если оно есть
    const cachedData = localStorage.getItem(url);
    return cachedData ? JSON.parse(cachedData) : null;
  });

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!url || typeof fetcher !== 'function') {
      console.error('Invalid arguments passed to useCustomHook');
      return;
    }

    const fetchData = async () => {
      try {
        const fetchedData = await fetcher(url);

        if (JSON.stringify(fetchedData) !== JSON.stringify(data)) {
          setData(fetchedData);
          localStorage.setItem(url, JSON.stringify(fetchedData));
        }
      } catch (err) {
        setError(err.message || 'An error occurred');
      }
      setIsLoading(false);
    };

    fetchData();
  }, [url, fetcher]);

  return {data, error, isLoading}
}
