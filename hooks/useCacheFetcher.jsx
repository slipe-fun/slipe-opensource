import { useEffect, useState } from 'react';

export function useCacheFetcher(url, fetcher) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!url || typeof fetcher !== 'function') {
      console.error('Invalid arguments passed to useCustomHook');
      return;
    }

    const fetchData = async () => {
      try {
        const cachedData = localStorage.getItem(url);

        if (cachedData) {
          setData(JSON.parse(cachedData));
        }

        const fetchedData = await fetcher(url);
        

        if (JSON.stringify(fetchedData) !== cachedData) {
          console.log(fetchedData, fetcher, data)
          localStorage.setItem(url, JSON.stringify(fetchedData || {}));
          setData(fetchedData);
        }
      } catch (err) {
        setError(err.message || 'An error occurred');
      }
      setLoading(true)
    };

    fetchData();
  }, [url]);

  return { data, error };
}