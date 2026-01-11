export type Project = {
  name: string;
  imageCount: number;
};


import ImageGallery from "@/components/ImageGallery";
import { imageSizeFromFile } from 'image-size/fromFile'
import type { Photo } from "react-photo-album"
import styles from "./page.module.css";
import lighting from "@/data/lighting.json"

export default async function ShowPage({
  params,
}: {
  params: Promise<{ showURL: string }>
}) {
  const { showURL } = await params

  const show: Project = (lighting as Record<string, Project>)[showURL]

  const photos: Photo[] =await Promise.all(Array.from(Array(show.imageCount).keys()).map(async (index: number) => {
        const path = `/lighting/${showURL}/${showURL}${index+1}.jpg`
        const dimensions = await imageSizeFromFile("./public" + path)
        return {src: path, width: dimensions.width, height: dimensions.height, alt: ""}
      
      }))

  
  return (
    <>
      <ImageGallery photos={photos}></ImageGallery>
    
    </>
  )
}