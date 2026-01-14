"use client"

import { useState } from "react"
import Toggle, { Views } from "@/components/Toggle"
import { Geist, Geist_Mono } from "next/font/google";
import ImageGallery from "@/components/ImageGallery";
import styles from "./page.module.css";
import EmblaCarousel from "@/components/EmblaCarousel"
import BackArrow from "@/components/BackArrow"
import lighting from "@/data/lighting.json"
import { json } from "stream/consumers";
import { useParams } from "next/navigation";

export type Project = {
  name: string;
  details: string;
  description: string;
  photoCredits: string;
  showPhotos: {width: number, height: number, path: string}[];
  paperworkImages: {width: number, height: number, path: string}[];
};


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});



export default function ShowPage() {

  const { showURL }: {showURL: string} =  useParams()

  const show: Project = (lighting as Record<string, Project>)[showURL]

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
      <div className="hero" style={{backgroundImage: `url(/_next/image?url=%2Flighting%2F${showURL}%2F${showURL}1.jpg&w=1920&q=85)`}}></div>
      <h1  id="carousel" className={styles.title}>{show.name}</h1>
      <Toggle view={view} toggleAction={() => {
          setView(view==Views.GALLERY ? Views.CAROUSEL : Views.GALLERY)
      }}>
      </Toggle>
      <p className={`${geistSans.variable} ${styles.bodyText} ${styles.details}`}>{show.details}</p>
      {view==Views.CAROUSEL ? (
        <EmblaCarousel photos={showPhotos}></EmblaCarousel>
      ) : (
        <ImageGallery photos={showPhotos}></ImageGallery>
      )}
      <p className={`${geistSans.variable} ${styles.credits} ${styles.bodyText}`}>{show.photoCredits}</p>
      <p className={`${geistSans.variable} ${styles.description} ${styles.bodyText}`}>{show.description}</p>
      <ImageGallery photos={paperworkImages}></ImageGallery>

    </>
    )
}