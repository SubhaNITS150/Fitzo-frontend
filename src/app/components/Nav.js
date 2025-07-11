'use client'

import styles from "@/app/styles/navbar.module.css";
import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";

import { CgProfile } from "react-icons/cg";

const Nav = () => {
    return (
        <nav className={styles.navbar}>
            <ul className={styles.navbarList}>
                 <li className={styles.navbarItem}>
    <div className={styles.headsearch}>
      <div className={styles.input_search}>
        <input
          type="search"
          placeholder="Search everything at Walmart online and in store"
        />
      </div>
      <div className={styles.icon_search}>
        <span className="material-symbols-outlined"><IoSearch /></span>
      </div>
    </div>
  </li>
                <li className={styles.navbarItem}>
                    <Link className={styles.navbarLink} href="/">Home</Link>
                </li>
                <li className={styles.navbarItem}>
                    <Link className={styles.navbarLink} href="/products">Products</Link>
                </li>
                 <li className={styles.navbarItem}>
          <Link className={styles.navbarLink} href="/cart"> <IoCartOutline size={28} /> <span style={{fontSize: "1.5rem"}}>My Cart</span></Link>
        </li>
        <li className={styles.navbarItem}>
         <Link
  className={styles.navbarLink}
  href="/profile"
  style={{ display: "flex", flexDirection: "column", alignItems: "center",gap : "1rem" }}
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


