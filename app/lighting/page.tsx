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

import { Geist } from "next/font/google";
import lighting from "@/data/lighting.json"
import Link from "next/link";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function ShowPage(){

  const shows = (lighting as [Project]).filter((a) => !excludeShows.includes(a.showURL))

  return (<>
    <div className="hero" style={{backgroundImage: `url(/_next/image?url=%2FDSC_0226.JPEG&w=1920&q=85)`}}></div>
    <h1 className="title">
      Lighting
    </h1>
    <div className="grid">
      {
        shows.map(a => 
          <div key={a.showURL} className="showCard">
            <Image src={`/lighting/${a.showURL}/${a.showPhotos[0].path}`} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" quality={85} alt="" className='showCardImage'></Image>
            <Link  href={`/lighting/${a.showURL}`}>
              <div className="showCardOverlay">
                <h3 className={`${geistSans.variable} showCardText`}>
                  {a.name}
                </h3>
              </div>         
            </Link>             
          </div>)
      }
    </div>
  </>) 
}