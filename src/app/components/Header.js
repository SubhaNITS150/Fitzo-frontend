'use client';

import styles from "@/app/styles/navbar.module.css"
import Link from "next/link";
import Image from "next/image";
import Nav from "@/app/components/Nav";

const Header = () => {
    return (
        <header className={styles.main_header}>
            <div className={styles.navbar_brand}>
                <Link href="/"style={{ display: "flex", alignItems: "center",gap: "0.5rem",textDecoration: "none", }}>
  <span style={{ fontSize: "3rem", color: "white", fontWeight: "700" }}>
    Walmart
  </span>
  <Image src="/logo.svg" alt="my logo image" width={50} height={45} />
</Link>


            </div>
            <Nav/>
        </header>
    );
};

export default Header;