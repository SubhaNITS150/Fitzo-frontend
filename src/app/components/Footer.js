import styles from "@/app/styles/footer.module.css";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.info}>
                    <div className={styles.box1}>
                        <Link href="/">
                    <Image src="/logo.svg" alt="my logo image" width={50} height={45}/>
                </Link>
                <p style={{ color: "rgb(223, 210, 210)" }}>Powered by the spirit of Walmart. Save Money. Live Better.</p>
                    </div>
                    <div className={styles.box2}>
                        <h3 style={{ fontSize: "2rem" , margin: "2rem"}} >Products</h3>
                
                            <li><a href="#">Clothing</a></li>
                            <li><a href="#">Accesories</a></li>
                            <li><a href="#">Shoes</a></li>
                           

                    </div>
                        
                    <div className={styles.box3}>
                        <h3 style={{ fontSize: "2rem" , margin: "2rem"}} >Support</h3>
                
                            <li><a href="#">Help Center</a></li>
                            <li><a href="#">Size Guide</a></li>
                            <li><a href="#">Return</a></li>
                    </div>
                    
                    <div className={styles.box4}>
                        <h3 style={{ fontSize: "2rem" , margin: "2rem"}} >Company</h3>
                
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Careers</a></li>
                            <li><a href="#">Contacts</a></li>
                    </div>
                </div>
                <div className={styles.last}>
                      <hr className={styles.divider} />
                       <p className={styles.copy}>© 2025 Walmart. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
export default Footer;