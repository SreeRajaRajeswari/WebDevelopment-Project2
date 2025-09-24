import React, { createContext, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useLocalStorage } from "../hooks/useLocalStorage";
import seedPosts from "../utils/seedPosts";

const PostsContext = createContext();

export function PostsProvider({ children }) {
  const [posts, setPosts] = useLocalStorage("posts", []);

  // ✅ Ensure at least 10 demo posts exist
  useEffect(() => {
    if (!posts || posts.length < 10) {
      setPosts(seedPosts);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createPost = (data) => {
    const now = new Date().toISOString();
    const newPost = {
      id: uuidv4(),
      title: data.title,
      author: data.author || "Anonymous",
      content: data.content,
      tags: data.tags
        ? data.tags.split(",").map((t) => t.trim())
        : [],
      createdAt: now,
      updatedAt: now,
    };
    setPosts((prev) => [newPost, ...prev]);
    return newPost;
  };

  const updatePost = (id, updatedData) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, ...updatedData, updatedAt: new Date().toISOString() }
          : p
      )
    );
  };

  const deletePost = (id) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  const getPostById = (id) => posts.find((p) => p.id === id);

  return (
    <PostsContext.Provider
      value={{ posts, createPost, updatePost, deletePost, getPostById }}
    >
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  return useContext(PostsContext);
}
