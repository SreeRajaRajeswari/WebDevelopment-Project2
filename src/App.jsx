import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { PostsProvider } from "./context/PostsContext";
import PostList from "./pages/PostList";
import PostView from "./pages/PostView";
import PostCreate from "./pages/PostCreate";
import PostEdit from "./pages/PostEdit";

export default function App() {
  return (
    <PostsProvider>
      <div className="container">
        <header>
          <h1>📘 Post Manager</h1>
          <nav>
            <Link to="/" className="button">🏠 Home</Link>
            <Link to="/new" className="button">➕ New Post</Link>
          </nav>
          <hr />
        </header>

        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/post/:id" element={<PostView />} />
          <Route path="/new" element={<PostCreate />} />
          <Route path="/edit/:id" element={<PostEdit />} />
        </Routes>
      </div>
    </PostsProvider>
  );
}
