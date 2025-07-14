'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "@/app/styles/navbar.module.css";
import Link from "next/link";
import { IoCartOutline, IoSearch } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

const Nav = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const trimmed = value.trim();
    router.push(trimmed ? `/products?q=${encodeURIComponent(trimmed)}` : "/products");
  };

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbarList}>
        <li className={styles.navbarItem}>
          <div className={styles.headsearch}>
            <div className={styles.input_search}>
              <input
                type="text"
                placeholder="Search products"
                value={searchTerm}
                onChange={handleSearchChange}
                style={{font:"3rem"}}
              />
            </div>
            <div className={styles.icon_search}>
              <IoSearch />
            </div>
          </div>
        </li>

        {/* Your other nav links */}
        <li className={styles.navbarItem}>
          <Link className={styles.navbarLink} href="/">Home</Link>
        </li>
        <li className={styles.navbarItem}>
          <Link className={styles.navbarLink} href="/products">Products</Link>
        </li>
       <li className={styles.navbarItem}>
      <Link className={styles.navbarLink} href="/cart">
      <div className={styles.navIconText}>
      <IoCartOutline size={28} />
      <span>My Cart</span>
     </div>
    </Link>
      </li>

        <li className={styles.navbarItem}>
          <Link
            className={styles.navbarLink}
            href="/profile"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <CgProfile size={26} />
            <span style={{ fontSize: "1.5rem" }}>Profile</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
