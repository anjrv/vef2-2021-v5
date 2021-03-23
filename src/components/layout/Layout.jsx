import React from "react";

import s from "./Layout.module.scss";

export function Layout({ children }) {
  return (
    <div className={s.layout}>
      <header className={s.layout__header}>
        <h1>RÚV fréttir</h1>
      </header>
      <main className={s.layout__main}>{children}</main>
      <footer className={s.layout__footer}>
        <span>
          Fréttir frá <a href="https://www.ruv.is/">RÚV</a>
        </span>
      </footer>
    </div>
  );
}
