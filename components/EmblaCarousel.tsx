"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import Thumb from './EmblaCarouselThumbsButton'
import Image from "next/image"
import { Photo } from 'react-photo-album'

export default function EmblaCarousel({photos}: {photos: Photo[]}) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel()
    const [showRightArrow, setShowRightArrow] = useState(false)
    const [showLeftArrow, setShowLeftArrow] = useState(false)
  let timeoutID: ReturnType<typeof setTimeout>

  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({containScroll: 'keepSnaps', dragFree: true})

  
    function carouselTimeout() {
        if (!emblaMainApi) return
        clearTimeout(timeoutID)
        if (emblaMainApi?.canScrollPrev()) {
          setShowLeftArrow(true)
        }
        
        if (emblaMainApi?.canScrollNext()) {
          setShowRightArrow(true)
        }
        
        timeoutID = setTimeout(()=> {
          setShowLeftArrow(false)
          setShowRightArrow(false)
        }, 3000)
    
      }
      const scrollPrev = useCallback(() => {
        carouselTimeout()
    
        if (!emblaMainApi) return
    
        emblaMainApi?.scrollPrev()
      }, [emblaMainApi])
    
      const scrollNext = useCallback(() => {
        carouselTimeout()
        
        if (!emblaMainApi) return
    
        emblaMainApi?.scrollNext()
      }, [emblaMainApi])

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
  }, [emblaMainApi, onSelect])

  return (
    <div className="embla">
      <div onMouseMove={carouselTimeout} className="mainEmbla">
        <button className={`leftArrow carouselArrow ${showLeftArrow ? "arrowsVisible" : "arrowsNotVisible"}`} onClick={scrollPrev}>
          <svg className="embla__button__svg" viewBox="50 0 532 532">
            <path
              fill="currentColor"
              d="M355.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L201.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 0 0-229.332-229.454 35.065 35.065 0 0 1-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C172.192 194.973 332.731 34.31 355.66 11.354Z"
            />
          </svg>
        </button>
        <button className={`rightArrow carouselArrow ${showRightArrow ? "arrowsVisible" : "arrowsNotVisible"}`} onClick={scrollNext}>
          <svg className="embla__button__svg" viewBox="-50 0 532 532">
            <path
              fill="currentColor"
              d="M176.34 520.646c-13.793 13.805-36.208 13.805-50.001 0-13.785-13.804-13.785-36.238 0-50.034L330.78 266 126.34 61.391c-13.785-13.805-13.785-36.239 0-50.044 13.793-13.796 36.208-13.796 50.002 0 22.928 22.947 206.395 206.507 229.332 229.454a35.065 35.065 0 0 1 10.326 25.126c0 9.2-3.393 18.26-10.326 25.2-45.865 45.901-206.404 206.564-229.332 229.52Z"
            />
          </svg>
        </button>
        <div className="embla__viewport" ref={emblaMainRef}>
        
      
        <div className="embla__container">

          {photos.map((photo) => (
            <div className="embla__slide" key={photo.src}>
              <Image src={photo.src} fill sizes='200vw' quality={85} alt="" className='image'></Image>
            </div>
          ))}
        </div>
      </div>
      </div>
      <div className="embla-thumbs">
        <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="embla-thumbs__container">
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
      </div>
    </div>
  )
}
