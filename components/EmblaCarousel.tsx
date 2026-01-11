"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { Thumb } from './EmblaCarouselThumbsButton'
import Image from "next/image"


type PropType = {
  slides: number[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options)
  // const thumbOptions: EmblaOptionsType = {
  //   containScroll: 'keepSnaps',
  //   algin: 'start',
  //   dragFree: true
  // }align: (viewSize: number, snapSize: number, index: number) => {return}

  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({containScroll: 'keepSnaps', dragFree: true, dragThreshold: 20})

  const scrollPrev = useCallback(() => {
    console.log("WEEE")
    if (!emblaMainApi || !emblaThumbsApi) return

    emblaMainApi?.scrollPrev()
  }, [emblaMainApi, emblaThumbsApi])

  const scrollNext = useCallback(() => {

        if (!emblaMainApi || !emblaThumbsApi) return


    emblaMainApi?.scrollNext()
  }, [emblaMainApi, emblaThumbsApi])

  const onThumbClick = useCallback(
    (index: number) => {
      console.log("onthumb click!")

      if (!emblaMainApi || !emblaThumbsApi) return
      emblaMainApi.scrollTo(index)
    },
    [emblaMainApi, emblaThumbsApi]
  )

  const onSelect = useCallback(() => {
    console.log("onSelect!")
    if (!emblaMainApi || !emblaThumbsApi) return
    setSelectedIndex(emblaMainApi.selectedScrollSnap())
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex])

  useEffect(() => {
    if (!emblaMainApi) return
    onSelect()

    console.log("useEffect!")

    emblaMainApi.on('select', onSelect).on('reInit', onSelect)
  }, [emblaMainApi, onSelect])

  return (
    <div className="embla">
      <div className="mainEmbla">
        <button className='leftArrow' onClick={scrollPrev}>
        </button>
        <button className='rightArrow' onClick={scrollNext}>

        </button>
        <div className="embla__viewport" ref={emblaMainRef}>
        
      
        <div className="embla__container">

          {slides.map((index) => (
            <div className="embla__slide" key={index}>
              <Image src={`/lighting/junie-b-jones/junie-b-jones${index+1}.jpg`} fill sizes='200vw' quality={85} alt="" className='image'></Image>
                            {/* <img src={`/lighting/junie-b-jones/junie-b-jones${index+1}.jpg`} className='image'></img> */}

            </div>
          ))}
        </div>
      </div>
      
        
      </div>
      

      <div className="embla-thumbs">
        <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="embla-thumbs__container">
            {slides.map((index) => (
              <Thumb
                key={index}
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
      {/* <button onClick={() => {
        if (!emblaMainApi || !emblaThumbsApi) return
        emblaMainApi.scrollTo(selectedIndex - 1)
      }}>Left!</button>
      <button onClick={() => {
        if (!emblaMainApi || !emblaThumbsApi) return
        emblaMainApi.scrollTo(selectedIndex + 1)
      }}>Right!</button> */}
    </div>
  )
}

export default EmblaCarousel
