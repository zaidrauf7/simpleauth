"use client";

import React, { useState } from "react";

export interface User {
  _id: string;
  name?: string;
  email: string;
}

export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  user?: User;
  createdAt: string;
}

export interface Comment {
  _id: string;
  text: string;
  user: User;
  createdAt: string;
}

export default function ProductItem({ product }: { product: Product }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");
  const [showComments, setShowComments] = useState(false);

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/comments?productId=${product._id}`);
      if (res.ok) {
        const data = await res.json();
        setComments(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleComments = () => {
    if (!showComments) {
      fetchComments();
    }
    setShowComments(!showComments);
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text) return;
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, productId: product._id }),
      });
      if (res.ok) {
        setText("");
        fetchComments();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <li style={{ marginBottom: "1rem", borderBottom: "1px solid #ccc", paddingBottom: "1rem" }}>
      <h4>{product.title} (${product.price})</h4>
      <p>{product.description}</p>
      <small>Added by: {product.user?.name || product.user?.email || "Unknown"}</small>

      <div style={{ marginTop: "1rem" }}>
        <button onClick={handleToggleComments}>
          {showComments ? "Hide Comments" : "Show Comments"}
        </button>

        {showComments && (
          <div style={{ marginLeft: "1rem", marginTop: "1rem", borderLeft: "2px solid #eee", paddingLeft: "1rem" }}>
            <h5>Comments</h5>
            {comments.length === 0 ? (
              <p>No comments yet.</p>
            ) : (
              <ul>
                {comments.map((c) => (
                  <li key={c._id} style={{ marginBottom: "5px" }}>
                    <strong>{c.user?.email || c.user?.name || "Unknown"}</strong>: {c.text}
                  </li>
                ))}
              </ul>
            )}
            
            <form onSubmit={handleAddComment} style={{ marginTop: "10px" }}>
              <input
                type="text"
                placeholder="Write a comment..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
              />
              <button type="submit">Post</button>
            </form>
          </div>
        )}
      </div>
    </li>
  );
}
