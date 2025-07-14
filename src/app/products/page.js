"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";
import styles from "@/app/styles/products.module.css";
import { useCart } from "@/context/CartContext";
import { useSearchParams } from "next/navigation";

export default function Products() {
  const [mergedProducts, setMergedProducts] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState("");
  const { addToCart }                   = useCart();
  const router                          = useRouter();

  const [showMarkUp, setShowMarkUp]       = useState(false);
  const [showTopBrands, setShowTopBrands] = useState(false);
  const [showTrends, setShowTrends]       = useState(false);

  const [highValueBrandProducts, setHighValueBrandProducts] = useState([]);
  const [highMarkup, setHighMarkup]                         = useState([]);
  const [socialMediaTrendProducts, setSocialMediaTrendProducts] = useState([]);

  useEffect(() => {
    const fetchWithBrands = async () => {
      try {
        // 1. Fetch products
        const prodRes = await axiosInstance.get("/product");
        const prods   = prodRes.data.slice(0, 40);

        // 2. Unique brand IDs
        const brandIds = [...new Set(prods.map((p) => p.brandId))];

        // 3. Fetch each brand once
        const brandEntries = await Promise.all(
          brandIds.map(async (bid) => {
            try {
              const res = await axiosInstance.get(`/brand/${bid}`);
              return [bid, { name: res.data.name, brandValue: res.data.brandValue }];
            } catch {
              return [bid, { name: "Unknown", brandValue: null }];
            }
          })
        );

        // 4. Map of brandId -> details
        const brandMap = Object.fromEntries(brandEntries);

        // 5. Merge data
        const merged = prods.map((p) => ({
          ...p,
          brandName:  brandMap[p.brandId].name,
          brandValue: brandMap[p.brandId].brandValue,
        }));

        setMergedProducts(merged);
        setHighValueBrandProducts(merged.filter((p) => p.brandValue > 70));
        setHighMarkup(merged.filter((p) => p.discount > 20));
        setSocialMediaTrendProducts(merged); // trending logic
      } catch {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchWithBrands();
  }, []);

  const searchParams = useSearchParams();
  const searchQuery  = searchParams.get("q") || "";

  // derive list based on tabs
  let showProducts = mergedProducts;
  if (showTopBrands)   showProducts = highValueBrandProducts;
  else if (showMarkUp) showProducts = highMarkup;
  else if (showTrends)  showProducts = socialMediaTrendProducts;

  // apply search filter
  const filteredProducts = searchQuery.trim()
    ? showProducts.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : showProducts;

  const handleTabClick = (tab) => {
    setShowTopBrands(tab === "topBrands");
    setShowMarkUp(tab === "markup");
    setShowTrends(tab === "trends");
    console.log({ showMarkUp, showTopBrands, showTrends });
  };

  if (loading) return <p>Loading...</p>;
  if (error)   return <p>{error}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.msgcontainer}>
        <div className={styles.msg1}></div>
        <div className={styles.msg2}>
          <div>
            <span style={{ color: "#0d0485ff", fontSize: "3rem", fontWeight: "bold" }}>
              New Arrivals are in
            </span>
            <br />
            <span style={{ color: "#0d0485ff", fontSize: "1.5rem" }}>
              Yep, all the newness here
            </span>
          </div>
        </div>
        <div className={styles.msg3}></div>
      </div>

      <div className={styles.tabs}>
        <div className={styles.tab1}>
          <button onClick={() => handleTabClick("topBrands")}>Top Brands</button>
        </div>
        <div className={styles.tab2}>
          <button onClick={() => handleTabClick("markup")}>Markup</button>
        </div>
        <div className={styles.tab3}>
          <button onClick={() => handleTabClick("trends")}>Social Media Trend</button>
        </div>
      </div>

      <h2 className={styles.heading}>
  {showTopBrands
    ? "Top Brand Products"
    : showMarkUp
    ? "High Markup Products"
    : showTrends
    ? "Social Media Trend Products"
    : "All Products"}
</h2>
      <div className={styles.grid}>
        {filteredProducts.map((p) => (
          <div
            key={p.id}
            className={styles.card}
            style={{ cursor: "pointer" }}
            onClick={() => router.push(`/products/${p.id}`)}
          >
            <img src={p.imageUrl} alt={p.name} />
            <h3>{p.name}</h3>
            <p style={{ color: "green" }}>Now ₹{p.price}</p>
            <p style={{ color: "blue" }}>{p.discount}% OFF!</p>
            <p style={{ color: "black" }}>Brand: {p.brandName}</p>
            <p style={{ color: "black" }}>
              Brand Value: {p.brandValue != null ? p.brandValue.toLocaleString() : "N/A"}
            </p>
            <button
              onClick={(e) => { e.stopPropagation(); addToCart(p); }}
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
