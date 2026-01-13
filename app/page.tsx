import styles from "./page.module.css";
import EmblaCarousel from "@/components/EmblaCarousel";
import ImageCarousel from "@/components/ImageCarousel";
import ImageGallery from "@/components/ImageGallery";


import { imageSizeFromFile } from 'image-size/fromFile'
import type { Photo } from "react-photo-album"


export default async function Home() {
  return (
    <div className={`${styles.page}`}>
    </div>
  );
}
