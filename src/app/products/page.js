"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";
import styles from "@/app/styles/products.module.css";
import { useCart } from "@/context/CartContext";

export default function Products() {
  const [mergedProducts, setMergedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    const fetchWithBrands = async () => {
      try {
        const prodRes = await axiosInstance.get("/product");
        const prods = prodRes.data.slice(0, 20);

        const arr = await Promise.all(
          prods.map(async (p) => {
            try {
              const brandRes = await axiosInstance.get(`/brand/${p.brandId}`);
              return {
                ...p,
                brandName: brandRes.data.name,
                brandValue: brandRes.data.brandValue,
              };
            } catch {
              return { ...p, brandName: "Unknown", brandValue: null };
            }
          })
        );

        setMergedProducts(arr);
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchWithBrands();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.msgcontainer}>
          <div className={styles.msg1}>
            {/* <div className={styles.new}>
            <span className={styles.arrivalsText}>New</span>
          <span className={styles.arrivalsText}>Arrivals</span>
            </div> */}
          </div>
          <div className={styles.msg2}>
            <div>
              <span style={{color:"#0d0485ff", fontSize:"3rem",fontWeight:"bold"}} >New Arrivals are in</span>
              <br/>
              <span style={{color:"#0d0485ff", fontSize:"1.5rem"}} >Yep, all the newness here</span>
            </div>
          </div>
          <div className={styles.msg3}>
            
          </div>
        </div>

      <h2 className={styles.heading}>All Products</h2>
      <div className={styles.grid}>
        {mergedProducts.map((p) => (
          <div
            key={p.id}
            className={styles.card}
            style={{ cursor: "pointer" }}
            onClick={() => router.push(`/products/${p.id}`)}
          >
            {/* CARD CONTENT */}
            <img src={p.imageUrl} alt={p.name} />
            <h3>{p.name}</h3>
            <p style={{ color: "green" }}>Now ₹{p.price}</p>
            <p style={{ color: "blue" }}>{p.discount}% OFF!</p>
            <p style={{ color: "black" }}>Brand: {p.brandName}</p>
            <p style={{ color: "black" }}>
              Brand Value:{" "}
              {p.brandValue != null
                ? `${p.brandValue.toLocaleString()}`
                : "N/A"}
            </p>

            {/* ADD TO CART BUTTON */}
            <button
              onClick={(e) => {
                e.stopPropagation();   // prevent the card’s onClick
                addToCart(p);
              }}
              style={{ backgroundColor: "#1336e7" }}
            >
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
