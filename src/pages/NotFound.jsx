import React from "react";
import Helmet from "react-helmet";

export function NotFound() {
  return (
    <div>
      <Helmet title="Síða fannst ekki" />
      <h1>404 fannst ekki</h1>
    </div>
  );
}
