import styles from "./page.module.css";
import EmblaCarousel from "@/components/EmblaCarousel";

export default function Home() {
  return (
    <div className={`${styles.page} theme-light`}>
      <main>
        <EmblaCarousel slides={Array.from(Array(9).keys())}></EmblaCarousel>
      </main>
    </div>
  );
}
