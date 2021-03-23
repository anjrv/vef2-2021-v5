import React, { useEffect, useState } from "react";

import { News } from "../news/News";
import s from "./NewsList.module.scss";

const apiUrl = process.env.REACT_APP_API_URL;

export function NewsList() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);

      let json;

      try {
        const result = await fetch(apiUrl);

        if (!result.ok) {
          if (result.status === 404) {
            setError("404: Fannst ekki");
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
  }, []);

  if (error) {
    return <p>Villa kom upp: {error}</p>;
  }

  if (loading) {
    return <p>Sæki gögn...</p>;
  }

  const newslist = Array.from(data);
  console.log(newslist);

  return (
    <div className={s.newslist__row}>
      {newslist.map((item) => {
        return (
          <div className={s.newslist__col}>
            <News category={item.id} quantity={5} expandable={true} />
          </div>
        );
      })}
    </div>
  );
}
