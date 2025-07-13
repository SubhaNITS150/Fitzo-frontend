"use client";

import React, { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import styles from "@/app/styles/products.module.css";
import Link from "next/link";

export default function Products() {
  const [products, setProducts]           = useState([]);
  const [mergedProducts, setMergedProducts] = useState([]);  
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState("");

  useEffect(() => {
    const fetchWithBrands = async () => {
      try {

        const prodRes = await axiosInstance.get("/product");
        const prods   = prodRes.data;

        const arr = [];
        for (let i = 0; i < prods.length; i++) {
          const p = prods[i];
          try {
            const brandRes = await axiosInstance.get(`/brand/${p.brandId}`);
            const brand    = brandRes.data;
            arr.push({
              ...p,
              brandName:  brand.name,
              brandValue: brand.brandValue,
            });
          } catch {
            arr.push({
              ...p,
              brandName:  "Unknown",
              brandValue: null,
            });
          }
        }

        setMergedProducts(arr);
        setMergedProducts(arr.slice(0, 20));
      } catch (err) {
        console.error("Error loading products:", err);
        setError("Could not load products");
      } finally {
        setLoading(false);
      }
    };

    fetchWithBrands();
  }, []);

  if (loading) return <p>Loading…</p>;
  if (error)   return <p>{error}</p>;

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
          <div className={styles.card} key={p.id}>
            <img src={p.imageUrl} alt={p.name} />
            <h3>{p.name}</h3>
            <p style={{ color: "green" }}>Now ₹{p.price}</p>
            <p style={{ color: "blue" }}>{p.discount}% OFF!</p>
            <p style={{ color: "black" }}>Brand: {p.brandName}</p>
            <p style={{ color: "black" }}>
              Brand Value: {p.brandValue != null
                ? `${p.brandValue.toLocaleString()}`
                : "N/A"}
            </p>
            <Link href="#">
              <button style={{ backgroundColor: "#1336e7" }}>
                Add To Cart
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
