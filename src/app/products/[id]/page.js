"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";
import { useCart } from "@/context/CartContext";
import styles from "@/app/styles/page.module.css";

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [brand, setBrand]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      try {
        const prodRes = await axiosInstance.get(`/product/${id}`);
        const p = prodRes.data;
        setProduct(p);

        try {
          const brandRes = await axiosInstance.get(`/brand/${p.brandId}`);
          setBrand(brandRes.data);
        } catch {
          setBrand({ name: "Unknown", brandValue: null });
        }
      } catch {
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p className={styles.loading}>Loading product…</p>;
  if (error)   return <p className={styles.error}>{error}</p>;
  if (!product) return <p className={styles.error}>Product not found</p>;

  const {
    name,
    imageUrl,
    price,
    discount,
    description = "No description available.",
  } = product;
  const brandName  = brand?.name;
  const brandValue = brand?.brandValue;

  return (
    <div
      className={styles.container}
      style={{ fontFamily: "'Mulish', sans-serif" }} // ← Mulish font added
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;600;700&display=swap"
        rel="stylesheet"
      />

      <div className={styles.box1}>
        <img src={imageUrl} alt={name} className={styles.image} />
      </div>

      <div className={styles.box2}>
        <h1 className={styles.title}>{name}</h1>
        <p className={styles.price}>₹{price.toLocaleString()}</p>
        <p className={styles.discount}>{discount}% OFF</p>

        <div className={styles.meta}>
          <div><strong>Brand:</strong> {brandName}</div>
          <div>
            <strong>Brand Value:</strong>{" "}
            {brandValue != null ? brandValue.toLocaleString() : "N/A"}
          </div>
        </div>

        <div className={styles.description}>
          <h2>Description</h2>
          <p>{description}</p>
        </div>

        <div className={styles.actions}>
          <button
            className={styles.backButton}
            onClick={() => router.back()}
          >
            ← Back
          </button>
          <button
            className={styles.addButton}
            onClick={() => addToCart(product)}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}
