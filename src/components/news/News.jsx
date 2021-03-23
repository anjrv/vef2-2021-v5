import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import s from "./News.module.scss";

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
          if(result.status === 404) {
            setError("404: Fannst ekki.");
            return;
          }
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
      <div className={s.news}>
        <h2>{data.title}</h2>
        <ul className={s.news__list}>
          {articles.map((item) => {
            return (
              <li className={s.news__listitem}>
                <a className={s.news__ref} href={item.link}>{item.title}</a>
              </li>
            );
          })}
        </ul>
        <b>
          <Link
            className={s.news__routeref} to={{
              pathname: nextPath,
            }}
          >
            {expandable ? "Allar fréttir" : "Til baka"}
          </Link>
        </b>
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
