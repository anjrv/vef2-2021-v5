import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const apiUrl = process.env.REACT_APP_API_URL;

News.propTypes = {
  category: PropTypes.string.isRequired,
};

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
        const result = await fetch(`${apiUrl}${category}`);

        if (!result.ok) {
          throw new Error("Result ekki í lagi");
        }

        json = await result.json();
      } catch (e) {
        setError("Gat ekki sótt gögn.");
        return;
      } finally {
        setLoading(false);
      }

      setData(json);
    }
    fetchData();
  }, [category]);

  if (error) {
    return <p>Villa kom upp: {error}</p>;
  }

  if (loading) {
    return <p>Sæki gögn...</p>;
  }

  const news = Array.from(data);

  return (
    <div>
      <h2>{news.title}</h2>
      <ul>
        { // news.items.map((item) => {
          //   return <li></li>;
          // })
        }
      </ul>
      <p><NavLink to='/'>Allar fréttir</NavLink></p>
    </div>
  );
}
