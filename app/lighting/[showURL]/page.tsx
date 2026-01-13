export type Project = {
  name: string;
  imageCount: number;
  details: string;
  description: string;
  paperworkCount?: number;
  photoCredits: string
};

import type { Photo } from "react-photo-album"
import lighting from "@/data/lighting.json"
import { imageSizeFromFile } from 'image-size/fromFile'
import ClientShowPage from "./ClientShowPage";


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
        return {src: path, width: dimensions.width, height: dimensions.height, key: `${index}`, alt: ""}
      
      }))

  const paperworkPhotos: Photo[]= await Promise.all(Array.from(Array(show.paperworkCount).keys()).map(async (index: number) => {
        const path = `/lighting/${showURL}/paperwork${index+1}.jpg`
        const dimensions = await imageSizeFromFile("./public" + path)
        return {src: path, width: dimensions.width, height: dimensions.height, key: `${index}`, alt: ""}
      
      }))
  
  return (
    <ClientShowPage show={show} showURL={showURL} photos={photos} paperwork={paperworkPhotos}></ClientShowPage>
  )
}