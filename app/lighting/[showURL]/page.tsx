"use client"

import { useState } from "react"
import Toggle, { Views } from "@/app/lighting/_components/Toggle"
import ImageGallery from "@/app/lighting/_components/Gallery";
import styles from "./page.module.css";
import EmblaCarousel from "@/app/lighting/_components/Carousel"
import lighting from "@/data/lighting.json"
import { useParams } from "next/navigation";
import { Project, excludeShows} from "../page"
import { notFound } from "next/navigation";
import Link from "next/link";
import { useMediaQuery } from 'react-responsive'

export default function ShowPage() {
  const { showURL }: {showURL: string} =  useParams()

  const smallScreen = useMediaQuery({
    query: '(max-width: 400px)'
  })

  // Get shows array
  const shows = (lighting as [Project]).filter((a) => !excludeShows.includes(a.showURL))

  // Get show
  const showIndex = shows.findIndex(a => a.showURL == showURL)
  if (showIndex == -1) { notFound() }
  const show = shows[showIndex]

  // hook for gallery vs carousel view
  const [view, setView] = useState("Gallery")

  const toPhoto = (jsonPhoto: {path: string, width: number, height: number}) => {
    const path = `/lighting/${showURL}/${jsonPhoto.path}`
      return {src: path, width: jsonPhoto.width, height: jsonPhoto.height, alt: ""}
  }

  // Initialize photo arrays
  const showPhotos = show.showPhotos.map(toPhoto)
  const paperworkImages = show.paperworkImages.map(toPhoto)

  return (
      <>
    <div className="hero" style={{backgroundImage: `url(/_next/image?${new URLSearchParams({url: showPhotos[0].src, w: "1920", q: "85"}).toString()}`}}></div>
    <BackArrow></BackArrow>
    <h1 className={styles.title}>{show.name}</h1>
    <div style={{display: "flex", justifyContent: "space-between", margin: "1rem 0"}}>
      <div className={`${styles.bodyText} ${styles.details}`} dangerouslySetInnerHTML={{__html: show.details}}></div>
      <Toggle view={view} toggleAction={() => {
        setView(view==Views.GALLERY ? Views.CAROUSEL : Views.GALLERY)
      }}>
      </Toggle>
    </div>
    
    {view==Views.CAROUSEL ? (
      <EmblaCarousel photos={showPhotos}></EmblaCarousel>
    ) : (
      <ImageGallery photos={show.includeCoverPhoto ? showPhotos : showPhotos.slice(1)}></ImageGallery>
    )}
    <p id="credits" className={`${styles.bodyText} ${styles.credits}`}>{show.photoCredits}</p>
    <div className={`${styles.bodyText} ${styles.description}`} dangerouslySetInnerHTML={{__html: show.description}}></div>
    <ImageGallery photos={paperworkImages}></ImageGallery>

    {(showIndex != 0) && <Link href={`/lighting/${shows[showIndex - 1].showURL}`}>
          <p className={` ${styles.bodyText} ${styles.next}`}>Next{smallScreen ? "" : `: ${shows[showIndex - 1].name}`}</p>
    </Link>}

    {(showIndex != shows.length -1) &&<Link href={`/lighting/${shows[showIndex + 1].showURL}`}>
          <p className={` ${styles.bodyText} ${styles.prev}` }>Prev{smallScreen ? "" : `: ${shows[showIndex + 1].name}`}</p>
    </Link>}
  </>
  )
}

function BackArrow() {

    return (
        <Link href="\lighting">
            <svg className={styles.backArrow} viewBox="0 0 532 532">
                <path
                fill="currentColor"
                d="M355.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L201.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 0 0-229.332-229.454 35.065 35.065 0 0 1-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C172.192 194.973 332.731 34.31 355.66 11.354Z"
                />
            </svg>
        </Link>
    )
}