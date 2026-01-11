import styles from "./page.module.css";
import EmblaCarousel from "@/components/EmblaCarousel";
import ImageCarousel from "@/components/ImageCarousel";
import ImageGallery from "@/components/ImageGallery";

import { imageSizeFromFile } from 'image-size/fromFile'
import type { Photo } from "react-photo-album"


import June from "/lighting/junie-b-jones/junie-b-jones1.jpg"

export default async function Home() {

  const photos: Photo[] =await Promise.all(Array.from(Array(7).keys()).map(async (index: number) => {
        const basePath = '/Users/michaelbauer/Developer/Personal Website/Portfolio/public'
        const path = `/lighting/junie-b-jones/junie-b-jones${index+1}.jpg`
        const dimensions = await imageSizeFromFile("./public" + path)
        return {src: path, width: dimensions.width, height: dimensions.height, alt: ""}
      
      }))

  return (
    <div className={`${styles.page} theme-light`}>
      <main>
        {/* <EmblaCarousel slides={Array.from(Array(7).keys())}></EmblaCarousel> */}
        {/* <ImageGallery></ImageGallery> */}
      {/* <video width="320" height="240" controls preload="none">
        <source src="/IMG_5121.mp4" type="video/mp4" />
              </video> */}
        <ImageGallery photos={photos}></ImageGallery>
      </main>
    </div>
  );
}
