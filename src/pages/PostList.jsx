import React from "react";
import { usePosts } from "../context/PostsContext";
import PostCard from "../components/PostCard";

export default function PostList() {
  const { posts } = usePosts();

  if (!posts || posts.length === 0) {
    return (
      <div className="card">
        <p>No posts yet. 🚀</p>
      </div>
    );
  }

  return (
    <div>
      <h2>📑 All Posts</h2>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
