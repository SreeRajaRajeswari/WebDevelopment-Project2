import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <h1>📘 Post Manager</h1>
      <nav>
        <Link to="/" className="button">Home</Link>
        <Link to="/new" className="button">➕ New Post</Link>
      </nav>
      <hr />
    </header>
  );
}
