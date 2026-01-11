"use client"
import styles from "./carousel.module.css"
import useEmblaCarousel from "embla-carousel-react"


export default function ImageCarousel() {
  const [emblaRef] = useEmblaCarousel()
  
  return (
    <div className={styles.embla} ref={emblaRef}>
      <div className = {styles.embla__container}> 
        <div className={styles.embla__slide}><p>Slide 1</p></div>
        <div className={styles.embla__slide}><p>Slide 2</p></div>
      </div>
    </div>
  )
}