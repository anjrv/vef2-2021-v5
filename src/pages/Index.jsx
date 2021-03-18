import React from "react";
import Helmet from "react-helmet";

import { NewsList } from '../components/news-list/NewsList'

export function Index() {
  return (
    <div>
      <Helmet title="Fréttir" />
      <NewsList />
    </div>
  );
}
