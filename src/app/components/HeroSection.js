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
                        <div className={heroStyles.col1}>
                        <div className={heroStyles.obj1}>

                        </div>
                        <div className={heroStyles.obj2}>
                            
                        </div>
                        <div className={heroStyles.obj3}>
                            
                        </div>
                        </div>
                        <div className={heroStyles.col2}>
                            <div className={heroStyles.obj4}>

                            </div>
                            <div className={heroStyles.obj5}>
                                <div className={heroStyles.obj5_1}>

                                </div>
                                <div className={heroStyles.obj5_2}>
                                    
                                </div>
                            </div>
                            <div className={heroStyles.obj6}>
                                
                            </div>
                        </div>
                        <div className={heroStyles.col3}>
                            <div className={heroStyles.obj7}>
                                
                            </div>
                            <div className={heroStyles.obj8}>
                                
                            </div>
                            <div className={heroStyles.obj9}>
                                
                            </div>

                        </div>
                </div>
            </div>
        
        </main>
    );
};

export default Herosection;