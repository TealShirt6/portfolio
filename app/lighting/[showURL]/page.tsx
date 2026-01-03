export type Project = {
  name: string;
  images: string[];
};

import styles from "./page.module.css";
import lighting from "@/data/lighting.json"

export default async function ShowPage({
  params,
}: {
  params: Promise<{ showURL: string }>
}) {
  const { showURL } = await params

  const show: Project = (lighting as Record<string, Project>)[showURL]

  const image: string = `\\${show.images[0]}`;
  
  return (
    <div>
      <h1>{show.name}</h1>
      <img src={image} className={styles.image}/>
    </div>
  )
}