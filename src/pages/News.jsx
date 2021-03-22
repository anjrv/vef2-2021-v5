import React from "react";
import Helmet from "react-helmet";
import { useParams } from "react-router-dom";

import { News } from '../components/news/News'

export function NewsPage() {
  const id = useParams().id;

  return (
    <div>
      <Helmet title="Fréttir" />
      <News category={id} />
    </div>
  );
}