"use client"

import { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from "next/image"
import { Photo } from 'react-photo-album'
import CarouselArrows from "./CarouselArrows"
import styles from "./Carousel.module.css"

export default function EmblaCarousel({photos}: {photos: Photo[]}) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel()

  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({containScroll: 'keepSnaps', dragFree: true})
  const [arrows, carouselTimeout] = CarouselArrows(emblaMainApi)

  const onThumbClick = useCallback(
    (index: number) => {
      console.log("onthumb click!")

      if (!emblaMainApi || !emblaThumbsApi) return
      emblaMainApi.scrollTo(index)
    },
    [emblaMainApi, emblaThumbsApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return
    setSelectedIndex(emblaMainApi.selectedScrollSnap())
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex])


  useEffect(() => {
    if (!emblaMainApi) return
    onSelect()
    emblaMainApi.on('select', onSelect).on('reInit', onSelect)

    // Scroll into view
    document.getElementById("bottomBreak")?.scrollIntoView(false);

  }, [emblaMainApi, onSelect])

  
  

  return (
    <div className={styles.emblaCarousel}>
      <hr></hr>
      <div onMouseMove={carouselTimeout} className={styles.mainEmbla}>
        {arrows}
        <div className={styles.emblaViewport} ref={emblaMainRef}>
          <div className={styles.emblaContainer}>
            {photos.map((photo) => (
              <div className={styles.slide} key={photo.src}>
                <Image src={photo.src} fill sizes='175vw' quality={85} alt="" className={styles.image}></Image>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.thumbsViewport} ref={emblaThumbsRef}>
        <div className={styles.thumbsContainer}>
          {photos.map((photo, index) => (
            <Thumb
              key={index}
              photo={photo}
              onClick={() => onThumbClick(index)}
              selected={index === selectedIndex}
            />
          ))}
        </div>
      </div>
      <hr id="bottomBreak"></hr>
    </div>
  )
}


function Thumb({selected, onClick, photo}: {selected: boolean, onClick: () => void, photo: Photo}){

  return (
    <div className={`${styles.thumbsSlide} ${selected ? styles.thumbsSlideSelected : ""}`}>
      <Image role='button' onClick={onClick} src={photo.src} alt=""  sizes="20vw" width={photo.width} height={photo.height} className={styles.image}></Image>
    </div>
  )
}