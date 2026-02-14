"use client"

import { useState } from "react"
import Toggle, { Views } from "@/components/Toggle"
import { Geist } from "next/font/google";
import ImageGallery from "@/components/ImageGallery";
import styles from "./page.module.css";
import EmblaCarousel from "@/components/EmblaCarousel"
import BackArrow from "@/components/BackArrow"
import lighting from "@/data/lighting.json"
import { useParams } from "next/navigation";
import { Project, excludeShows} from "../page"
import { notFound } from "next/navigation";
import Link from "next/link";
import { useMediaQuery } from 'react-responsive'


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});



export default function ShowPage() {

  const { showURL }: {showURL: string} =  useParams()

  const smallScreen = useMediaQuery({
    query: '(max-width: 400px)'
  })

  const shows = (lighting as [Project]).filter((a) => !excludeShows.includes(a.showURL))
  const showIndex = shows.findIndex(a => a.showURL == showURL)
  if (showIndex == -1) { notFound() }

  const show = shows[showIndex]

  const [view, setView] = useState("Gallery")

  const toPhoto = (jsonPhoto: {path: string, width: number, height: number}) => {
    const path = `/lighting/${showURL}/${jsonPhoto.path}`
      return {src: path, width: jsonPhoto.width, height: jsonPhoto.height, alt: ""}
  }

  const showPhotos = show.showPhotos.map(toPhoto)

  const paperworkImages = show.paperworkImages.map(toPhoto)

  return (
      <>
    <BackArrow></BackArrow>
    <div className="hero" style={{backgroundImage: `url(/_next/image?url=%2Flighting%2F${showURL}%2F${showPhotos[0].src.substring(showPhotos[0].src.lastIndexOf('/') + 1).replace(" ", "%20")}&w=1920&q=85)`}}></div>
    <h1 className={styles.title}>{show.name}</h1>
    <Toggle view={view} toggleAction={() => {
        setView(view==Views.GALLERY ? Views.CAROUSEL : Views.GALLERY)
    }}>
    </Toggle>
    <div id="carousel" className={`details ${geistSans.variable} ${styles.bodyText} ${styles.details}`} dangerouslySetInnerHTML={{__html: show.details}}></div>
    {view==Views.CAROUSEL ? (
      <EmblaCarousel photos={showPhotos}></EmblaCarousel>
    ) : (
      <ImageGallery photos={show.includeCoverPhoto ? showPhotos : showPhotos.slice(1)}></ImageGallery>
    )}
    <p className={`${geistSans.variable} ${styles.credits} ${styles.bodyText}`}>{show.photoCredits}</p>
    <div className={`${geistSans.variable} ${styles.description} ${styles.bodyText} ${styles.descriptionContainer}`} dangerouslySetInnerHTML={{__html: show.description}}>
    </div>
    <ImageGallery photos={paperworkImages}></ImageGallery>
    {(showIndex != 0) && <Link href={`/lighting/${shows[showIndex - 1].showURL}`}>
          <p className={`${geistSans.variable} ${styles.bodyText} ${styles.next}`}>Next{smallScreen ? "" : `: ${shows[showIndex - 1].name}`}</p>
    </Link>}
    {(showIndex != shows.length -1) &&<Link href={`/lighting/${shows[showIndex + 1].showURL}`}>
          <p className={`${geistSans.variable} ${styles.bodyText} ${styles.prev}` }>Prev{smallScreen ? "" : `: ${shows[showIndex + 1].name}`}</p>
    </Link>}
  </>
  )
}