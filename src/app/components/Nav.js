'use client'

import styles from "@/app/styles/navbar.module.css";
import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";

import { CgProfile } from "react-icons/cg";

const Nav = () => {
    return (
        <nav className={styles.navbar}>
            <ul className={styles.navbarList}>
                <li className={styles.navbarItem}>
                    <Link className={styles.navbarLink} href="/">Home</Link>
                </li>
                <li className={styles.navbarItem}>
                    <Link className={styles.navbarLink} href="/about">About</Link>
                </li>
                <li className={styles.navbarItem}>
                    <Link className={styles.navbarLink} href="/products">Products</Link>
                </li>
                <li className={styles.navbarItem}>
                    <Link className={styles.navbarLink} href="/try-on">Try-On</Link>
                </li>
                 <li className={styles.navbarItem}>
          <Link className={styles.navbarLink} href="/cart"><IoCartOutline size={28} /></Link>
        </li>
        <li className={styles.navbarItem}>
          <Link className={styles.navbarLink} href="/profile"><CgProfile size={26} /></Link>
        </li>
            </ul>
            

        </nav>
    );
};

export default Nav;


