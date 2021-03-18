import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const apiUrl = process.env.REACT_APP_API_URL;

News.propTypes = {
  category: PropTypes.string.isRequired,
}

export function News({ category }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);

      let json;

      try {
        const result = await fetch(`${apiUrl}/category`);

        if (!result.ok) {
          throw new Error('Result ekki í lagi');
        }

        json = await result.json();
      } catch (e) {
        setError('Gat ekki sótt gögn.');
        return;
      } finally {
        setLoading(false);
      }

      setData(json);
    }
    fetchData();
  }, []);

  if (error) {
    return (
      <p>Villa kom upp: {error}</p>
    );
  }

  if (loading) {
    return (
      <p>Sæki gögn...</p>
    );
  }

  console.log(data);

  return (
    <p>Bla</p>
  ); 
}