export type Project = {
  name: string;
  imageCount: number;
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

  
  return (
    <div>
      <h1>{show.name}</h1>
    </div>
  )
}