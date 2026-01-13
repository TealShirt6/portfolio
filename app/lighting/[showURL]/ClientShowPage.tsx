"use client"

import { useState } from "react"
import { Project } from "./page"
import type { Photo } from "react-photo-album"
import Toggle, { Views } from "@/components/Toggle"
import { Geist, Geist_Mono } from "next/font/google";
import ImageGallery from "@/components/ImageGallery";
import styles from "./page.module.css";
import EmblaCarousel from "@/components/EmblaCarousel"
import { createPortal } from "react-dom"
import BackArrow from "@/components/BackArrow"


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});



export default function ClientShowPage({show, showURL, photos, paperwork}: {show: Project, showURL: string, photos: Photo[], paperwork: Photo[]}) {
      const [view, setView] = useState("Gallery")


    return (
        <>
      <BackArrow></BackArrow>
      <div className="hero" style={{backgroundImage: `url(/_next/image?url=%2Flighting%2F${showURL}%2F${showURL}1.jpg&w=1920&q=85)`}}></div>
      <h1 className={styles.title}>{show.name}</h1>
      <Toggle view={view} toggleAction={() => {
          setView(view==Views.GALLERY ? Views.CAROUSEL : Views.GALLERY)
      }}>
      </Toggle>
      <p className={`${geistSans.variable} ${styles.bodyText} ${styles.details}`}>{show.details}</p>
      {view==Views.CAROUSEL ? (
        <EmblaCarousel photos={photos}></EmblaCarousel>
      ) : (
        <ImageGallery photos={photos}></ImageGallery>
      )}
      <p className={`${geistSans.variable} ${styles.credits} ${styles.bodyText}`}>{show.photoCredits}</p>
      <p className={`${geistSans.variable} ${styles.description} ${styles.bodyText}`}>{show.description}</p>
      <ImageGallery photos={paperwork}></ImageGallery>

    </>
    )
}