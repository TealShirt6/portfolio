export type Project = {
  showURL: string;
  name: string;
  details: string;
  description: string;
  photoCredits: string;
  showPhotos: {width: number, height: number, path: string}[];
  paperworkImages: {width: number, height: number, path: string}[];
  includeCoverPhoto: boolean;
};

export const excludeShows = ["senior-showcase-2024"]

import lighting from "@/data/lighting.json"
import Link from "next/link"
import Image from "next/image"
import styles from "./page.module.css"



export default function ShowPage(){

  const shows = (lighting as [Project]).filter((a) => !excludeShows.includes(a.showURL))

  return (<>
    <div className="hero" style={{backgroundImage: `url(/_next/image?url=%2FDSC_0226.JPEG&w=1920&q=85)`}}></div>
    <h1 className={styles.title}>
      Lighting
    </h1>

    {/*Map over shows array to display show cards from newest to oldest left to right
    */}
    <div className={styles.grid}>
      {
        shows.map(a => 
          <div key={a.showURL} className={styles.showCard}>
            <Image src={`/lighting/${a.showURL}/${a.showPhotos[0].path}`} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" quality={85} alt="" className={styles.showCardImage}></Image>
            <Link  href={`/lighting/${a.showURL}`}>
              <div className={styles.showCardOverlay}>
                <h2 className={styles.showCardText}>
                  {a.name}
                </h2>
              </div>         
            </Link>             
          </div>)
      }
    </div>
  </>) 
}