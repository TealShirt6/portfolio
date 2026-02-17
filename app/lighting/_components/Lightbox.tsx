"use client"

import { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from "next/image"
import { Photo } from 'react-photo-album'
import CarouselArrows from "./CarouselArrows"
import styles from "./Carousel.module.css"


export default function Lightbox({photos, onClick, startIndex}: {photos: Photo[], onClick: () => void, startIndex: number}) {
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({startIndex: startIndex})
  const [selectedIndex, setSelectedIndex] = useState(startIndex)

  const [arrows, carouselTimeout] = CarouselArrows(emblaMainApi)
  
  function onSelect() {
    setSelectedIndex(emblaMainApi?.selectedScrollSnap() ?? 0)
  }

  useEffect(() => {
      if (!emblaMainApi) return
      emblaMainApi.on('select', onSelect).on('reInit', onSelect)
    }, [emblaMainApi, onSelect])

  return (
    <div className={styles.emblaLightbox}>
      <div onPointerMove={(e) => {
        if (e.pointerType != "mouse") return
        carouselTimeout()
      }} className={styles.mainLightbox}>
        <p className={styles.slideProgress}>
         {selectedIndex + 1} / {photos.length}
        </p>
        {arrows}
        <div className={styles.emblaViewport} ref={emblaMainRef}>
          <div className={styles.emblaContainerLightbox}>
            {photos.map((photo) => (
              <div className={styles.slide} key={photo.src}>
                <Image onClick={onClick} src={photo.src} fill sizes='175vw' quality={85} alt="" className={styles.image}></Image>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
