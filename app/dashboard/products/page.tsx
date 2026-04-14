"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import ProductItem, { Product } from "./ProductItem";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/products");
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          price: Number(price),
        }),
      });

      if (res.ok) {
        fetchProducts();
        setTitle("");
        setDescription("");
        setPrice("");
      } else {
        console.error("Failed to create product");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Products</h1>
      <Link href="/dashboard">Back to Dashboard</Link>
      <br /><br />
      
      <form onSubmit={handleCreateProduct}>
        <h3>Add New Product</h3>
        <div>
          <label>Title: </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Price: </label>
          <input
            type="number"
            required
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label>Description: </label>
          <textarea
            required
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Create Product</button>
      </form>

      <hr />

      <h3>All Products</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {products.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))}
        </ul>
      )}
    </div>
  );
}
