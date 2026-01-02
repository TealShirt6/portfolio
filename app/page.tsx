import Image from "next/image";
import styles from "./page.module.css";
import Rad from '../public/RAD04920.jpg'

export default function Home() {
  return (
    <div className={styles.page}>
      <main>
        <p>
          Hello World!
        </p>
        <Image src={Rad} alt="" className={styles.image} quality={100}/>
      </main>
    </div>
  );
}
