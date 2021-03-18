import React from "react";
// Sass

export function Layout({ children }) {
  return (
    <div>
      <header>
        <h1>RÚV fréttir</h1>
      </header>
      <main>{children}</main>
      <footer>
        <p>
          Fréttir frá <a href="https://www.ruv.is/">RÚV</a>
        </p>
      </footer>
    </div>
  );
}
