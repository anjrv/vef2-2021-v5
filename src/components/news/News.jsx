import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const apiUrl = process.env.REACT_APP_API_URL;

News.propTypes = {
  category: PropTypes.string.isRequired,
  quantity: PropTypes.number,
  expandable: PropTypes.bool,
};

export function News({ category, quantity, expandable }) {
  const routes = {
    "Allar fréttir": "allar",
    Innlent: "innlent",
    "Erlendar fréttir": "erlent",
    Íþróttir: "ithrottir",
    Menning: "menning",
  };

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
    return (
      <div>
        <h2>Villa kom upp!</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (loading) {
    return <p>Sæki gögn...</p>;
  }

  if (data) {
    const nextPath = expandable ? `/${routes[data.title]}` : "/";
    let articles = data.items;
    if (quantity) {
      articles = articles.slice(0, quantity);
    }

    return (
      <div>
        <h2>{data.title}</h2>
        <ul>
          {articles.map((item) => {
            return (
              <li>
                <a href={item.link}>{item.title}</a>
              </li>
            );
          })}
        </ul>
        <p>
          <Link
            to={{
              pathname: nextPath,
            }}
          >
            {expandable ? "Allar fréttir" : "Til baka"}
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2>Villa kom upp!</h2>
      <p>Gat ekki sótt gögn.</p>
    </div>
  );
}
