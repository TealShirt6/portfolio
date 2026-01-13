"use-client"

import React from 'react'
import Image from "next/image";
import { Photo } from 'react-photo-album';


type PropType = {
  selected: boolean
  index: number
  onClick: () => void
}



export default function Thumb({selected, onClick, photo}: {selected: boolean, onClick: () => void, photo: Photo}){

  return (
    <div
      className={'embla-thumbs__slide'.concat(
        selected ? ' embla-thumbs__slide--selected' : ''
      )}
    >
              {/* <Image role='button' onClick={onClick} src={`/lighting/junie-b-jones/junie-b-jones${index+1}.jpg`} width={1} height={1} style={{width: "auto", height:"100%"}} sizes='30vw' quality={75} alt="" className='image'></Image> */}

              {/* <img role='button' sizes='30vw' srcSet="/_next/image?url=%2Flighting%2Fjunie-b-jones%2Fjunie-b-jones1.jpg&w=32&q=85 32w, 
              /_next/image?url=%2Flighting%2Fjunie-b-jones%2Fjunie-b-jones1.jpg&w=48&q=85 48w, 
              /_next/image?url=%2Flighting%2Fjunie-b-jones%2Fjunie-b-jones1.jpg&w=64&q=85 64w, 
              /_next/image?url=%2Flighting%2Fjunie-b-jones%2Fjunie-b-jones1.jpg&w=96&q=85 96w, 
              /_next/image?url=%2Flighting%2Fjunie-b-jones%2Fjunie-b-jones1.jpg&w=128&q=85 128w, 
              /_next/image?url=%2Flighting%2Fjunie-b-jones%2Fjunie-b-jones1.jpg&w=256&q=85 256w, 
              /_next/image?url=%2Flighting%2Fjunie-b-jones%2Fjunie-b-jones1.jpg&w=384&q=85 384w, 
              /_next/image?url=%2Flighting%2Fjunie-b-jones%2Fjunie-b-jones1.jpg&w=640&q=85 640w, 
              /_next/image?url=%2Flighting%2Fjunie-b-jones%2Fjunie-b-jones1.jpg&w=750&q=85 750w, 
              /_next/image?url=%2Flighting%2Fjunie-b-jones%2Fjunie-b-jones1.jpg&w=828&q=85 828w, 
              /_next/image?url=%2Flighting%2Fjunie-b-jones%2Fjunie-b-jones1.jpg&w=1080&q=85 1080w, 
              /_next/image?url=%2Flighting%2Fjunie-b-jones%2Fjunie-b-jones1.jpg&w=1200&q=85 1200w, 
              /_next/image?url=%2Flighting%2Fjunie-b-jones%2Fjunie-b-jones1.jpg&w=1920&q=85 1920w, 
              /_next/image?url=%2Flighting%2Fjunie-b-jones%2Fjunie-b-jones1.jpg&w=2048&q=85 2048w, 
              /_next/image?url=%2Flighting%2Fjunie-b-jones%2Fjunie-b-jones1.jpg&w=3840&q=85 3840w" onClick={onClick} src={`/lighting/junie-b-jones/junie-b-jones${index+1}.jpg`} className='image'></img> */}
              {/* <img role='button' sizes='30vw' srcSet={`/_next/image?url=%2Flighting%2Fjunie-b-jones%2Fjunie-b-jones${index + 1}.jpg&w=384&q=75`} onClick={onClick} src={`/lighting/junie-b-jones/junie-b-jones${index+1}.jpg`} className='image'></img> */}
              <Image role='button' onClick={onClick} src={photo.src} alt=""  sizes="20vw" width={photo.width} height={photo.height} className='image'></Image>
    </div>
  )
}
