import React from "react";
import Helmet from "react-helmet";

export function NotFound() {
  return (
    <div>
      <Helmet title="Fannst ekki" />
      <h2>Villa kom upp!</h2>
      <p>404: Fannst ekki</p>
    </div>
  );
}
