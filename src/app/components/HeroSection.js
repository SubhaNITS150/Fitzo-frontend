import heroStyles from "@/app/styles/herosection.module.css"
import styles from "@/app/styles/common.module.css"
import Image from "next/image";
import Link from "next/link";
import { Mulish } from 'next/font/google';

const mulish = Mulish({
    weight: ['300', '400', '500', '600', '700', '800', '900'],
    subsets: ['latin'],
    display: 'swap'
})


const Herosection = () => {
    return (
        <main className={heroStyles.main_section}>
            <div className={styles.container}>
                    <div className={heroStyles.hero_content}>
                        
                       <p className={heroStyles.message}>Revolutionary 3D Fitting Technology</p>
                        <h1>Try Before You Buy With</h1>
                        <h1 className={heroStyles["gradient-text"]}>Fitzo</h1>
                        <p>Experience the future of online shopping with our AI-powered 3D fitting technology.<br/>
                        Upload your photo and see how clothes look on you in real-time environments.</p>
                        <div>
                            <Link href="/try-on"  className={`${heroStyles.but} ${heroStyles.tryOnBtn}`}>
                             <button className={mulish.className}>
                                Start virtual Try-On
                            </button></Link>
                            
                            <Link href="/products" className={heroStyles.but}>
                             <button className={mulish.className}  > 
                               Browse Collection
                            </button></Link>

                        </div>
                </div>
            </div>
        
        </main>
    );
};

export default Herosection;